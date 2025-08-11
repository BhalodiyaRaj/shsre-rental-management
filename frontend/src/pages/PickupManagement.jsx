import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  User, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Package,
  DollarSign,
  CheckCircle,
  X
} from 'lucide-react'

const PickupManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data matching the wireframe
  const mockPickups = [
    {
      id: 'OUT/0001',
      customer: 'John Doe',
      deliveryAddress: '123 Main Street, City, State 12345',
      contactNo: '+1 234 567 8900',
      email: 'john.doe@example.com',
      deliveryDate: '2024-01-15',
      deliveryTime: '09:00',
      status: 'pending',
      products: [
        { name: 'Professional Camera', quantity: 1, unitPrice: 'P160', totalPrice: 'P160' },
        { name: 'Power Drill Set', quantity: 2, unitPrice: 'P80', totalPrice: 'P160' }
      ]
    },
    {
      id: 'OUT/0002',
      customer: 'Jane Smith',
      deliveryAddress: '456 Oak Avenue, City, State 12345',
      contactNo: '+1 234 567 8901',
      email: 'jane.smith@example.com',
      deliveryDate: '2024-01-16',
      deliveryTime: '14:00',
      status: 'confirmed',
      products: [
        { name: 'Office Chair', quantity: 1, unitPrice: 'P120', totalPrice: 'P120' }
      ]
    }
  ]

  const filteredPickups = mockPickups.filter(pickup => {
    const matchesSearch = pickup.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pickup.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || pickup.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmed', class: 'bg-green-100 text-green-800' },
      completed: { label: 'Completed', class: 'bg-blue-100 text-blue-800' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Pickup Management</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Pickup</span>
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
                placeholder="Search pickups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
            
            <button className="btn btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pickup List */}
      <div className="space-y-6">
        {filteredPickups.map((pickup) => (
          <div key={pickup.id} className="card p-6">
            {/* Pickup Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Pickup {pickup.id}</h3>
                <p className="text-sm text-gray-600">Scheduled for pickup and delivery</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(pickup.status)}
                <button className="btn btn-success flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Confirm Pickup</span>
                </button>
                <button className="btn btn-secondary">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Customer and Delivery Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer</label>
                    <span className="text-gray-900">{pickup.customer}</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                    <span className="text-gray-900">{pickup.deliveryAddress}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact No.</label>
                    <span className="text-gray-900">{pickup.contactNo}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <span className="text-gray-900">{pickup.email}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
                    <span className="text-gray-900">{pickup.deliveryDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Delivery Time</label>
                    <span className="text-gray-900">{pickup.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Table */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">Product Details</h4>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pickup.products.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="h-4 w-4 text-gray-400" />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </td>
                        <td>{product.quantity}</td>
                        <td className="font-medium flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span>{product.unitPrice}</span>
                        </td>
                        <td className="font-medium flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span>{product.totalPrice}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPickups.length === 0 && (
        <div className="card p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pickups found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}

export default PickupManagement 