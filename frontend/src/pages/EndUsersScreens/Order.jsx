import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EndUserLayout from "../../components/EndUserLayout";

const rentalStatusList = [
  { label: "ALL", value: "all" },
  { label: "Quotation", value: "quotation" },
  { label: "Reserved", value: "reserved" },
  { label: "Pickedup", value: "pickedup" },
  { label: "Returned", value: "returned" },
];
const invoiceStatusList = [
  { label: "Fully Invoiced", value: "fully_invoiced" },
  { label: "Nothing to invoice", value: "nothing_to_invoice" },
  { label: "To invoice", value: "to_invoice" },
];

const rentalStatusColors = {
  quotation: "bg-blue-200 text-blue-800",
  reserved: "bg-yellow-200 text-yellow-800",
  pickedup: "bg-green-200 text-green-800",
  returned: "bg-purple-200 text-purple-800",
};
const invoiceStatusColors = {
  fully_invoiced: "bg-green-200 text-green-800",
  nothing_to_invoice: "bg-gray-200 text-gray-800",
  to_invoice: "bg-orange-200 text-orange-800",
};

const mockOrders = [
  {
    id: "R0001",
    customer: "Customer1",
    createdBy: "Adam",
    status: "quotation",
    invoiceStatus: "nothing_to_invoice",
    total: 2000,
    items: [
      {
        customer: "Customer2",
        amount: 2000,
        status: "quotation",
        invoiceStatus: "nothing_to_invoice",
        id: "R0001",
      },
      {
        customer: "Customer3",
        amount: 1000,
        status: "reserved",
        invoiceStatus: "to_invoice",
        id: "R0002",
      },
      {
        customer: "Customer4",
        amount: 3000,
        status: "pickedup",
        invoiceStatus: "fully_invoiced",
        id: "R0003",
      },
      {
        customer: "Customer5",
        amount: 1400,
        status: "returned",
        invoiceStatus: "fully_invoiced",
        id: "R0004",
      },
    ],
  },
  {
    id: "R0002",
    customer: "Customer2",
    createdBy: "Adam",
    status: "pickedup",
    invoiceStatus: "fully_invoiced",
    total: 1000,
    items: [
      {
        customer: "Customer1",
        amount: 2000,
        status: "quotation",
        invoiceStatus: "nothing_to_invoice",
        id: "R0001",
      },
      {
        customer: "Customer2",
        amount: 1000,
        status: "pickedup",
        invoiceStatus: "fully_invoiced",
        id: "R0002",
      },
    ],
  },
  {
    id: "R0003",
    customer: "Customer3",
    createdBy: "Adam",
    status: "reserved",
    invoiceStatus: "to_invoice",
    total: 2000,
    items: [
      {
        customer: "Customer3",
        amount: 2000,
        status: "reserved",
        invoiceStatus: "to_invoice",
        id: "R0003",
      },
    ],
  },
  {
    id: "R0004",
    customer: "Customer4",
    createdBy: "Adam",
    status: "returned",
    invoiceStatus: "fully_invoiced",
    total: 1400,
    items: [
      {
        customer: "Customer4",
        amount: 1400,
        status: "returned",
        invoiceStatus: "fully_invoiced",
        id: "R0004",
      },
    ],
  },
  {
    id: "R0005",
    customer: "Customer5",
    createdBy: "Adam",
    status: "quotation",
    invoiceStatus: "nothing_to_invoice",
    total: 2000,
    items: [
      {
        customer: "Customer5",
        amount: 2000,
        status: "quotation",
        invoiceStatus: "nothing_to_invoice",
        id: "R0005",
      },
    ],
  },
  {
    id: "R0006",
    customer: "Customer6",
    createdBy: "Adam",
    status: "reserved",
    invoiceStatus: "to_invoice",
    total: 2000,
    items: [
      {
        customer: "Customer6",
        amount: 2000,
        status: "reserved",
        invoiceStatus: "to_invoice",
        id: "R0006",
      },
    ],
  },
];

