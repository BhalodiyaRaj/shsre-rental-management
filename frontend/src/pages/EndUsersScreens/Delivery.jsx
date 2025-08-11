import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EndUserLayout from "../../components/EndUserLayout";

const mockDelivery = {
  id: "R0001",
  address: "123 Main St",
  products: [
    { name: "Product 1", qty: 2, price: 500 },
    { name: "Product 2", qty: 1, price: 1000 },
  ],
};

function Delivery() {
  const navigate = useNavigate();
  const { id } = useParams();
  const delivery = mockDelivery; // In real app, fetch by id

  return (
    <EndUserLayout>
      {/* Delivery Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="text-lg font-bold mb-2">Order: {delivery.id}</div>
        <div className="text-gray-500 mb-2">
          Delivery Address: {delivery.address}
        </div>
        <table className="w-full text-left mb-4">
          <thead>
            <tr className="border-b">
              <th className="py-1">Product</th>
              <th className="py-1">Qty</th>
              <th className="py-1">Price</th>
            </tr>
          </thead>
          <tbody>
            {delivery.products.map((prod, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-1">{prod.name}</td>
                <td className="py-1">{prod.qty}</td>
                <td className="py-1">₹ {prod.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/orders/${delivery.id}`)}
          className="bg-blue-200 px-4 py-2 rounded"
        >
          Order Detail
        </button>
      </div>
    </EndUserLayout>
  );
}

export default Delivery;
