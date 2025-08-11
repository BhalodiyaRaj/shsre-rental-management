import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  CreditCard,
  Save,
  X
} from 'lucide-react'

const OrderDetail = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    customerName: 'John Doe',
    billingAddress: '123 Main Street, City, State 12345',
    shippingAddress: '123 Main Street, City, State 12345',
    contactNo: '+1 234 567 8900',
    email: 'john.doe@example.com',
    deliveryDate: '2024-01-15',
    returnDate: '2024-01-20',
    deliveryTime: '09:00',
    returnTime: '17:00',
    paymentStatus: 'Pending',
    orderStatus: 'Quotation',
    totalAmount: 'P1600',
    notes: 'Customer requested early morning delivery'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving order:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data to original values
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    const statusConfig = {
      'Quotation': 'bg-red-100 text-red-800',
      'Confirmed': 'bg-yellow-100 text-yellow-800',
      'Pickup': 'bg-green-100 text-green-800',
      'Return': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-gray-100 text-gray-800'
    }
    return statusConfig[status] || statusConfig['Quotation']
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600">Order ID: {id}</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button 
                onClick={handleCancel}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Order
            </button>
          )}
        </div>
      </div>

      {/* Order State Management */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rental State Management</h3>
        <p className="text-sm text-gray-600 mb-4">
          Shows the current state of the order. Click on a status to update the order state.
        </p>
        
        <div className="flex items-center space-x-4">
          {['Quotation', 'Confirmed', 'Pickup', 'Return', 'Completed'].map((status, index) => (
            <div key={status} className="flex items-center">
              <div className={`px-4 py-2 rounded-lg font-medium ${getStatusColor(status)}`}>
                {status}
              </div>
              {index < 4 && (
                <div className="mx-2 text-gray-400">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Addresses</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    className="input pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Dates and Times */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="time"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="time"
                    name="returnTime"
                    value={formData.returnTime}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status and Payment */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status & Payment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Failed">Failed</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Display when order gets confirmed
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status
                </label>
                <select
                  name="orderStatus"
                  value={formData.orderStatus}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input"
                >
                  <option value="Quotation">Quotation</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Return">Return</option>
                  <option value="Completed">Completed</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Display when order gets confirmed
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount
                </label>
                <input
                  type="text"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input font-bold text-lg"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                className="input"
                placeholder="Add any special instructions or notes..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="card p-6 bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium text-blue-800">Payment</h4>
            <p className="text-sm text-blue-700">
              Smart button for payment. Once clicked, a new window will be opened for payment for this order.
            </p>
          </div>
          <button className="btn btn-primary flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Process Payment</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail 