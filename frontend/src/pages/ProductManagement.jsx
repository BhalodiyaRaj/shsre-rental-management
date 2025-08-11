import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2,
  Package,
  Calendar,
  Grid,
  List,
  Eye
} from 'lucide-react'

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list' or 'calendar'

  // Mock data with availability information
  const mockProducts = [
    {
      id: 1,
      name: 'Professional Camera',
      category: 'Electronics',
      status: 'available',
      price: 'P160/day',
      image: '/camera-placeholder.jpg',
      description: 'High-quality professional camera for events and photography',
      availability: {
        '2024-01-15': 'available',
        '2024-01-16': 'rented',
        '2024-01-17': 'rented',
        '2024-01-18': 'available',
        '2024-01-19': 'available'
      }
    },
    {
      id: 2,
      name: 'Power Drill Set',
      category: 'Tools',
      status: 'rented',
      price: 'P80/day',
      image: '/drill-placeholder.jpg',
      description: 'Complete power drill set with various attachments',
      availability: {
        '2024-01-15': 'rented',
        '2024-01-16': 'rented',
        '2024-01-17': 'rented',
        '2024-01-18': 'available',
        '2024-01-19': 'available'
      }
    },
    {
      id: 3,
      name: 'Office Chair',
      category: 'Furniture',
      status: 'available',
      price: 'P120/day',
      image: '/chair-placeholder.jpg',
      description: 'Ergonomic office chair for temporary workspace setup',
      availability: {
        '2024-01-15': 'available',
        '2024-01-16': 'available',
        '2024-01-17': 'available',
        '2024-01-18': 'available',
        '2024-01-19': 'available'
      }
    },
    {
      id: 4,
      name: 'Projector',
      category: 'Electronics',
      status: 'maintenance',
      price: 'P200/day',
      image: '/projector-placeholder.jpg',
      description: 'High-lumen projector for presentations and events',
      availability: {
        '2024-01-15': 'maintenance',
        '2024-01-16': 'maintenance',
        '2024-01-17': 'maintenance',
        '2024-01-18': 'available',
        '2024-01-19': 'available'
      }
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { label: 'Available', class: 'bg-green-100 text-green-800' },
      rented: { label: 'Rented', class: 'bg-red-100 text-red-800' },
      maintenance: { label: 'Maintenance', class: 'bg-yellow-100 text-yellow-800' },
      reserved: { label: 'Reserved', class: 'bg-blue-100 text-blue-800' }
    }
    
    const config = statusConfig[status] || statusConfig.available
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    )
  }

  const getAvailabilityColor = (availability) => {
    const colorMap = {
      available: 'bg-green-500',
      rented: 'bg-red-500',
      maintenance: 'bg-yellow-500',
      reserved: 'bg-blue-500'
    }
    return colorMap[availability] || 'bg-gray-300'
  }

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesStatus && matchesCategory
  })

  const generateCalendarDays = () => {
    const days = []
    const startDate = new Date('2024-01-15')
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date.toISOString().split('T')[0])
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
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
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
              <option value="reserved">Reserved</option>
            </select>
            
            <button className="btn btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`p-2 rounded-lg ${viewMode === 'calendar' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}
          >
            <Calendar className="h-5 w-5" />
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          {filteredProducts.length} products found
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card p-4 hover:shadow-md transition-shadow">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <div className="flex items-center justify-between">
                  {getStatusBadge(product.status)}
                  <span className="font-medium text-primary-600">{product.price}</span>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <button className="flex-1 btn btn-secondary text-sm py-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button className="flex-1 btn btn-danger text-sm py-1">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="card">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Image</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Product Name</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Category</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Price</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.category}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="text-xs">
                        {getStatusBadge(product.status)}
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{product.price}</span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex space-x-1">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors" title="View Product">
                          <Eye className="h-3 w-3" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors" title="Edit Product">
                          <Edit className="h-3 w-3" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors" title="Delete Product">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Product Availability Calendar</h3>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Product</th>
                  {calendarDays.map((day) => (
                    <th key={day} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      {new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                    </td>
                    {calendarDays.map((day) => (
                      <td key={day} className="px-3 py-3 text-center">
                        <div className={`w-4 h-4 mx-auto rounded-full ${getAvailabilityColor(product.availability[day] || 'available')}`} 
                             title={`${product.name} - ${product.availability[day] || 'available'} on ${day}`}>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Calendar Legend */}
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Rented</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Maintenance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Reserved</span>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="card p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement 