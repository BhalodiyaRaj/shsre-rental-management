import React, { useState } from 'react'
import { 
  Heart, 
  Share2, 
  Calendar,
  Package,
  Star,
  ChevronLeft,
  ShoppingCart,
  User,
  MessageSquare
} from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'

const ProductDetail = ({ addToCart, addToWishlist, isInWishlist }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [couponCode, setCouponCode] = useState('')

  // Mock product data - in real app this would come from API
  const product = {
    id: id || 1,
    name: 'Professional DSLR Camera Kit',
    price: 1500,
    originalPrice: 2000,
    description: 'High-quality professional DSLR camera with multiple lenses, tripod, and carrying case. Perfect for events, weddings, and professional photography. Includes 24-70mm f/2.8 lens, 70-200mm f/2.8 lens, professional tripod, and waterproof carrying case.',
    specifications: {
      'Camera Type': 'DSLR',
      'Sensor': 'Full Frame 24.1MP',
      'Lens Mount': 'EF Mount',
      'ISO Range': '100-25600',
      'Video Resolution': '4K 30fps',
      'Battery Life': 'Up to 8 hours',
      'Weight': '1.5 kg',
      'Included Items': 'Camera body, 2 lenses, tripod, case, charger'
    },
    rating: 4.8,
    reviews: 124,
    images: ['/api/placeholder/600/600'],
    category: 'Electronics',
    inStock: true,
    minRentalDays: 1,
    maxRentalDays: 30
  }

  const handleAddToCart = () => {
    if (!fromDate || !toDate) {
      alert('Please select rental dates')
      return
    }
    
    const rentalDays = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24))
    const totalPrice = product.price * rentalDays * quantity
    
    addToCart({
      ...product,
      quantity,
      fromDate,
      toDate,
      rentalDays,
      totalPrice
    })
    
    navigate('/cart')
  }

  const handleAddToWishlist = () => {
    addToWishlist(product.id)
  }

  const calculateRentalDays = () => {
    if (!fromDate || !toDate) return 0
    return Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24))
  }

  const calculateTotalPrice = () => {
    const days = calculateRentalDays()
    return days * product.price * quantity
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 365)
  const maxDateStr = maxDate.toISOString().split('T')[0]

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
           
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-40 h-40 bg-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-5xl">📷</span>
                </div>
              </div>
              <div className="flex space-x-3 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 bg-gray-100 rounded border-2 border-transparent hover:border-primary-500 cursor-pointer transition-colors flex items-center justify-center">
                    <span className="text-gray-400 text-sm">📷</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Product Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <button className="text-primary-600 hover:text-primary-700 font-medium mt-2">
                Read more
              </button>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-800">John Doe</span>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <p className="text-gray-600">"Excellent camera quality! Perfect for my wedding shoot."</p>
              </div>
              <button className="text-primary-600 hover:text-primary-700 font-medium mt-3">
                View all reviews
              </button>
            </div>
          </div>

          {/* Right Panel - Product Info and Actions */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  In Stock
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-primary-600">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-600">per day</span>
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
              </div>

              {/* Rental Dates */}
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Select Rental Period
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      min={today}
                      max={maxDateStr}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      min={fromDate || today}
                      max={maxDateStr}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rental Summary */}
              {fromDate && toDate && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Rental Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rental Period:</span>
                      <span className="font-medium">{calculateRentalDays()} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Rate:</span>
                      <span className="font-medium">₹{product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">Total Price:</span>
                        <span className="font-bold text-lg text-primary-600">₹{calculateTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || !fromDate || !toDate}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-md border transition-colors ${
                    isInWishlist(product.id)
                      ? 'border-red-300 bg-red-50 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-300'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  <span>{isInWishlist(product.id) ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply Coupon</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Minimum rental period: {product.minRentalDays} day</li>
                <li>• Maximum rental period: {product.maxRentalDays} days</li>
                <li>• Security deposit may be required</li>
                <li>• Equipment must be returned in same condition</li>
                <li>• Late returns subject to additional charges</li>
              </ul>
            </div>

            {/* Share */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share</h3>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share this product</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 