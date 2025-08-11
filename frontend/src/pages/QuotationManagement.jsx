import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit,
  Trash2,
  Calendar,
  User,
  DollarSign
} from 'lucide-react'

const QuotationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data matching the wireframe
  const mockQuotations = [
    {
      id: 'R0001',
      customerName: 'John Doe',
      deliveryDate: '2024-01-15',
      returnDate: '2024-01-20',
      totalAmount: 'P1600',
      status: 'quotation'
    },
    {
      id: 'R0002',
      customerName: 'Jane Smith',
      deliveryDate: '2024-01-16',
      returnDate: '2024-01-18',
      totalAmount: 'P800',
      status: 'confirmed'
    },
    {
      id: 'R0003',
      customerName: 'Bob Johnson',
      deliveryDate: '2024-01-14',
      returnDate: '2024-01-17',
      totalAmount: 'P1200',
      status: 'pickup'
    },
    {
      id: 'R0004',
      customerName: 'Alice Brown',
      deliveryDate: '2024-01-12',
      returnDate: '2024-01-15',
      totalAmount: 'P900',
      status: 'return'
    },
    {
      id: 'R0005',
      customerName: 'Charlie Wilson',
      deliveryDate: '2024-01-10',
      returnDate: '2024-01-13',
      totalAmount: 'P600',
      status: 'completed'
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      quotation: { label: 'Quotation', class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmed', class: 'bg-blue-100 text-blue-800' },
      pickup: { label: 'Pickup', class: 'bg-orange-100 text-orange-800' },
      return: { label: 'Return', class: 'bg-red-100 text-red-800' },
      completed: { label: 'Completed', class: 'bg-green-100 text-green-800' }
    }
    
    const config = statusConfig[status] || statusConfig.quotation
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    )
  }

  const filteredQuotations = mockQuotations.filter(quotation => {
    const matchesSearch = quotation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || quotation.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quotation & Order Management</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Order</span>
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
                placeholder="Search quotations..."
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
              <option value="quotation">Quotation</option>
              <option value="confirmed">Confirmed</option>
              <option value="pickup">Pickup</option>
              <option value="return">Return</option>
              <option value="completed">Completed</option>
            </select>
            
            <button className="btn btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quotations & Orders</h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Order ID</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Customer Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Delivery</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Return</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Amount</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{quotation.id}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-900 truncate">{quotation.customerName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{quotation.deliveryDate}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{quotation.returnDate}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{quotation.totalAmount}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-xs">
                      {getStatusBadge(quotation.status)}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <button className="text-primary-600 hover:text-primary-900 p-1 rounded transition-colors" title="View Quotation">
                        <Eye className="h-3 w-3" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors" title="Edit Quotation">
                        <Edit className="h-3 w-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors" title="Delete Quotation">
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
              Showing 1 to 5 of 5 results
            </div>
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
        </div>
      </div>

      {/* Status Color Legend */}
      <div className="card p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Status Color Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Yellow - Quotation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Blue - Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Orange - Pickup</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Red - Return</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Green - Completed</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Status colors indicate the current rental state and workflow progression.
        </p>
      </div>
    </div>
  )
}

export default QuotationManagement 