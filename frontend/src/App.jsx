import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import Layout from './components/Layout'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import CustomerOrders from './pages/CustomerOrders'
import ProductManagement from './pages/ProductManagement'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetail from './pages/ProductDetail'
import QuotationManagement from './pages/QuotationManagement'
import OrderManagement from './pages/OrderManagement'
import OrderDetail from './pages/OrderDetail'
import PickupManagement from './pages/PickupManagement'
import ReturnManagement from './pages/ReturnManagement'
import Checkout from './pages/Checkout'
import UserManagement from './pages/UserManagement'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import PricelistManagement from './pages/PricelistManagement'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('customer') // 'admin' or 'customer'
  const [showCreateAccount, setShowCreateAccount] = useState(false)

  const handleLogin = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleSignUp = (userData) => {
    // In a real app, you would create the user account here
    console.log('Creating account for:', userData)
    // For now, just log in the user
    setIsAuthenticated(true)
    setUserRole(userData.role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole('customer')
  }

  if (!isAuthenticated) {
    if (showCreateAccount) {
      return <CreateAccount onSignUp={handleSignUp} onShowLogin={() => setShowCreateAccount(false)} />
    }
    return <Login onLogin={handleLogin} onShowCreateAccount={() => setShowCreateAccount(true)} />
  }

  return (
    // <Layout userRole={userRole} onLogout={handleLogout}>
      <Routes>
        {/* Admin Routes */}
        {userRole === 'admin' && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/quotations" element={<QuotationManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/pricelist" element={<PricelistManagement />} />
            <Route path="/pickup" element={<PickupManagement />} />
            <Route path="/return" element={<ReturnManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </>
        )}

        {/* Customer Routes */}
        {userRole === 'customer' && (
          <>
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<CustomerOrders />} />
          </>
        )}

        {/* Default redirect */}
        <Route 
          path="/" 
          element={
            <Navigate 
              to={userRole === 'admin' ? '/dashboard' : '/dashboard'} 
              replace 
            />
          } 
        />
      </Routes>
    // </Layout>
  )
}

export default App 