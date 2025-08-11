import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const periods = ["Last 7 days", "Last 30 days", "Last 90 days", "This Year"];

function EndUserLayout({ children }) {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 days");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Fixed Navigation Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow px-6 py-3 mb-6 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">🏠</span>
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded hover:bg-gray-100 font-medium text-gray-700"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="px-3 py-1 rounded hover:bg-gray-100 font-medium text-gray-700"
            onClick={() => navigate("/orders")}
          >
            Order
          </button>
          <button
            className="px-3 py-1 rounded hover:bg-gray-100 font-medium text-gray-700"
            onClick={() => navigate("/products")}
          >
            Products
          </button>
          <button
            className="px-3 py-1 rounded hover:bg-gray-100 font-medium text-gray-700"
            onClick={() => navigate("/reporting")}
          >
            Reporting
          </button>
          <button
            className="px-3 py-1 rounded hover:bg-gray-100 font-medium text-gray-700"
            onClick={() => navigate("/settings")}
          >
            Setting
          </button>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="border rounded px-2 py-1 text-gray-700"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {periods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center">
              👤
            </span>
            <span className="font-medium">Adam</span>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default EndUserLayout;
