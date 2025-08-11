const emailTemplates = {
  welcome: (userName) => ({
    subject: 'Welcome to Our E-commerce Platform!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0;">Welcome!</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hello ${userName},</h2>
          <p>Welcome to our e-commerce platform! We're excited to have you on board.</p>
          <p>Here's what you can do:</p>
          <ul>
            <li>Browse our wide selection of products</li>
            <li>Create wishlists and save your favorite items</li>
            <li>Enjoy secure payments with Stripe</li>
            <li>Track your orders in real-time</li>
          </ul>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Happy shopping!</p>
          <p>Best regards,<br>The Team</p>
        </div>
      </div>
    `,
  }),

  orderConfirmation: (order) => ({
    subject: `Order Confirmed - ${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #28a745; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Order Confirmed!</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Order Type:</strong> ${order.orderType}</p>
          
          <h3>Items:</h3>
          <ul>
            ${order.items.map(item => `
              <li>
                <strong>${item.product.name}</strong><br>
                Quantity: ${item.quantity} | Price: ₹${item.price}
              </li>
            `).join('')}
          </ul>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
            <p><strong>Sub Total:</strong> ₹${order.subTotal}</p>
            <p><strong>Delivery Charge:</strong> ₹${order.deliveryCharge}</p>
            <p><strong>Taxes:</strong> ₹${order.taxes}</p>
            <p style="font-size: 18px; font-weight: bold; color: #28a745;">
              <strong>Grand Total: ₹${order.grandTotal}</strong>
            </p>
          </div>
          
          <h3>Delivery Address:</h3>
          <p>${order.deliveryAddress.address}<br>
          ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.zipCode}<br>
          ${order.deliveryAddress.country}</p>
          
          <p>Thank you for your order! We'll keep you updated on the delivery status.</p>
        </div>
      </div>
    `,
  }),

  orderStatusUpdate: (order, previousStatus, newStatus) => ({
    subject: `Order Status Update - ${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #007bff; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Order Status Update</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Order ${order.orderId}</h2>
          <p>Your order status has been updated:</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Previous Status:</strong> ${previousStatus}</p>
            <p style="margin: 0; color: #28a745; font-weight: bold;"><strong>New Status:</strong> ${newStatus}</p>
          </div>
          
          <h3>Order Details:</h3>
          <ul>
            ${order.items.map(item => `
              <li><strong>${item.product.name}</strong> - Qty: ${item.quantity}</li>
            `).join('')}
          </ul>
          
          <p><strong>Total Amount:</strong> ₹${order.grandTotal}</p>
          
          <p>We'll continue to keep you updated on any further changes to your order.</p>
        </div>
      </div>
    `,
  }),

  paymentConfirmed: (order) => ({
    subject: `Payment Confirmed - Order ${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #28a745; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Payment Confirmed!</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Payment Successful</h2>
          <p>Your payment for order <strong>${order.orderId}</strong> has been confirmed successfully.</p>
          
          <h3>Payment Details:</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
            <p><strong>Amount Paid:</strong> ₹${order.grandTotal}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <h3>Order Summary:</h3>
          <ul>
            ${order.items.map(item => `
              <li><strong>${item.product.name}</strong> - Qty: ${item.quantity} - ₹${item.price}</li>
            `).join('')}
          </ul>
          
          <p>Your order is now being processed. You'll receive updates on the delivery status.</p>
          <p>Thank you for your purchase!</p>
        </div>
      </div>
    `,
  }),

  paymentFailed: (order) => ({
    subject: `Payment Failed - Order ${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #dc3545; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Payment Failed</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Payment Unsuccessful</h2>
          <p>We're sorry, but your payment for order <strong>${order.orderId}</strong> has failed.</p>
          
          <h3>What to do next:</h3>
          <ul>
            <li>Check your payment method details</li>
            <li>Ensure you have sufficient funds</li>
            <li>Try the payment again</li>
            <li>Contact your bank if the issue persists</li>
          </ul>
          
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Amount:</strong> ₹${order.grandTotal}</p>
          
          <p>If you continue to experience issues, please contact our support team for assistance.</p>
          <p>We're here to help!</p>
        </div>
      </div>
    `,
  }),

  passwordReset: (resetUrl) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ffc107; padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: #333;">Password Reset</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>You requested a password reset for your account.</p>
          <p>Click the button below to reset your password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p><strong>Important:</strong></p>
          <ul>
            <li>This link will expire in 1 hour</li>
            <li>If you didn't request this reset, please ignore this email</li>
            <li>For security, don't share this link with anyone</li>
          </ul>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>
        </div>
      </div>
    `,
  }),

  lowStockAlert: (product) => ({
    subject: 'Low Stock Alert',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ffc107; padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: #333;">Low Stock Alert</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Product: ${product.name}</h2>
          <p>This product is running low on stock and may need restocking soon.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
            <p><strong>Current Stock:</strong> ${product.stock} units</p>
            <p><strong>Product ID:</strong> ${product._id}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ₹${product.price}</p>
          </div>
          
          <p>Please consider:</p>
          <ul>
            <li>Checking supplier availability</li>
            <li>Updating product status</li>
            <li>Setting up automatic reorder points</li>
          </ul>
          
          <p>This is an automated alert. Please take appropriate action.</p>
        </div>
      </div>
    `,
  }),
};

module.exports = emailTemplates;
