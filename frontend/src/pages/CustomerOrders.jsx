import React, { useState } from 'react'
import { 
  Search,
  Eye,
  Calendar,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const CustomerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data for customer orders
  const mockOrders = [
    {
      id: 'R0001',
      productName: 'Professional Camera',
      rentalDate: '2024-01-15',
      returnDate: '2024-01-20',
      totalAmount: 'P1600',
      status: 'active',
      category: 'Electronics',
      daysLeft: 2
    },
    {
      id: 'R0002',
      productName: 'Drill Machine',
      rentalDate: '2024-01-16',
      returnDate: '2024-01-18',
      totalAmount: 'P800',
      status: 'upcoming',
      category: 'Tools',
      daysLeft: 5
    },
    {
      id: 'R0003',
      productName: 'Party Tent',
      rentalDate: '2024-01-14',
      returnDate: '2024-01-17',
      totalAmount: 'P1200',
      status: 'completed',
      category: 'Events',
      daysLeft: 0
    },
    {
      id: 'R0004',
      productName: 'Laptop',
      rentalDate: '2024-01-10',
      returnDate: '2024-01-12',
      totalAmount: 'P900',
      status: 'completed',
      category: 'Electronics',
      daysLeft: 0
    },
    {
      id: 'R0005',
      productName: 'Generator',
      rentalDate: '2024-01-08',
      returnDate: '2024-01-10',
      totalAmount: 'P600',
      status: 'completed',
      category: 'Tools',
      daysLeft: 0
    },
    {
      id: 'R0006',
      productName: 'Sound System',
      rentalDate: '2024-01-20',
      returnDate: '2024-01-22',
      totalAmount: 'P1500',
      status: 'active',
      category: 'Events',
      daysLeft: 1
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { 
        label: 'Active', 
        class: 'bg-green-100 text-green-800',
        icon: Clock
      },
      upcoming: { 
        label: 'Upcoming', 
        class: 'bg-blue-100 text-blue-800',
        icon: Calendar
      },
      completed: { 
        label: 'Completed', 
        class: 'bg-gray-100 text-gray-800',
        icon: CheckCircle
      }
    }
    
    const config = statusConfig[status] || statusConfig.active
    const Icon = config.icon
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class} flex items-center space-x-1`}>
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    )
  }

  const getDaysLeftBadge = (daysLeft, status) => {
    if (status === 'completed') return null
    
    if (daysLeft === 0) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center space-x-1">
          <AlertCircle className="h-3 w-3" />
          <span>Due Today</span>
        </span>
      )
    } else if (daysLeft <= 2) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>{daysLeft} day{daysLeft === 1 ? '' : 's'} left</span>
        </span>
      )
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{daysLeft} days left</span>
        </span>
      )
    }
  }

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusCount = (status) => mockOrders.filter(order => order.status === status).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span>Browse Products</span>
        </button>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Active Rentals</p>
              <p className="text-xl font-bold text-gray-900">{getStatusCount('active')}</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Upcoming</p>
              <p className="text-xl font-bold text-gray-900">{getStatusCount('upcoming')}</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-900">{getStatusCount('completed')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search my orders by product, ID, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="px-4 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Order History</h3>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental Date</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Left</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900 truncate max-w-32">{order.productName}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{order.category}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{order.rentalDate}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{order.returnDate}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-900">{order.totalAmount}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <div className="text-xs">
                      {getStatusBadge(order.status)}
                    </div>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <div className="text-xs">
                      {getDaysLeftBadge(order.daysLeft, order.status)}
                    </div>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <button className="text-primary-600 hover:text-primary-900 text-xs font-medium px-2 py-1 rounded hover:bg-primary-50 transition-colors">
                      <Eye className="h-3 w-3 inline mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Summary */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredOrders.length} of {mockOrders.length} orders
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Active: {getStatusCount('active')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Upcoming: {getStatusCount('upcoming')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span>Completed: {getStatusCount('completed')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-4">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="btn btn-primary flex items-center justify-center space-x-2 py-3">
            <Package className="h-4 w-4" />
            <span>Browse Products</span>
          </button>
          <button className="btn btn-secondary flex items-center justify-center space-x-2 py-3">
            <Calendar className="h-4 w-4" />
            <span>Check Availability</span>
          </button>
          <button className="btn btn-success flex items-center justify-center space-x-2 py-3">
            <DollarSign className="h-4 w-4" />
            <span>Payment History</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerOrders 