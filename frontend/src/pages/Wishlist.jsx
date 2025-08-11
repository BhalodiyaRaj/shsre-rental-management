import React from 'react'
import { 
  Heart, 
  ShoppingCart, 
  ChevronLeft,
  Package,
  User,
  MessageSquare,
  Trash2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Wishlist = ({ wishlist, addToCart, removeFromWishlist, isInWishlist }) => {
  const navigate = useNavigate()

  // Use actual wishlist data only
  const wishlistItems = wishlist || []

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Professional DSLR Camera Kit',
      price: 1500,
      originalPrice: 2000,
      image: '/api/placeholder/300/300',
      category: 'Electronics',
      rating: 4.8,
      reviews: 124,
      inStock: true
    },
    {
      id: 2,
      name: 'Heavy Duty Drill Machine',
      price: 800,
      originalPrice: 1200,
      image: '/api/placeholder/300/300',
      category: 'Tools',
      rating: 4.6,
      reviews: 89,
      inStock: true
    },
    {
      id: 3,
      name: 'Party Tent 10x20ft',
      price: 1200,
      originalPrice: 1800,
      image: '/api/placeholder/300/300',
      category: 'Events',
      rating: 4.7,
      reviews: 156,
      inStock: true
    },
    {
      id: 4,
      name: 'Professional Sound System',
      price: 2500,
      originalPrice: 3500,
      image: '/api/placeholder/300/300',
      category: 'Audio',
      rating: 4.9,
      reviews: 203,
      inStock: false
    }
  ]

  const handleAddToCart = (product) => {
    addToCart(product)
    // Remove from wishlist after adding to cart
    removeFromWishlist(product.id)
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
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
              <button 
                onClick={() => navigate('/products')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Package className="h-5 w-5" />
                <span className="font-medium">Rental Shop</span>
              </button>
              <button className="flex items-center space-x-2 text-primary-600 font-medium">
                <Heart className="h-5 w-5" />
                <span>Wishlist ({wishlistItems.length})</span>
              </button>
              <button 
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishlistItems.length} items in your wishlist
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding products to your wishlist to see them here.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.filter(product => wishlistItems.includes(product.id)).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">W</span>
                  </div>
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </div>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1 bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist

