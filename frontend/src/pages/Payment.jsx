import React, { useState } from 'react'
import { 
  ChevronLeft,
  Package,
  ShoppingCart,
  User,
  MessageSquare,
  CreditCard,
  Lock
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Payment = ({ cartItems, deliveryInfo, processPayment }) => {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  })
  const [saveCard, setSaveCard] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock cart data if none provided
  const items = cartItems.length > 0 ? cartItems : [
    {
      id: 1,
      name: 'Professional DSLR Camera Kit',
      price: 1500,
      quantity: 1,
      fromDate: '2024-02-01',
      toDate: '2024-02-05',
      rentalDays: 4,
      totalPrice: 6000,
    },
    {
      id: 2,
      name: 'Heavy Duty Drill Machine',
      price: 800,
      quantity: 2,
      fromDate: '2024-02-01',
      toDate: '2024-02-03',
      rentalDays: 2,
      totalPrice: 3200,
    }
  ]

  // Mock delivery info if none provided
  const delivery = deliveryInfo || {
    deliveryAddress: '123 Main Street, City, State 12345',
    deliveryMethod: 'pickup',
    deliveryCharge: 0
  }

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const deliveryCharge = delivery.deliveryCharge || 0
  const taxes = subtotal * 0.18 // 18% GST
  const total = subtotal + deliveryCharge + taxes

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    handleCardInputChange('cardNumber', formatted)
  }

  const handleExpiryChange = (e, field) => {
    let value = e.target.value.replace(/\D/g, '')
    
    if (field === 'expiryMonth') {
      value = Math.min(12, Math.max(1, parseInt(value) || 0)).toString().padStart(2, '0')
    } else if (field === 'expiryYear') {
      value = value.substring(0, 2)
    }
    
    handleCardInputChange(field, value)
  }

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3)
    handleCardInputChange('cvv', value)
  }

  const validateForm = () => {
    if (paymentMethod === 'credit') {
      return (
        cardDetails.cardNumber.replace(/\s/g, '').length === 16 &&
        cardDetails.cardHolder.trim().length > 0 &&
        cardDetails.expiryMonth.length === 2 &&
        cardDetails.expiryYear.length === 2 &&
        cardDetails.cvv.length === 3
      )
    }
    return true
  }

  const handlePayNow = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const paymentData = {
        method: paymentMethod,
        cardDetails: paymentMethod === 'credit' ? cardDetails : null,
        saveCard,
        amount: total,
        items,
        deliveryInfo: delivery
      }
      
      if (processPayment) {
        processPayment(paymentData)
      }
      
      // Navigate to success page or dashboard
      alert('Payment successful! Your rental order has been confirmed.')
      navigate('/dashboard')
      
    } catch (error) {
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBackToDelivery = () => {
    navigate('/delivery')
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => (currentYear + i).toString().substring(2))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium">Back to Dashboard</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <Package className="h-5 w-5" />
                <span className="font-medium">Rental Shop</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Shopping Cart</span>
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="font-medium">Adam</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <span className="text-gray-500">Review Order</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Delivery</span>
            <span className="text-gray-400">/</span>
            <span className="text-primary-600 font-medium">Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Payment Options */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              
              {/* Payment Method Selection */}
              <div className="space-y-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">Credit Card</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit"
                    checked={paymentMethod === 'debit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">Debit Card</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">Net Banking</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-gray-700">UPI</span>
                </label>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit' && (
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center space-x-2 mb-4">
                    <CreditCard className="h-5 w-5 text-primary-600" />
                    <h3 className="text-lg font-medium text-gray-900">Credit Card Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cardHolder}
                        onChange={(e) => handleCardInputChange('cardHolder', e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiration Date
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={cardDetails.expiryMonth}
                          onChange={(e) => handleExpiryChange(e, 'expiryMonth')}
                          placeholder="MM"
                          maxLength={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <span className="text-gray-500 self-center">/</span>
                        <input
                          type="text"
                          value={cardDetails.expiryYear}
                          onChange={(e) => handleExpiryChange(e, 'expiryYear')}
                          placeholder="YY"
                          maxLength={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Security Code (CVV)
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={handleCVVChange}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Save my card details for future payments
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Other Payment Methods */}
              {paymentMethod !== 'credit' && (
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="text-center py-8">
                    <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {paymentMethod === 'debit' && 'Secure debit card payment will be processed at checkout'}
                      {paymentMethod === 'netbanking' && 'You will be redirected to your bank for secure payment'}
                      {paymentMethod === 'upi' && 'Enter your UPI ID to complete the payment'}
                    </p>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Secure Payment</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your payment information is encrypted and secure. We never store your complete card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{items.length} Items</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium">
                    {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes (18% GST)</span>
                  <span className="font-medium">₹{taxes.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={handlePayNow}
                  disabled={!validateForm() || isProcessing}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing Payment...' : 'Pay Now'}
                </button>
                
                <button
                  onClick={handleBackToDelivery}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-700 transition-colors"
                >
                  Back to Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment


