# Quick Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- Stripe account
- Cloudinary account
- Gmail account

## Quick Start

### 1. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# Fill in MongoDB, Stripe, Cloudinary, and Gmail details
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start MongoDB
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### 4. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Key Features Implemented

✅ **Complete Backend API**
- User authentication & management
- Product management with image uploads
- Order management (purchase & rental)
- Stripe payment integration
- Real-time notifications (Socket.IO)
- Email notifications (Nodemailer)
- Admin dashboard & controls

✅ **Database Models**
- User (with addresses & wishlist)
- Product (with images & ratings)
- Order (with status tracking)
- Notification system

✅ **Security Features**
- JWT authentication
- Password hashing
- Rate limiting
- Input validation
- CORS & Helmet

✅ **File Management**
- Cloudinary integration
- Image upload handling
- Multiple image support

✅ **Payment System**
- Stripe payment intents
- Webhook handling
- Payment status tracking

✅ **Real-time Features**
- Socket.IO integration
- Live notifications
- Order status updates

## API Testing

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "userName": "TestUser",
    "phoneNo": "1234567890",
    "password": "password123"
  }'
```

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

## Admin Access

To create an admin user:
1. Register normally
2. Manually update user role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Configure production Stripe keys
4. Set up proper CORS origins
5. Use PM2 or similar process manager
6. Set up SSL certificates
7. Configure reverse proxy (Nginx)

## Support

- Check the main README.md for detailed API documentation
- Review error logs for troubleshooting
- Ensure all environment variables are set correctly
- Verify MongoDB connection and Stripe webhook configuration
