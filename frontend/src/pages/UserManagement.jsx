import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2,
  User,
  Shield,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Eye,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Crown,
  Users,
  UserCheck,
  UserX
} from 'lucide-react'

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddUser, setShowAddUser] = useState(false)

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: 'John Admin',
      email: 'john.admin@rental.com',
      phone: '+1 234 567 8900',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01',
      lastLogin: '2024-01-15 09:30',
      permissions: ['dashboard', 'products', 'orders', 'users', 'reports'],
      avatar: '/admin-avatar.jpg'
    },
    {
      id: 2,
      name: 'Sarah Manager',
      email: 'sarah.manager@rental.com',
      phone: '+1 234 567 8901',
      role: 'manager',
      status: 'active',
      joinDate: '2024-01-05',
      lastLogin: '2024-01-15 14:20',
      permissions: ['dashboard', 'products', 'orders', 'reports'],
      avatar: '/manager-avatar.jpg'
    },
    {
      id: 3,
      name: 'Mike Staff',
      email: 'mike.staff@rental.com',
      phone: '+1 234 567 8902',
      role: 'staff',
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-14 16:45',
      permissions: ['products', 'orders'],
      avatar: '/staff-avatar.jpg'
    },
    {
      id: 4,
      name: 'Lisa Customer',
      email: 'lisa.customer@email.com',
      phone: '+1 234 567 8903',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-12',
      lastLogin: '2024-01-15 11:15',
      permissions: ['products', 'orders'],
      avatar: '/customer-avatar.jpg'
    },
    {
      id: 5,
      name: 'David Support',
      email: 'david.support@rental.com',
      phone: '+1 234 567 8904',
      role: 'support',
      status: 'inactive',
      joinDate: '2024-01-08',
      lastLogin: '2024-01-10 10:30',
      permissions: ['dashboard', 'orders'],
      avatar: '/support-avatar.jpg'
    }
  ]

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { label: 'Admin', class: 'bg-red-100 text-red-800', icon: Crown },
      manager: { label: 'Manager', class: 'bg-purple-100 text-purple-800', icon: Shield },
      staff: { label: 'Staff', class: 'bg-blue-100 text-blue-800', icon: Users },
      customer: { label: 'Customer', class: 'bg-green-100 text-green-800', icon: User },
      support: { label: 'Support', class: 'bg-orange-100 text-orange-800', icon: UserCheck }
    }
    
    const config = roleConfig[role] || roleConfig.customer
    const Icon = config.icon
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${config.class}`}>
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    )
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Active', class: 'bg-green-100 text-green-800', icon: CheckCircle },
      inactive: { label: 'Inactive', class: 'bg-gray-100 text-gray-800', icon: XCircle },
      suspended: { label: 'Suspended', class: 'bg-red-100 text-red-800', icon: UserX }
    }
    
    const config = statusConfig[status] || statusConfig.active
    const Icon = config.icon
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${config.class}`}>
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    )
  }

  const getPermissionIcons = (permissions) => {
    const permissionIcons = {
      dashboard: { icon: Shield, color: 'text-blue-600' },
      products: { icon: User, color: 'text-green-600' },
      orders: { icon: Mail, color: 'text-purple-600' },
      users: { icon: Users, color: 'text-red-600' },
      reports: { icon: Calendar, color: 'text-orange-600' }
    }
    
    return permissions.map(permission => {
      const config = permissionIcons[permission]
      if (config) {
        const Icon = config.icon
        return <Icon key={permission} className={`h-4 w-4 ${config.color}`} title={permission} />
      }
      return null
    })
  }

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>
        <button 
          onClick={() => setShowAddUser(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-xl font-bold text-gray-900">{mockUsers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-xl font-bold text-gray-900">{mockUsers.filter(u => u.status === 'active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Crown className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-xl font-bold text-gray-900">{mockUsers.filter(u => u.role === 'admin').length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Managers</p>
              <p className="text-xl font-bold text-gray-900">{mockUsers.filter(u => u.role === 'manager').length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <User className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Customers</p>
              <p className="text-xl font-bold text-gray-900">{mockUsers.filter(u => u.role === 'customer').length}</p>
            </div>
          </div>
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
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
              <option value="support">Support</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            
            <button className="btn btn-secondary flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Users & Permissions</h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">User</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Role</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Contact</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Join Date</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Last Login</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Permissions</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-xs">
                      {getRoleBadge(user.role)}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-xs">
                      {getStatusBadge(user.status)}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2 text-xs">
                        <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-900 truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-900 truncate">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs">{user.joinDate}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-600">{user.lastLogin}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {getPermissionIcons(user.permissions)}
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <button className="text-primary-600 hover:text-primary-900 p-1 rounded transition-colors" title="View User">
                        <Eye className="h-3 w-3" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors" title="Edit User">
                        <Edit className="h-3 w-3" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" title="Lock/Unlock">
                        <Lock className="h-3 w-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded transition-colors" title="Delete User">
                        <Trash2 className="h-3 w-3" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors" title="More Options">
                        <MoreVertical className="h-3 w-3" />
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
              Showing 1 to {filteredUsers.length} of {filteredUsers.length} results
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

      {/* Role Information */}
      <div className="card p-6 bg-blue-50 border-blue-200">
        <h4 className="text-lg font-medium text-blue-800 mb-4">Role Hierarchy & Permissions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Crown className="h-6 w-6 text-red-600" />
            </div>
            <h5 className="font-medium text-blue-800">Admin</h5>
            <p className="text-sm text-blue-700">Full system access</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h5 className="font-medium text-blue-800">Manager</h5>
            <p className="text-sm text-blue-700">Operations management</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h5 className="font-medium text-blue-800">Staff</h5>
            <p className="text-sm text-blue-700">Daily operations</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <h5 className="font-medium text-blue-800">Customer</h5>
            <p className="text-sm text-blue-700">Product access</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <UserCheck className="h-6 w-6 text-orange-600" />
            </div>
            <h5 className="font-medium text-blue-800">Support</h5>
            <p className="text-sm text-blue-700">Customer assistance</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagement 