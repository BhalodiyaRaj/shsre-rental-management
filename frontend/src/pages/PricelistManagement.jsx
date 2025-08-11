import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2,
  Package,
  Clock,
  Calendar,
  DollarSign
} from 'lucide-react'

const PricelistManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRentalType, setSelectedRentalType] = useState('all')

  // Mock data matching the wireframe
  const mockPricelists = [
    {
      id: 1,
      productName: 'Professional Camera',
      rentalType: 'hour',
      price: 'P10',
      category: 'Electronics'
    },
    {
      id: 2,
      productName: 'Professional Camera',
      rentalType: 'day',
      price: 'P60',
      category: 'Electronics'
    },
    {
      id: 3,
      productName: 'Professional Camera',
      rentalType: 'week',
      price: 'P300',
      category: 'Electronics'
    },
    {
      id: 4,
      productName: 'Power Drill Set',
      rentalType: 'hour',
      price: 'P5',
      category: 'Tools'
    },
    {
      id: 5,
      productName: 'Power Drill Set',
      rentalType: 'day',
      price: 'P30',
      category: 'Tools'
    },
    {
      id: 6,
      productName: 'Office Chair',
      rentalType: 'day',
      price: 'P20',
      category: 'Furniture'
    },
    {
      id: 7,
      productName: 'Office Chair',
      rentalType: 'week',
      price: 'P100',
      category: 'Furniture'
    }
  ]

  const getRentalTypeIcon = (type) => {
    const iconConfig = {
      hour: { icon: Clock, label: 'Hour', class: 'text-blue-600' },
      day: { icon: Calendar, label: 'Day', class: 'text-green-600' },
      week: { icon: Calendar, label: 'Week', class: 'text-purple-600' },
      month: { icon: Calendar, label: 'Month', class: 'text-orange-600' }
    }
    
    const config = iconConfig[type] || iconConfig.hour
    const Icon = config.icon
    return (
      <div className={`flex items-center space-x-2 ${config.class}`}>
        <Icon className="h-4 w-4" />
        <span className="capitalize">{config.label}</span>
      </div>
    )
  }

  const filteredPricelists = mockPricelists.filter(pricelist => {
    const matchesSearch = pricelist.productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || pricelist.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesRentalType = selectedRentalType === 'all' || pricelist.rentalType === selectedRentalType
    return matchesSearch && matchesCategory && matchesRentalType
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Pricelist Management</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Pricelist</span>
        </button>
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
              value={selectedRentalType}
              onChange={(e) => setSelectedRentalType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Rental Types</option>
              <option value="hour">Hour</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            
            <button className="btn btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricelist Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Pricelist</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage flexible pricing for different rental durations. Schedules are inside this and must be editable.
          </p>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Product Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Rental Type</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Price</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Category</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPricelists.map((pricelist) => (
                <tr key={pricelist.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 truncate">{pricelist.productName}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-xs">
                      {getRentalTypeIcon(pricelist.rentalType)}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{pricelist.price}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{pricelist.category}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors" title="Edit Pricelist">
                        <Edit className="h-3 w-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors" title="Delete Pricelist">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1 to 7 of 7 results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="card p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Flexible Pricing System</h4>
            <p className="text-sm text-blue-700 mt-1">
              Set different prices for different rental durations. Example: P10/hour, P60/day, P300/week, P1200/month.
              The system automatically applies the appropriate pricing based on the rental period selected by customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricelistManagement 