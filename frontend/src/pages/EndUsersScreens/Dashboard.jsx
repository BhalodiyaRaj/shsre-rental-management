import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EndUserLayout from "../../components/EndUserLayout";

const periods = ["Last 7 days", "Last 30 days", "Last 90 days", "This Year"];

const mockData = {
  "Last 7 days": {
    quotations: 4,
    rentals: 8,
    revenue: 2500,
    topCategories: [{ category: "Rental - Service", ordered: 8, revenue: 950 }],
    topProducts: [
      { product: "Wheelchairs", ordered: 4, revenue: 1200 },
      { product: "Tables", ordered: 2, revenue: 800 },
      { product: "Chairs", ordered: 2, revenue: 500 },
    ],
    topCustomers: [
      { customer: "Customer1", ordered: 4, revenue: 1200 },
      { customer: "Customer2", ordered: 2, revenue: 800 },
      { customer: "Customer3", ordered: 2, revenue: 500 },
    ],
  },
  "Last 30 days": {
    quotations: 10,
    rentals: 26,
    revenue: 10599,
    topCategories: [
      { category: "Rental - Service", ordered: 25, revenue: 2940 },
    ],
    topProducts: [
      { product: "Wheelchairs", ordered: 10, revenue: 3032 },
      { product: "Tables", ordered: 5, revenue: 1009 },
      { product: "Chairs", ordered: 4, revenue: 3008 },
    ],
    topCustomers: [
      { customer: "Customer1", ordered: 10, revenue: 3032 },
      { customer: "Customer2", ordered: 5, revenue: 1009 },
      { customer: "Customer3", ordered: 4, revenue: 3008 },
    ],
  },
  "Last 90 days": {
    quotations: 20,
    rentals: 60,
    revenue: 25000,
    topCategories: [
      { category: "Rental - Service", ordered: 60, revenue: 9000 },
    ],
    topProducts: [
      { product: "Wheelchairs", ordered: 20, revenue: 7000 },
      { product: "Tables", ordered: 15, revenue: 4000 },
      { product: "Chairs", ordered: 10, revenue: 3000 },
    ],
    topCustomers: [
      { customer: "Customer1", ordered: 20, revenue: 7000 },
      { customer: "Customer2", ordered: 15, revenue: 4000 },
      { customer: "Customer3", ordered: 10, revenue: 3000 },
    ],
  },
  "This Year": {
    quotations: 50,
    rentals: 120,
    revenue: 60000,
    topCategories: [
      { category: "Rental - Service", ordered: 120, revenue: 25000 },
    ],
    topProducts: [
      { product: "Wheelchairs", ordered: 40, revenue: 12000 },
      { product: "Tables", ordered: 30, revenue: 8000 },
      { product: "Chairs", ordered: 20, revenue: 6000 },
    ],
    topCustomers: [
      { customer: "Customer1", ordered: 40, revenue: 12000 },
      { customer: "Customer2", ordered: 30, revenue: 8000 },
      { customer: "Customer3", ordered: 20, revenue: 6000 },
    ],
  },
};

function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
  const data = mockData[selectedPeriod];
  const navigate = useNavigate();

  return (
    <EndUserLayout>
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/3 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Quotations</span>
          <span className="text-2xl font-bold">{data.quotations}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Rentals</span>
          <span className="text-2xl font-bold">{data.rentals}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <span className="text-gray-500">Revenue</span>
          <span className="text-2xl font-bold">{data.revenue}</span>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Product Categories */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Top Product Categories</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-1">Category</th>
                <th className="py-1">Ordered</th>
                <th className="py-1">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.topCategories.map((cat, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-1">{cat.category}</td>
                  <td className="py-1">{cat.ordered}</td>
                  <td className="py-1">{cat.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Top Products</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-1">Product</th>
                <th className="py-1">Ordered</th>
                <th className="py-1">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.topProducts.map((prod, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-1">{prod.product}</td>
                  <td className="py-1">{prod.ordered}</td>
                  <td className="py-1">{prod.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Top Customers */}
        <div className="bg-white rounded-lg shadow p-4 col-span-2 mt-6">
          <h3 className="font-semibold mb-2">Top Customer</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-1">Customer</th>
                <th className="py-1">Ordered</th>
                <th className="py-1">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.topCustomers.map((cust, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-1">{cust.customer}</td>
                  <td className="py-1">{cust.ordered}</td>
                  <td className="py-1">{cust.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </EndUserLayout>
  );
}

export default Dashboard;
