import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const OrdersPage = () => {
 
  const [order, setOrder] = useState([]);

  const getOrders = () => {
    axiosInstance.get("api/order/get-order")
      .then((res) => {
        setOrder(res.data.orders);
        console.log(res.data.orders)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Your Orders</h2>

      {order?.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Total</th>
                <th>Status</th>
                <th>Ordered Date</th>
              </tr>
            </thead>
            <tbody>
               {order.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                 <td>{order?.productId?.title} </td>
                  <td>${order?.productId?.price}</td>
                  <td>
                    <span
                      className={`badge ${order.orderStatus === "Pending"
                          ? "badge-warning"
                          : order.status === "Shipped"
                            ? "badge-info"
                            : "badge-success"
                        }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    {order.createdAt}
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
