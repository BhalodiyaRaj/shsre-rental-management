import React, { useState } from 'react'
import { Package, Plus, Minus, Calendar, ShoppingCart } from 'lucide-react'

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const product = {
    id: 1,
    name: 'Professional Camera',
    price: 'P160',
    description: 'High-quality professional camera for events and photography. Features include 4K video recording, interchangeable lenses, and advanced autofocus system.',
    image: null
  }

  const handleQuantityChange = (change) => {
    const newQty = Math.max(1, quantity + change)
    setQuantity(newQty)
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', product, quantity)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 rounded-lg object-cover"
            />
          ) : (
            <Package className="h-32 w-32 text-gray-400" />
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-primary-600">{product.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="input pl-10"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full btn btn-primary flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 