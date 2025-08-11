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
import Cart from './pages/Cart'
import Delivery from './pages/Delivery'
import Payment from './pages/Payment'
import Wishlist from './pages/Wishlist'
import UserManagement from './pages/UserManagement'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import PricelistManagement from './pages/PricelistManagement'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('customer') // 'admin' or 'customer'
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [deliveryInfo, setDeliveryInfo] = useState(null)

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
    setCartItems([])
    setWishlist([])
    setDeliveryInfo(null)
  }

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateCartItem = (itemId, updatedItem) => {
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? updatedItem : item
    ))
  }

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const addToWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(id => id !== productId))
  }

  const isInWishlist = (productId) => {
    return wishlist.includes(productId)
  }

  const updateDeliveryInfo = (info) => {
    setDeliveryInfo(info)
  }

  const processPayment = (paymentData) => {
    console.log('Payment processed:', paymentData)
    setCartItems([])
    setDeliveryInfo(null)
  }

  if (!isAuthenticated) {
    if (showCreateAccount) {
      return <CreateAccount onSignUp={handleSignUp} onShowLogin={() => setShowCreateAccount(false)} />
    }
    return <Login onLogin={handleLogin} onShowCreateAccount={() => setShowCreateAccount(true)} />
  }

  return (
    <Routes>
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
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/create-account" element={<CreateAccount onSignUp={handleSignUp} />} />
            <Route path="/logout" element={<Navigate to="/" replace />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/checkout" element={<Checkout />} />
          </>
        )}

       {userRole === 'customer' && (
          <>
            <Route path="/dashboard" element={<CustomerDashboard addToCart={addToCart} addToWishlist={addToWishlist} isInWishlist={isInWishlist} cartItems={cartItems} wishlist={wishlist} />} />
            <Route path="/products" element={<ProductCatalog addToCart={addToCart} addToWishlist={addToWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} addToWishlist={addToWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} addToCart={addToCart} removeFromWishlist={removeFromWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} updateCartItem={updateCartItem} removeFromCart={removeFromCart} addToWishlist={addToWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/delivery" element={<Delivery cartItems={cartItems} updateDeliveryInfo={updateDeliveryInfo} />} />
            <Route path="/payment" element={<Payment cartItems={cartItems} deliveryInfo={deliveryInfo} processPayment={processPayment} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<CustomerOrders />} />
          </>
        )}

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
    )
}

export default App 