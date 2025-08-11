import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Package, 
  Heart, 
  ShoppingCart,
  Plus,
  Minus
} from 'lucide-react'

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantities, setQuantities] = useState({})

  // Mock data - in a real app this would come from an API
  const mockProducts = [
    {
      id: 1,
      name: 'Professional Camera',
      category: 'Electronics',
      status: 'Available',
      price: 'P160',
      image: null,
      description: 'High-quality professional camera for events and photography.'
    },
    {
      id: 2,
      name: 'Power Drill Set',
      category: 'Tools',
      status: 'Available',
      price: 'P80',
      image: null,
      description: 'Complete power drill set with various attachments.'
    },
    {
      id: 3,
      name: 'Office Chair',
      category: 'Furniture',
      status: 'Available',
      price: 'P120',
      image: null,
      description: 'Ergonomic office chair with adjustable features.'
    },
    {
      id: 4,
      name: 'Projector',
      category: 'Electronics',
      status: 'Available',
      price: 'P200',
      image: null,
      description: 'HD projector for presentations and home theater.'
    },
    {
      id: 5,
      name: 'Ladder',
      category: 'Tools',
      status: 'Available',
      price: 'P60',
      image: null,
      description: 'Sturdy aluminum ladder for various heights.'
    },
    {
      id: 6,
      name: 'Sound System',
      category: 'Electronics',
      status: 'Available',
      price: 'P180',
      image: null,
      description: 'Professional sound system for events and parties.'
    }
  ]

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleQuantityChange = (productId, change) => {
    const currentQty = quantities[productId] || 1
    const newQty = Math.max(1, currentQty + change)
    setQuantities(prev => ({
      ...prev,
      [productId]: newQty
    }))
  }

  const handleAddToCart = (product) => {
    // In a real app, this would add to cart state/context
    console.log('Added to cart:', product, quantities[product.id] || 1)
  }

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
    if (!quantities[product.id]) {
      setQuantities(prev => ({
        ...prev,
        [product.id]: 1
      }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
      </div>

      {/* Search and Filter */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="tools">Tools</option>
              <option value="furniture">Furniture</option>
              <option value="vehicles">Vehicles</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            
            <button className="btn btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProductSelect(product)}
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 rounded-lg object-cover"
                    />
                  ) : (
                    <Package className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                
                <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-primary-600 mb-3">{product.price}</p>
                
                <button 
                  className="w-full btn btn-primary flex items-center justify-center space-x-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(product)
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">4</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">5</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>

        {/* Product Quick View Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Quick View</h3>
            
            {selectedProduct ? (
              <div className="space-y-4">
                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  {selectedProduct.image ? (
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-32 rounded-lg object-cover"
                    />
                  ) : (
                    <Package className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                
                <h4 className="font-medium text-gray-900">{selectedProduct.name}</h4>
                <p className="text-lg font-bold text-primary-600">{selectedProduct.price}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(selectedProduct.id, -1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{quantities[selectedProduct.id] || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(selectedProduct.id, 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full btn btn-primary flex items-center justify-center space-x-2"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button className="w-full btn btn-secondary">
                    View Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Select a product to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog 