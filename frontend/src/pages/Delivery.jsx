import React, { useState } from 'react'
import { 
  ChevronLeft,
  Package,
  ShoppingCart,
  User,
  MessageSquare,
  MapPin,
  Truck
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Delivery = ({ cartItems, updateDeliveryInfo }) => {
  const navigate = useNavigate()
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [invoiceAddress, setInvoiceAddress] = useState('')
  const [billingSameAsDelivery, setBillingSameAsDelivery] = useState(true)
  const [deliveryMethod, setDeliveryMethod] = useState('pickup')

  // Mock cart data if none provided
  const items = cartItems.length > 0 ? cartItems : [
    {
      id: 1,
      name: 'Professional DSLR Camera Kit',
      price: 1500,
      quantity: 1,
      fromDate: '2024-02-01',
      toDate: '2024-02-05',
      rentalDays: 4,
      totalPrice: 6000,
    },
    {
      id: 2,
      name: 'Heavy Duty Drill Machine',
      price: 800,
      quantity: 2,
      fromDate: '2024-02-01',
      toDate: '2024-02-03',
      rentalDays: 2,
      totalPrice: 3200,
    }
  ]

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const deliveryCharge = deliveryMethod === 'pickup' ? 0 : 200
  const taxes = subtotal * 0.18 // 18% GST
  const total = subtotal + deliveryCharge + taxes

  const handleConfirm = () => {
    if (!deliveryAddress.trim()) {
      alert('Please enter delivery address')
      return
    }

    const deliveryInfo = {
      deliveryAddress,
      invoiceAddress: billingSameAsDelivery ? deliveryAddress : invoiceAddress,
      deliveryMethod,
      deliveryCharge
    }

    updateDeliveryInfo(deliveryInfo)
    navigate('/payment')
  }

  const handleBackToCart = () => {
    navigate('/cart')
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
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Shopping Cart</span>
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

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <span className="text-gray-500">Review Order</span>
            <span className="text-gray-400">/</span>
            <span className="text-primary-600 font-medium">Delivery</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Address Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Address</h2>
              
              {/* Delivery Address */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Delivery Address
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your complete delivery address..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              {/* Invoice Address Toggle */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={billingSameAsDelivery}
                    onChange={(e) => setBillingSameAsDelivery(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Billing address same as delivery address
                  </span>
                </label>
              </div>

              {/* Invoice Address (if different) */}
              {!billingSameAsDelivery && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Address
                  </label>
                  <textarea
                    value={invoiceAddress}
                    onChange={(e) => setInvoiceAddress(e.target.value)}
                    placeholder="Enter your billing/invoice address..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              )}

              {/* Delivery Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Truck className="h-4 w-4 inline mr-2" />
                  Delivery Method
                </label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="pickup">Pickup / Free Shipping</option>
                  <option value="delivery">Home Delivery (+₹200)</option>
                  <option value="express">Express Delivery (+₹500)</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  {deliveryMethod === 'pickup' && 'Free pickup from our store'}
                  {deliveryMethod === 'delivery' && 'Standard delivery within 24-48 hours'}
                  {deliveryMethod === 'express' && 'Same day delivery (if ordered before 2 PM)'}
                </p>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  placeholder="Any special instructions for delivery..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{items.length} Items</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium">
                    {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
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
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleConfirm}
                  disabled={!deliveryAddress.trim()}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm
                </button>
                
                <button
                  onClick={handleBackToCart}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-700 transition-colors"
                >
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delivery


