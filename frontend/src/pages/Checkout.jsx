import React, { useState } from 'react'
import { Package, Heart, Trash2, Plus, Minus, MapPin, CreditCard } from 'lucide-react'

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNo: ''
  })

  const mockCartItems = [
    { id: 1, name: 'Professional Camera', price: 'P160', quantity: 1, image: null },
    { id: 2, name: 'Power Drill Set', price: 'P80', quantity: 2, image: null }
  ]

  const deliveryCharge = 1000
  const subtotal = mockCartItems.reduce((sum, item) => sum + (parseInt(item.price.replace('P', '')) * item.quantity), 0)
  const taxes = subtotal * 0.1
  const total = subtotal + deliveryCharge + taxes

  const nextStep = () => currentStep < 3 && setCurrentStep(currentStep + 1)
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600">Complete your rental order</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 3 && (
              <div className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-primary-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Review Order */}
          {currentStep === 1 && (
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Overview</h3>
              <div className="space-y-4">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-lg font-bold text-primary-600">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Delivery Address */}
          {currentStep === 2 && (
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      value={deliveryAddress.address}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, address: e.target.value }))}
                      rows={3}
                      className="input pl-10"
                      placeholder="Enter your delivery address"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                    className="input"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={deliveryAddress.state}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="input"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={deliveryAddress.zipCode}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="input"
                    placeholder="ZIP Code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={deliveryAddress.country}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, country: e.target.value }))}
                    className="input"
                    placeholder="Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={deliveryAddress.phoneNo}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, phoneNo: e.target.value }))}
                    className="input"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirm Order */}
          {currentStep === 3 && (
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Order</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Order ID: R0001</p>
                    <p>Delivery Date: To be scheduled</p>
                    <p>Return Date: To be scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button onClick={prevStep} className="btn btn-secondary">
                Back to Cart
              </button>
            )}
            
            {currentStep < 3 ? (
              <button onClick={nextStep} className="btn btn-primary ml-auto">
                Proceed to checkout
              </button>
            ) : (
              <button className="btn btn-primary ml-auto flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>Pay Now</span>
              </button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="font-medium">P{deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sub Total</span>
                <span className="font-medium">P{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">P{taxes}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>P{total}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button className="w-full btn btn-secondary">Apply Coupon</button>
              {currentStep === 1 && (
                <button onClick={nextStep} className="w-full btn btn-primary">
                  Proceed to checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout 