import React, { useState } from 'react'
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  TrendingUp,
  Search,
  Filter,
  Plus
} from 'lucide-react'

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data - in a real app this would come from an API
  const mockOrders = [
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
      quotation: { label: 'Quotation', class: 'status-quotation' },
      confirmed: { label: 'Confirmed', class: 'status-confirmed' },
      pickup: { label: 'Pickup', class: 'status-pickup' },
      return: { label: 'Return', class: 'status-return' },
      completed: { label: 'Completed', class: 'status-completed' }
    }
    
    const config = statusConfig[status] || statusConfig.quotation
    return (
      <span className={`status-badge ${config.class}`}>
        {config.label}
      </span>
    )
  }

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Order</span>
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
              <p className="text-xs font-medium text-gray-600">Total Products</p>
              <p className="text-xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Active Orders</p>
              <p className="text-xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-xl font-bold text-gray-900">P45,600</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Customers</p>
              <p className="text-xl font-bold text-gray-900">156</p>
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
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
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
              className="px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="quotation">Quotation</option>
              <option value="confirmed">Confirmed</option>
              <option value="pickup">Pickup</option>
              <option value="return">Return</option>
              <option value="completed">Completed</option>
            </select>
            
            <button className="btn btn-secondary flex items-center space-x-1 px-3 py-2 text-sm">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900 truncate max-w-20">{order.customerName}</span>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-900">{order.deliveryDate}</span>
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
                    <button className="text-primary-600 hover:text-primary-900 text-xs font-medium px-2 py-1 rounded hover:bg-primary-50 transition-colors">
                      View
                    </button>
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

      {/* Status Legend */}
      <div className="card p-4">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Status Color Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Red - Quotation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Yellow - Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Green - Pickup</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Blue - Return</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Grey - Completed</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          Filter by status: Once user clicks on the status, it will filter the data based on the selected status.
        </p>
      </div>
    </div>
  )
}

export default Dashboard 