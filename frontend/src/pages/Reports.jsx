import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign,
  Calendar,
  Download,
  Eye,
  FileText,
  FileSpreadsheet,
  FileDown,
  AlertTriangle
} from 'lucide-react'

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedReportType, setSelectedReportType] = useState('all')

  // Mock analytics data
  const analyticsData = {
    totalRevenue: 'P45,600',
    totalOrders: 156,
    totalCustomers: 89,
    totalProducts: 45,
    monthlyGrowth: '+12.5%',
    topProducts: [
      { name: 'Professional Camera', rentals: 23, revenue: 'P8,400' },
      { name: 'Power Drill Set', rentals: 19, revenue: 'P3,800' },
      { name: 'Office Chair', rentals: 17, revenue: 'P2,040' },
      { name: 'Projector', rentals: 15, revenue: 'P4,500' },
      { name: 'Sound System', rentals: 12, revenue: 'P2,400' }
    ],
    topCustomers: [
      { name: 'John Doe', orders: 8, totalSpent: 'P6,800' },
      { name: 'Jane Smith', orders: 6, totalSpent: 'P4,200' },
      { name: 'Bob Johnson', orders: 5, totalSpent: 'P3,600' },
      { name: 'Alice Brown', orders: 4, totalSpent: 'P2,800' },
      { name: 'Charlie Wilson', orders: 4, totalSpent: 'P2,400' }
    ],
    lateReturns: [
      { orderId: 'R0004', customer: 'Alice Brown', daysLate: 2, fees: 'P150' },
      { orderId: 'R0007', customer: 'David Lee', daysLate: 1, fees: 'P80' }
    ],
    revenueByMonth: [
      { month: 'Jan', revenue: 15600 },
      { month: 'Feb', revenue: 18900 },
      { month: 'Mar', revenue: 22100 },
      { month: 'Apr', revenue: 19800 },
      { month: 'May', revenue: 23400 },
      { month: 'Jun', revenue: 25600 }
    ]
  }

  const reportTypes = [
    { id: 'revenue', name: 'Revenue Reports', icon: DollarSign, description: 'Financial performance and revenue analysis' },
    { id: 'orders', name: 'Order Reports', icon: FileText, description: 'Order tracking and workflow analysis' },
    { id: 'products', name: 'Product Reports', icon: Package, description: 'Product performance and availability' },
    { id: 'customers', name: 'Customer Reports', icon: Users, description: 'Customer behavior and loyalty analysis' },
    { id: 'pickup', name: 'Pickup/Return Reports', icon: Calendar, description: 'Delivery and return performance' },
    { id: 'notifications', name: 'Notification Reports', icon: AlertTriangle, description: 'Communication and reminder tracking' }
  ]

  const exportFormats = [
    { format: 'PDF', icon: FileText, color: 'text-red-600' },
    { format: 'XLSX', icon: FileSpreadsheet, color: 'text-green-600' },
    { format: 'CSV', icon: FileDown, color: 'text-blue-600' }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          
          <button className="btn btn-primary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalRevenue}</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                {analyticsData.monthlyGrowth}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalOrders}</p>
              <p className="text-sm text-blue-600">Active rentals</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCustomers}</p>
              <p className="text-sm text-purple-600">Unique customers</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.totalProducts}</p>
              <p className="text-sm text-orange-600">Available for rent</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded">Monthly</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Weekly</button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Daily</button>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {analyticsData.revenueByMonth.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary-500 rounded-t"
                style={{ height: `${(data.revenue / 30000) * 200}px` }}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{data.month}</span>
              <span className="text-xs text-gray-500">P{Math.round(data.revenue/1000)}k</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Most Rented Products</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.rentals} rentals</p>
                  </div>
                </div>
                <span className="font-medium text-primary-600">{product.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top Customers</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {analyticsData.topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-green-700">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.orders} orders</p>
                  </div>
                </div>
                <span className="font-medium text-green-600">{customer.totalSpent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Late Returns Alert */}
      {analyticsData.lateReturns.length > 0 && (
        <div className="card p-6 bg-red-50 border-red-200">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h3 className="text-lg font-medium text-red-800">Late Returns Alert</h3>
          </div>
          <div className="space-y-3">
            {analyticsData.lateReturns.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">{item.orderId} - {item.customer}</p>
                  <p className="text-sm text-red-600">{item.daysLate} days late</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-800">Late Fees: {item.fees}</p>
                  <button className="text-sm text-red-600 hover:text-red-800">Process Return</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Types */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon
            return (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-sm transition-all">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  {exportFormats.map((format) => {
                    const FormatIcon = format.icon
                    return (
                      <button
                        key={format.format}
                        className={`p-2 rounded-lg border border-gray-200 hover:border-gray-300 ${format.color}`}
                        title={`Export as ${format.format}`}
                      >
                        <FormatIcon className="h-4 w-4" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export All Data</span>
          </button>
          <button className="btn btn-secondary flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule Report</span>
          </button>
          <button className="btn btn-success flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Custom Analytics</span>
          </button>
          <button className="btn btn-info flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>View Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports 