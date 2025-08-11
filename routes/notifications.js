const express = require('express');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let query = { user: req.user._id };
    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.isRead !== undefined) {
      query.isRead = req.query.isRead === 'true';
    }

    const notifications = await Notification.find(query)
      .populate('relatedOrder', 'orderId orderStatus')
      .populate('relatedProduct', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    res.json({
      notifications,
      pagination: {
        currentPage: page,
        totalPages,
        totalNotifications: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      unreadCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/unread-count', protect, async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    res.json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/read-all', protect, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/clear-all', protect, async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user._id });

    res.json({ message: 'All notifications cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/send', protect, admin, async (req, res) => {
  try {
    const { userId, title, message, type, relatedOrder, relatedProduct } = req.body;

    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type: type || 'system',
      relatedOrder,
      relatedProduct,
    });

    const populatedNotification = await Notification.findById(notification._id)
      .populate('relatedOrder', 'orderId orderStatus')
      .populate('relatedProduct', 'name price images');

    res.status(201).json(populatedNotification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/send-bulk', protect, admin, async (req, res) => {
  try {
    const { userIds, title, message, type } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'User IDs array is required' });
    }

    const notifications = [];
    for (const userId of userIds) {
      notifications.push({
        user: userId,
        title,
        message,
        type: type || 'system',
      });
    }

    const createdNotifications = await Notification.insertMany(notifications);

    res.status(201).json({
      message: `${createdNotifications.length} notifications sent successfully`,
      count: createdNotifications.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
