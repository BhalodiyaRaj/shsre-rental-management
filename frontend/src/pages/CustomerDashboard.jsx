import React, { useState } from 'react'
import { 
  Home,
  ShoppingCart,
  Heart,
  Search,
  ChevronDown,
  Grid,
  List,
  Star,
  Eye,
  MessageSquare,
  User,
  Package
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CustomerDashboard = ({ addToCart: addToCartProp, addToWishlist: addToWishlistProp, isInWishlist: isInWishlistProp, cartItems, wishlist }) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')

  // Mock product data
  const products = [
    {
      id: 1,
      name: 'Professional DSLR Camera',
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
    },
    {
      id: 5,
      name: 'Industrial Generator 5KW',
      price: 3000,
      originalPrice: 4500,
      image: '/api/placeholder/300/300',
      category: 'Industrial',
      rating: 4.5,
      reviews: 67,
      inStock: true
    },
    {
      id: 6,
      name: 'Wedding Decoration Set',
      price: 900,
      originalPrice: 1500,
      image: '/api/placeholder/300/300',
      category: 'Events',
      rating: 4.4,
      reviews: 92,
      inStock: true
    },
    {
      id: 7,
      name: 'Professional Lighting Kit',
      price: 1800,
      originalPrice: 2500,
      image: '/api/placeholder/300/300',
      category: 'Events',
      rating: 4.6,
      reviews: 78,
      inStock: true
    },
    {
      id: 8,
      name: 'Construction Scaffolding',
      price: 2200,
      originalPrice: 3200,
      image: '/api/placeholder/300/300',
      category: 'Construction',
      rating: 4.3,
      reviews: 45,
      inStock: true
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'tools', name: 'Tools' },
    { id: 'events', name: 'Events' },
    { id: 'construction', name: 'Construction' }
  ]

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-500', name: '₹0 - ₹500' },
    { id: '500-1000', name: '₹500 - ₹1000' },
    { id: '1000-2000', name: '₹1000 - ₹2000' },
    { id: '2000+', name: '₹2000+' }
  ]

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' }
  ]

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory
    const matchesPrice = priceRange === 'all' || 
      (priceRange === '0-500' && product.price <= 500) ||
      (priceRange === '500-1000' && product.price > 500 && product.price <= 1000) ||
      (priceRange === '1000-2000' && product.price > 1000 && product.price <= 2000) ||
      (priceRange === '2000+' && product.price > 2000)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.id - a.id
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
     
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
         
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </button>
              <button 
                onClick={() => navigate('/products')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Package className="h-5 w-5" />
                <span className="font-medium">Rental Shop</span>
              </button>
              <button 
                onClick={() => navigate('/wishlist')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span className="font-medium">Wishlist ({wishlist.length})</span>
              </button>
              <button 
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Cart ({cartItems.length})</span>
              </button>
            </div>

      
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
          <div className="flex space-x-4 py-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-100 text-primary-700 border border-primary-300'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
         
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Attributes</h3>
              
                   <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Colors</h4>
                <div className="space-y-2">
                  {['Red', 'Blue', 'Green', 'Black', 'White'].map((color) => (
                    <label key={color} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-gray-600">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

            
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {priceRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>

            
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Availability</h4>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
                </label>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-gray-600">{rating}+ Stars</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

      
          <div className="flex-1">
          
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                 
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option>Price List</option>
                      <option>Daily Rates</option>
                      <option>Weekly Rates</option>
                      <option>Monthly Rates</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
              
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 text-sm transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 text-sm transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product) => (
                <div key={product.id} className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
                  viewMode === 'list' ? 'flex' : ''
                }`}> {/* Product Image */}
                  <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
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
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
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
                        onClick={() => addToCartProp(product)}
                        disabled={!product.inStock}
                        className="flex-1 bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => addToWishlistProp(product.id)}
                        className={`p-2 rounded-md border transition-colors ${
                          isInWishlistProp(product.id)
                            ? 'border-red-300 bg-red-50 text-red-600'
                            : 'border-gray-300 text-gray-400 hover:text-red-600 hover:border-red-300'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlistProp(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-1">
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                  &lt;
                </button>
                <button className="px-3 py-2 text-sm bg-red-600 text-white rounded-md">1</button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">2</button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">3</button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">4</button>
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">10</button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
                  &gt;
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard 