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
  DollarSign,
  Bell,
  AlertTriangle,
  FileText,
  Truck,
  RotateCcw,
  CreditCard,
  Download,
  CheckCircle
} from 'lucide-react'

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedWorkflow, setSelectedWorkflow] = useState('all')

  // Mock data with complete workflow information
  const mockOrders = [
    {
      id: 'R0001',
      customerName: 'John Doe',
      deliveryDate: '2024-01-15',
      returnDate: '2024-01-20',
      totalAmount: 'P1600',
      status: 'quotation',
      workflow: 'quotation',
      paymentStatus: 'pending',
      notificationDays: 3,
      lateFees: 0,
      products: [
        { name: 'Professional Camera', quantity: 1, price: 'P160/day' },
        { name: 'Power Drill Set', quantity: 2, price: 'P80/day' }
      ],
      notifications: [
        { type: 'customer', message: 'Rental return reminder sent', date: '2024-01-17' },
        { type: 'admin', message: 'Pickup preparation reminder', date: '2024-01-17' }
      ]
    },
    {
      id: 'R0002',
      customerName: 'Jane Smith',
      deliveryDate: '2024-01-16',
      returnDate: '2024-01-18',
      totalAmount: 'P800',
      status: 'confirmed',
      workflow: 'confirmed',
      paymentStatus: 'partial',
      notificationDays: 2,
      lateFees: 0,
      products: [
        { name: 'Office Chair', quantity: 1, price: 'P120/day' }
      ],
      notifications: [
        { type: 'customer', message: 'Payment confirmation sent', date: '2024-01-16' }
      ]
    },
    {
      id: 'R0003',
      customerName: 'Bob Johnson',
      deliveryDate: '2024-01-14',
      returnDate: '2024-01-17',
      totalAmount: 'P1200',
      status: 'pickup',
      workflow: 'pickup',
      paymentStatus: 'paid',
      notificationDays: 2,
      lateFees: 0,
      products: [
        { name: 'Projector', quantity: 1, price: 'P200/day' }
      ],
      notifications: [
        { type: 'admin', message: 'Pickup scheduled for today', date: '2024-01-14' }
      ]
    },
    {
      id: 'R0004',
      customerName: 'Alice Brown',
      deliveryDate: '2024-01-12',
      returnDate: '2024-01-15',
      totalAmount: 'P900',
      status: 'return',
      workflow: 'return',
      paymentStatus: 'paid',
      notificationDays: 2,
      lateFees: 150,
      products: [
        { name: 'Ladder', quantity: 1, price: 'P60/day' }
      ],
      notifications: [
        { type: 'admin', message: 'Late return detected - fees applied', date: '2024-01-15' }
      ]
    },
    {
      id: 'R0005',
      customerName: 'Charlie Wilson',
      deliveryDate: '2024-01-10',
      returnDate: '2024-01-13',
      totalAmount: 'P600',
      status: 'completed',
      workflow: 'completed',
      paymentStatus: 'paid',
      notificationDays: 2,
      lateFees: 0,
      products: [
        { name: 'Sound System', quantity: 1, price: 'P100/day' }
      ],
      notifications: [
        { type: 'admin', message: 'Order completed successfully', date: '2024-01-13' }
      ]
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

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
      partial: { label: 'Partial', class: 'bg-orange-100 text-orange-800' },
      paid: { label: 'Paid', class: 'bg-green-100 text-green-800' },
      overdue: { label: 'Overdue', class: 'bg-red-100 text-red-800' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    )
  }

  const getWorkflowIcon = (workflow) => {
    const iconConfig = {
      quotation: { icon: FileText, class: 'text-yellow-600' },
      confirmed: { icon: CheckCircle, class: 'text-blue-600' },
      pickup: { icon: Truck, class: 'text-orange-600' },
      return: { icon: RotateCcw, class: 'text-red-600' },
      completed: { icon: CheckCircle, class: 'text-green-600' }
    }
    
    const config = iconConfig[workflow] || iconConfig.quotation
    const Icon = config.icon
    return <Icon className={`h-4 w-4 ${config.class}`} />
  }

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || true // All orders for now
    const matchesWorkflow = selectedWorkflow === 'all' || order.workflow === selectedWorkflow
    return matchesSearch && matchesStatus && matchesCategory && matchesWorkflow
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <div className="flex space-x-3">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="btn btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Order</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
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
            
            <select
              value={selectedWorkflow}
              onChange={(e) => setSelectedWorkflow(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Workflows</option>
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

      {/* Workflow Overview */}
      <div className="card p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-medium text-blue-800 mb-4">Rental Workflow Stages</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-blue-700">1. Quotation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-blue-700">2. Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-blue-700">3. Pickup</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-blue-700">4. Return</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-blue-700">5. Completed</span>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Orders & Workflow</h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Customer</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Workflow</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Delivery</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Return</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Amount</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Payment</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Fees</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Notif</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 text-gray-400" />
                      </div>
                      <span className="text-xs font-medium text-gray-900 truncate">{order.customerName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {getWorkflowIcon(order.workflow)}
                      <div className="text-xs">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-900">{order.deliveryDate}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-900">{order.returnDate}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs font-medium text-gray-900">{order.totalAmount}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-xs">
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {order.lateFees > 0 ? (
                      <span className="text-red-600 font-medium text-xs">₱{order.lateFees}</span>
                    ) : (
                      <span className="text-green-600 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Bell className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-900">{order.notifications.length}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <button className="text-primary-600 hover:text-primary-900 p-1 rounded transition-colors" title="View Order">
                        <Eye className="h-3 w-3" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors" title="Edit Order">
                        <Edit className="h-3 w-3" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" title="Process Payment">
                        <CreditCard className="h-3 w-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors" title="Delete Order">
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
              Showing 1 to {filteredOrders.length} of {filteredOrders.length} results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="card p-6 bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <Bell className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-800">Automated Notifications</h4>
              <p className="text-sm text-green-700 mt-1">
                System sends reminders N days before rental return date to both customers and internal users. 
                Customizable notification lead time to match business needs.
              </p>
            </div>
          </div>
        </div>

        {/* Late Fees */}
        <div className="card p-6 bg-red-50 border-red-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Late Return Handling</h4>
              <p className="text-sm text-red-700 mt-1">
                Automatic late fees calculation based on predefined rules. 
                Alerts for late returns with configurable penalties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderManagement 