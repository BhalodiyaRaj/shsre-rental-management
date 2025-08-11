# E-commerce Backend API

A comprehensive e-commerce backend built with Node.js, Express, MongoDB, Stripe, Cloudinary, and Nodemailer. This backend supports both purchase and rental orders with real-time notifications and comprehensive order management.

## Features

- **User Authentication & Management**
  - User registration and login
  - Password reset functionality
  - Role-based access control (User/Admin)
  - Profile management and address handling

- **Product Management**
  - Product CRUD operations
  - Image uploads with Cloudinary
  - Category-based organization
  - Stock management with status tracking
  - Product ratings and reviews

- **Order Management**
  - Purchase and rental order support
  - Order status tracking (Pending → Ready → Pickup → Delivered → Return)
  - Real-time order updates
  - Delivery and invoice address management

- **Payment Processing**
  - Stripe integration for secure payments
  - Payment intent creation and confirmation
  - Webhook handling for payment status updates
  - Multiple payment method support

- **Real-time Notifications**
  - Socket.IO integration
  - Email notifications for order updates
  - In-app notification system
  - Admin alerts for low stock

- **Admin Dashboard**
  - Order statistics and analytics
  - Product stock monitoring
  - User management
  - Bulk notification system

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Payment**: Stripe
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Real-time**: Socket.IO
- **Authentication**: JWT
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Stripe account
- Cloudinary account
- Gmail account (for email notifications)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Fill in your configuration values:
     ```env
     # Server Configuration
     PORT=5000
     NODE_ENV=development
     
     # MongoDB Configuration
     MONGODB_URI=mongodb://localhost:27017/ecommerce
     
     # JWT Configuration
     JWT_SECRET=your_jwt_secret_key_here
     JWT_EXPIRE=7d
     
     # Stripe Configuration
     STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
     STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
     
     # Cloudinary Configuration
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     
     # Email Configuration (Gmail)
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_app_password
     
     # Frontend URL
     FRONTEND_URL=http://localhost:3000
     ```

4. **Create uploads directory**
   ```bash
   mkdir uploads
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/me` - Get current user profile

### Users
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/addresses` - Add new address
- `PUT /api/users/addresses/:id` - Update address
- `DELETE /api/users/addresses/:id` - Delete address
- `POST /api/users/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist
- `GET /api/users/wishlist` - Get wishlist
- `GET /api/users` - Get all users (Admin only)

### Products
- `GET /api/products` - Get products with filtering and pagination
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Deactivate product (Admin only)
- `POST /api/products/:id/ratings` - Add product rating
- `DELETE /api/products/:id/ratings` - Remove product rating

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `DELETE /api/orders/:id` - Cancel order (Admin only)
- `GET /api/orders/dashboard/stats` - Get dashboard statistics (Admin only)

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook handler
- `GET /api/payments/payment-methods` - Get saved payment methods
- `POST /api/payments/save-payment-method` - Save payment method

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification
- `DELETE /api/notifications/clear-all` - Clear all notifications
- `POST /api/notifications/send` - Send notification (Admin only)
- `POST /api/notifications/send-bulk` - Send bulk notifications (Admin only)

## Order Status Flow

### Purchase Orders
1. **Pending** - Order created, awaiting payment
2. **Ready** - Payment confirmed, order being prepared
3. **Pickup** - Order ready for pickup/delivery
4. **Delivered** - Order completed

### Rental Orders
1. **Pending** - Order created, awaiting payment
2. **Ready** - Payment confirmed, rental confirmed
3. **Pickup** - Item picked up by customer
4. **Delivered** - Item delivered to customer
5. **Return** - Item returned, stock restored

## Real-time Features

The application uses Socket.IO for real-time communication:

- **User Authentication**: Users must authenticate with JWT token
- **Notifications**: Real-time delivery of notifications
- **Order Updates**: Instant order status updates
- **Admin Alerts**: Real-time alerts for low stock and system events

## Email Notifications

Automated emails are sent for:
- Welcome messages
- Order confirmations
- Order status updates
- Payment confirmations
- Payment failures
- Password reset requests
- Low stock alerts

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Helmet security headers
- Input validation and sanitization
- Admin role verification

## File Upload

- Image uploads handled by Multer
- Cloudinary integration for cloud storage
- Support for multiple images per product
- Automatic image optimization

## Database Models

- **User**: Authentication, profile, addresses, wishlist
- **Product**: Product details, images, stock, ratings
- **Order**: Order management, status tracking, rental support
- **Notification**: User notifications and alerts

## Error Handling

- Centralized error handling middleware
- Validation error handling
- Database error handling
- Stripe webhook error handling

## Testing

```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set up production Stripe keys
4. Configure production email settings
5. Set up proper CORS origins
6. Use PM2 or similar process manager

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License

## Support

For support and questions, please open an issue in the repository.
