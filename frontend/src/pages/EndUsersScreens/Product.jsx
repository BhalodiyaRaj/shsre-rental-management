import React from "react";
import EndUserLayout from "../../components/EndUserLayout";

function Product() {
  return (
    <EndUserLayout>
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="bg-pink-200 text-black px-4 py-2 rounded font-semibold">
            Create
          </button>
          <span className="font-semibold text-lg ml-2">Product</span>
          <span className="ml-2">⚙️</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">1/80</span>
          <button className="w-8 h-8 flex items-center justify-center border rounded">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center border rounded">
            &gt;
          </button>
        </div>
      </div>
      <div className="mb-4">
        <button className="bg-red-200 text-black px-4 py-2 rounded font-semibold">
          Update stock
        </button>
      </div>
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow p-6 flex gap-8 min-h-[300px]">
        {/* General Product Info */}
        <div className="flex-1 border-r pr-8">
          <div className="text-gray-700 font-semibold mb-2">
            General Product info
          </div>
          {/* Add more product info here as needed */}
        </div>
        {/* Rental Pricing */}
        <div className="flex-1 pl-8">
          <div className="text-gray-700 font-semibold mb-2">Rental Pricing</div>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="text-left font-medium">Rental Period</th>
                <th className="text-left font-medium">Pricelist</th>
                <th className="text-left font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>--------------------</td>
                <td>--------------------</td>
                <td>--------------------</td>
              </tr>
              <tr>
                <td>--------------------</td>
                <td>--------------------</td>
                <td>--------------------</td>
              </tr>
            </tbody>
          </table>
          <div className="font-semibold mb-1">Rental Reservations charges</div>
          <div className="flex flex-col gap-1">
            <div>
              Extra Hour : <span className="ml-4">---------------- Rs</span>
            </div>
            <div>
              Extra Days : <span className="ml-4">---------------- Rs</span>
            </div>
            <div>
              Extra Hour : <span className="ml-4">---------------- Rs</span>
            </div>
          </div>
        </div>
      </div>
    </EndUserLayout>
  );
}

export default Product;
