import React, { useState } from 'react'
import { 
  Settings as SettingsIcon,
  Bell,
  DollarSign,
  Shield,
  Globe,
  Database,
  Palette,
  Clock,
  Mail,
  Smartphone,
  CreditCard,
  FileText,
  Save,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'Rental Management System',
    businessEmail: 'admin@rental.com',
    businessPhone: '+1 234 567 8900',
    timezone: 'UTC-5',
    currency: 'PHP',
    language: 'English',
    
    // Notification Settings
    customerReminderDays: 3,
    adminReminderDays: 2,
    emailNotifications: true,
    smsNotifications: false,
    portalNotifications: true,
    
    // Business Settings
    lateFeePerDay: 50,
    maxRentalDays: 30,
    requireDeposit: true,
    depositPercentage: 20,
    autoApproveOrders: false,
    
    // Payment Settings
    paymentGateway: 'stripe',
    stripePublicKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    paypalClientId: 'client_id_...',
    paypalSecret: 'secret_...',
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    logRetentionDays: 90,
    backupFrequency: 'daily',
    maxFileSize: 5
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings)
    // Show success message
  }

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'business', label: 'Business', icon: DollarSign },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'system', label: 'System', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => handleSettingChange('companyName', e.target.value)}
            className="input"
            placeholder="Enter company name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
          <input
            type="email"
            value={settings.businessEmail}
            onChange={(e) => handleSettingChange('businessEmail', e.target.value)}
            className="input"
            placeholder="Enter business email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone</label>
          <input
            type="tel"
            value={settings.businessPhone}
            onChange={(e) => handleSettingChange('businessPhone', e.target.value)}
            className="input"
            placeholder="Enter business phone"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className="input"
          >
            <option value="UTC-8">UTC-8 (PST)</option>
            <option value="UTC-5">UTC-5 (EST)</option>
            <option value="UTC+0">UTC+0 (GMT)</option>
            <option value="UTC+1">UTC+1 (CET)</option>
            <option value="UTC+5:30">UTC+5:30 (IST)</option>
            <option value="UTC+8">UTC+8 (CST)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={settings.currency}
            onChange={(e) => handleSettingChange('currency', e.target.value)}
            className="input"
          >
            <option value="PHP">Philippine Peso (₱)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
            <option value="INR">Indian Rupee (₹)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="input"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Reminder Days</label>
          <input
            type="number"
            value={settings.customerReminderDays}
            onChange={(e) => handleSettingChange('customerReminderDays', parseInt(e.target.value))}
            className="input"
            min="1"
            max="7"
          />
          <p className="text-sm text-gray-500 mt-1">Days before return date to send customer reminders</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Reminder Days</label>
          <input
            type="number"
            value={settings.adminReminderDays}
            onChange={(e) => handleSettingChange('adminReminderDays', parseInt(e.target.value))}
            className="input"
            min="1"
            max="7"
          />
          <p className="text-sm text-gray-500 mt-1">Days before return date to send admin reminders</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Notification Channels</h4>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Email Notifications</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <Smartphone className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.portalNotifications}
              onChange={(e) => handleSettingChange('portalNotifications', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Portal Notifications</span>
          </label>
        </div>
      </div>
    </div>
  )

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Late Fee Per Day</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
            <input
              type="number"
              value={settings.lateFeePerDay}
              onChange={(e) => handleSettingChange('lateFeePerDay', parseInt(e.target.value))}
              className="input pl-8"
              min="0"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Daily late fee for overdue rentals</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Rental Days</label>
          <input
            type="number"
            value={settings.maxRentalDays}
            onChange={(e) => handleSettingChange('maxRentalDays', parseInt(e.target.value))}
            className="input"
            min="1"
            max="365"
          />
          <p className="text-sm text-gray-500 mt-1">Maximum allowed rental duration</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Percentage</label>
          <div className="relative">
            <input
              type="number"
              value={settings.depositPercentage}
              onChange={(e) => handleSettingChange('depositPercentage', parseInt(e.target.value))}
              className="input pr-8"
              min="0"
              max="100"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Required deposit percentage</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Business Rules</h4>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.requireDeposit}
              onChange={(e) => handleSettingChange('requireDeposit', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Require Security Deposit</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.autoApproveOrders}
              onChange={(e) => handleSettingChange('autoApproveOrders', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Auto-approve Orders</span>
          </label>
        </div>
      </div>
    </div>
  )

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Gateway</label>
        <select
          value={settings.paymentGateway}
          onChange={(e) => handleSettingChange('paymentGateway', e.target.value)}
          className="input"
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="razorpay">Razorpay</option>
          <option value="square">Square</option>
        </select>
      </div>
      
      {settings.paymentGateway === 'stripe' && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">Stripe Configuration</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Public Key</label>
            <input
              type="text"
              value={settings.stripePublicKey}
              onChange={(e) => handleSettingChange('stripePublicKey', e.target.value)}
              className="input"
              placeholder="pk_test_..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.stripeSecretKey}
                onChange={(e) => handleSettingChange('stripeSecretKey', e.target.value)}
                className="input pr-10"
                placeholder="sk_test_..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {settings.paymentGateway === 'paypal' && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">PayPal Configuration</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
            <input
              type="text"
              value={settings.paypalClientId}
              onChange={(e) => handleSettingChange('paypalClientId', e.target.value)}
              className="input"
              placeholder="client_id_..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secret</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={settings.paypalSecret}
                onChange={(e) => handleSettingChange('paypalSecret', e.target.value)}
                className="input pr-10"
                placeholder="secret_..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Log Retention (Days)</label>
          <input
            type="number"
            value={settings.logRetentionDays}
            onChange={(e) => handleSettingChange('logRetentionDays', parseInt(e.target.value))}
            className="input"
            min="30"
            max="365"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
          <select
            value={settings.backupFrequency}
            onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
            className="input"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
          <input
            type="number"
            value={settings.maxFileSize}
            onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
            className="input"
            min="1"
            max="50"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">System Options</h4>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.debugMode}
              onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Debug Mode</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Data Management</h4>
        
        <div className="flex space-x-3">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
          <button className="btn btn-secondary flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import Data</span>
          </button>
          <button className="btn btn-secondary flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Clear Cache</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <select className="input">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-gray-300"></div>
            <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer border-2 border-gray-300"></div>
            <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer border-2 border-gray-300"></div>
            <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer border-2 border-gray-300"></div>
            <div className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer border-2 border-gray-300"></div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar Position</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="sidebar" value="left" defaultChecked className="text-primary-600" />
            <span className="text-sm text-gray-700">Left</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="sidebar" value="right" className="text-primary-600" />
            <span className="text-sm text-gray-700">Right</span>
          </label>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'business':
        return renderBusinessSettings()
      case 'payment':
        return renderPaymentSettings()
      case 'system':
        return renderSystemSettings()
      case 'appearance':
        return renderAppearanceSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and business rules</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-secondary flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Reset to Default</span>
          </button>
          <button onClick={handleSave} className="btn btn-primary flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Save Status */}
      <div className="card p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <h4 className="text-sm font-medium text-green-800">Settings Saved</h4>
            <p className="text-sm text-green-700">Your changes have been saved successfully.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 