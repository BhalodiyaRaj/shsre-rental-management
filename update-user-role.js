const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema (simplified)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  phoneNo: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Update user role to admin
const updateUserRole = async () => {
  try {
    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { email: 'testadmin@example.com' },
      { role: 'admin' },
      { new: true }
    );

    if (updatedUser) {
      console.log('✅ User role updated successfully!');
      console.log('📧 Email:', updatedUser.email);
      console.log('👤 Username:', updatedUser.userName);
      console.log('👑 New Role:', updatedUser.role);
      console.log('🆔 User ID:', updatedUser._id);
    } else {
      console.log('❌ User not found with email: testadmin@example.com');
    }
    
  } catch (error) {
    console.error('❌ Error updating user role:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
};

updateUserRole();
