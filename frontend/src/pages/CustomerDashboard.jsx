import React, { useState } from 'react'
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Calendar,
  Search,
  Filter,
  Eye,
  Clock
} from 'lucide-react'

const CustomerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for customer dashboard
  const mockRentals = [
    {
      id: 'R0001',
      productName: 'Professional Camera',
      rentalDate: '2024-01-15',
      returnDate: '2024-01-20',
      totalAmount: 'P1600',
      status: 'active'
    },
    {
      id: 'R0002',
      productName: 'Drill Machine',
      rentalDate: '2024-01-16',
      returnDate: '2024-01-18',
      totalAmount: 'P800',
      status: 'upcoming'
    },
    {
      id: 'R0003',
      productName: 'Party Tent',
      rentalDate: '2024-01-14',
      returnDate: '2024-01-17',
      totalAmount: 'P1200',
      status: 'completed'
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Active', class: 'bg-green-100 text-green-800' },
      upcoming: { label: 'Upcoming', class: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Completed', class: 'bg-gray-100 text-gray-800' }
    }
    
    const config = statusConfig[status] || statusConfig.active
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    )
  }

  const filteredRentals = mockRentals.filter(rental => 
    rental.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rental.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span>Browse Products</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Rentals</p>
              <p className="text-xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Active Rentals</p>
              <p className="text-xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Upcoming</p>
              <p className="text-xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Spent</p>
              <p className="text-xl font-bold text-gray-900">P8,400</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search my rentals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* My Rentals Table */}
      <div className="card">
        <div className="px-4 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">My Rentals</h3>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental ID</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental Date</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRentals.map((rental) => (
                <tr key={rental.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-900">{rental.id}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900 truncate max-w-32">{rental.productName}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{rental.rentalDate}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{rental.returnDate}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-900">{rental.totalAmount}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <div className="text-xs">
                      {getStatusBadge(rental.status)}
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
            <ShoppingCart className="h-4 w-4" />
            <span>My Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard 