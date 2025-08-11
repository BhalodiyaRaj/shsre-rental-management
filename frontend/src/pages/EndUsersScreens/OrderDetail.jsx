import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EndUserLayout from "../../components/EndUserLayout";

const mockOrder = {
  id: "R0001",
  customer: "Customer1",
  status: "Quotation",
  address: "123 Main St",
  createdBy: "Adam",
  date: "2024-06-01",
  products: [
    { name: "Product 1", qty: 2, price: 500 },
    { name: "Product 2", qty: 1, price: 1000 },
  ],
  total: 2000,
};

const statusColors = {
  Quotation: "bg-blue-200 text-blue-800",
  Reserved: "bg-yellow-200 text-yellow-800",
  Pickedup: "bg-green-200 text-green-800",
  Returned: "bg-purple-200 text-purple-800",
};

function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = mockOrder; // In real app, fetch by id

  return (
    <EndUserLayout>
      {/* Order Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-lg font-bold">{order.id}</div>
            <div className="text-gray-500">Customer: {order.customer}</div>
            <div className="text-gray-500">Address: {order.address}</div>
            <div className="text-gray-500">Created by: {order.createdBy}</div>
            <div className="text-gray-500">Date: {order.date}</div>
          </div>
          <span
            className={`px-3 py-1 rounded text-sm font-semibold ${
              statusColors[order.status]
            }`}
          >
            {order.status}
          </span>
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
            {order.products.map((prod, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-1">{prod.name}</td>
                <td className="py-1">{prod.qty}</td>
                <td className="py-1">₹ {prod.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right font-bold">Total: ₹ {order.total}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/orders")}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate(`/delivery/${order.id}`)}
          className="bg-yellow-300 px-4 py-2 rounded"
        >
          Delivery
        </button>
        <button
          onClick={() => navigate(`/pickup/${order.id}`)}
          className="bg-green-300 px-4 py-2 rounded"
        >
          Pickup
        </button>
        <button
          onClick={() => navigate(`/return/${order.id}`)}
          className="bg-purple-300 px-4 py-2 rounded"
        >
          Return
        </button>
      </div>
    </EndUserLayout>
  );
}

export default OrderDetail;
