import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/orders");
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update Order Status
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`, { status });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading Orders...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t">
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white 
                    ${order.status === "Pending" ? "bg-yellow-500" : "bg-green-500"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => updateStatus(order._id, "Delivered")}
                      className="px-3 py-1 bg-blue-500 text-white rounded flex items-center gap-2"
                    >
                      <FaCheck /> Mark as Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderPage;