function Order() {
  const [view, setView] = useState("card");
  const [selectedRentalStatus, setSelectedRentalStatus] = useState("all");
  const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Flatten all items for list view
  const allItems = mockOrders.flatMap((order) => order.items);

  // Filter logic
  const filteredItems = allItems.filter((item) => {
    const matchRental =
      selectedRentalStatus === "all" || item.status === selectedRentalStatus;
    const matchInvoice =
      !selectedInvoiceStatus || item.invoiceStatus === selectedInvoiceStatus;
    const matchSearch =
      !search ||
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    return matchRental && matchInvoice && matchSearch;
  });

  // Sidebar counts
  const rentalCounts = rentalStatusList.map((s) => ({
    ...s,
    count: allItems.filter((i) =>
      s.value === "all" ? true : i.status === s.value
    ).length,
  }));
  const invoiceCounts = invoiceStatusList.map((s) => ({
    ...s,
    count: allItems.filter((i) => i.invoiceStatus === s.value).length,
  }));

  console.log("this order page called");

  return (
    <EndUserLayout>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow p-4 w-56 flex-shrink-0">
          <div className="mb-4">
            <div className="font-semibold mb-2">RENTAL STATUS</div>
            {rentalCounts.map((s) => (
              <div
                key={s.value}
                className="flex items-center justify-between mb-1"
              >
                <button
                  className={`text-left w-full px-2 py-1 rounded ${
                    selectedRentalStatus === s.value
                      ? "bg-gray-200 font-bold"
                      : ""
                  }`}
                  onClick={() => setSelectedRentalStatus(s.value)}
                >
                  {s.label}
                </button>
                <span className="text-xs text-gray-500">{s.count}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="font-semibold mb-2">INVOICE STATUS</div>
            {invoiceCounts.map((s) => (
              <div
                key={s.value}
                className="flex items-center justify-between mb-1"
              >
                <button
                  className={`text-left w-full px-2 py-1 rounded ${
                    selectedInvoiceStatus === s.value
                      ? "bg-gray-200 font-bold"
                      : ""
                  }`}
                  onClick={() => setSelectedInvoiceStatus(s.value)}
                >
                  {s.label}
                </button>
                <span className="text-xs text-gray-500">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center mb-4 gap-2">
            <button className="bg-purple-500 text-white px-4 py-2 rounded font-semibold mr-2">
              Create
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring w-1/3"
            />
          </div>

          {/* Card View */}
          {view === "card" && (
            <div className="grid grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(`/orders/${item.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{item.customer}</span>
                    <span className="font-bold">₹ {item.amount}</span>
                  </div>
                  <div className="text-xs text-gray-500">{item.id}</div>
                  <div className="flex gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        rentalStatusColors[item.status]
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        invoiceStatusColors[item.invoiceStatus]
                      }`}
                    >
                      {
                        invoiceStatusList.find(
                          (s) => s.value === item.invoiceStatus
                        )?.label
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {view === "list" && (
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left">Order Reference</th>
                  <th className="py-2 px-3 text-left">Customer</th>
                  <th className="py-2 px-3 text-left">Created by user</th>
                  <th className="py-2 px-3 text-left">Rental Status</th>
                  <th className="py-2 px-3 text-left">Invoice Status</th>
                  <th className="py-2 px-3 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate(`/orders/${item.id}`)}
                  >
                    <td className="py-2 px-3">{item.id}</td>
                    <td className="py-2 px-3">{item.customer}</td>
                    <td className="py-2 px-3">Adam</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          rentalStatusColors[item.status]
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          invoiceStatusColors[item.invoiceStatus]
                        }`}
                      >
                        {
                          invoiceStatusList.find(
                            (s) => s.value === item.invoiceStatus
                          )?.label
                        }
                      </span>
                    </td>
                    <td className="py-2 px-3">₹ {item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Status Legend */}
          <div className="mt-8">
            <div className="font-semibold mb-2">Rental status &rarr;</div>
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-200 text-blue-800">
                Quotation
              </span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-200 text-yellow-800">
                Reserved
              </span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-green-200 text-green-800">
                Pickedup
              </span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-purple-200 text-purple-800">
                Returned
              </span>
            </div>
            <div className="font-semibold mb-2">
              Invoice status on rental order level
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-800">
                Nothing to invoice
              </span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-200 text-orange-800">
                To invoice
              </span>
              <span className="px-2 py-1 rounded text-xs font-semibold bg-green-200 text-green-800">
                Fully invoiced
              </span>
            </div>
          </div>
        </div>
      </div>
    </EndUserLayout>
  );
}

export default Order;
