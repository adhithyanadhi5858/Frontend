import { useState } from "react";

const OrdersPage = () => {
  const [orders] = useState([
    { id: "ORD123", date: "2024-02-10", total: 499, status: "Pending" },
    { id: "ORD124", date: "2024-02-08", total: 899, status: "Shipped" },
    { id: "ORD125", date: "2024-02-05", total: 1299, status: "Delivered" },
  ]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>${order.total}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Pending"
                          ? "badge-warning"
                          : order.status === "Shipped"
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
