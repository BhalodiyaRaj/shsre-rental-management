import React, { useState } from 'react'
import { 
  Heart, 
  Trash2, 
  ChevronLeft,
  Package,
  ShoppingCart,
  User,
  MessageSquare
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Cart = ({ cartItems, updateCartItem, removeFromCart, addToWishlist, isInWishlist }) => {
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  // Use only actual cart items
  const items = cartItems || []

  const handleQuantityChange = (itemId, change) => {
    const item = items.find(item => item.id === itemId)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change)
      const newTotalPrice = (item.totalPrice / item.quantity) * newQuantity
      
      updateCartItem(itemId, {
        ...item,
        quantity: newQuantity,
        totalPrice: newTotalPrice
      })
    }
  }

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId)
  }

  const handleAddToWishlist = (itemId) => {
    addToWishlist(itemId)
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // Mock coupon logic
      if (couponCode.toLowerCase() === 'welcome10') {
        setAppliedCoupon({ code: 'WELCOME10', discount: 0.1, description: '10% off on first rental' })
      } else if (couponCode.toLowerCase() === 'bulk20') {
        setAppliedCoupon({ code: 'BULK20', discount: 0.2, description: '20% off on bulk orders' })
      } else {
        alert('Invalid coupon code')
      }
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const deliveryCharge = 0 // Free pickup
  const taxes = subtotal * 0.18 // 18% GST
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0
  const total = subtotal + deliveryCharge + taxes - discount

  const handleProceedToCheckout = () => {
    navigate('/delivery')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <Package className="h-5 w-5" />
                <span className="font-medium">Rental Shop</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <Heart className="h-5 w-5" />
                <span className="font-medium">Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-primary-600 font-medium">
                <ShoppingCart className="h-5 w-5" />
                <span>Shopping Cart</span>
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="font-medium">Adam</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

    
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <span className="text-primary-600 font-medium">Review Order</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Delivery</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Order Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Overview</h2>
              
              {/* Product List or Empty State */}
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some items to your cart to continue shopping</p>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">W</span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.fromDate} to {item.toDate} ({item.rentalDays} days)
                      </p>
                      <p className="text-sm text-gray-600">
                        ₹{item.price.toLocaleString()} per day
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{item.totalPrice.toLocaleString()}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAddToWishlist(item.id)}
                        className={`p-2 rounded-md border transition-colors ${
                          isInWishlist(item.id)
                            ? 'border-red-300 bg-red-50 text-red-600'
                            : 'border-gray-300 text-gray-400 hover:text-red-600 hover:border-red-300'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                </div>
              )}

              {/* Coupon Code - Only show when there are items */}
              {items.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Apply Coupon</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button 
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            Coupon {appliedCoupon.code} applied!
                          </p>
                          <p className="text-xs text-green-600">{appliedCoupon.description}</p>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No items in cart</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({items.length})</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charge</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sub Total</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount ({appliedCoupon.code})</span>
                      <span className="font-medium text-green-600">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes (18% GST)</span>
                    <span className="font-medium">₹{taxes.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleProceedToCheckout}
                disabled={items.length === 0}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart


