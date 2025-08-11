const Notification = require('../models/Notification');

class NotificationService {
  constructor(io) {
    this.io = io;
  }

  async sendNotification(userId, notificationData) {
    try {
      const notification = await Notification.create({
        user: userId,
        ...notificationData,
      });

      const populatedNotification = await Notification.findById(notification._id)
        .populate('relatedOrder', 'orderId orderStatus')
        .populate('relatedProduct', 'name price images');

      this.io.to(`user_${userId}`).emit('newNotification', populatedNotification);

      return populatedNotification;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  async sendBulkNotifications(userIds, notificationData) {
    try {
      const notifications = [];
      for (const userId of userIds) {
        notifications.push({
          user: userId,
          ...notificationData,
        });
      }

      const createdNotifications = await Notification.insertMany(notifications);

      for (const notification of createdNotifications) {
        this.io.to(`user_${notification.user}`).emit('newNotification', notification);
      }

      return createdNotifications;
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      throw error;
    }
  }

  async sendOrderStatusNotification(order, previousStatus, newStatus) {
    try {
      const notificationData = {
        title: 'Order Status Update',
        message: `Your order ${order.orderId} status has been updated from ${previousStatus} to ${newStatus}.`,
        type: 'order',
        relatedOrder: order._id,
      };

      await this.sendNotification(order.user, notificationData);
    } catch (error) {
      console.error('Error sending order status notification:', error);
    }
  }

  async sendPaymentNotification(order, status) {
    try {
      const notificationData = {
        title: `Payment ${status}`,
        message: `Your payment for order ${order.orderId} has been ${status}.`,
        type: 'payment',
        relatedOrder: order._id,
      };

      await this.sendNotification(order.user, notificationData);
    } catch (error) {
      console.error('Error sending payment notification:', error);
    }
  }

  async sendLowStockNotification(product) {
    try {
      const adminUsers = await require('../models/User').find({ role: 'admin' });
      const adminUserIds = adminUsers.map(user => user._id);

      const notificationData = {
        title: 'Low Stock Alert',
        message: `Product ${product.name} is running low on stock. Current stock: ${product.stock}`,
        type: 'system',
        relatedProduct: product._id,
      };

      await this.sendBulkNotifications(adminUserIds, notificationData);
    } catch (error) {
      console.error('Error sending low stock notification:', error);
    }
  }

  async sendWelcomeNotification(userId) {
    try {
      const notificationData = {
        title: 'Welcome!',
        message: 'Welcome to our e-commerce platform! We hope you enjoy your shopping experience.',
        type: 'system',
      };

      await this.sendNotification(userId, notificationData);
    } catch (error) {
      console.error('Error sending welcome notification:', error);
    }
  }
}

module.exports = NotificationService;
