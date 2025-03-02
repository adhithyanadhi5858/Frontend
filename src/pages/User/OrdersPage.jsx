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
        // <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        //   <table className="table w-full">
        //     <thead>
        //       <tr>
        //         <th>Order ID</th>
        //         <th>Product</th>
        //         <th>Total</th>
        //         <th>Status</th>
        //         <th>Ordered Date</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //        {order.map((order) => (
        //         <tr key={order._id}>
        //           <td>{order._id}</td>
        //          <td>{order?.productId?.title} </td>
        //           <td>${order?.productId?.price}</td>
        //           <td>
        //             <span
        //               className={`badge ${order.orderStatus === "Pending"
        //                   ? "badge-warning"
        //                   : order.status === "Shipped"
        //                     ? "badge-info"
        //                     : "badge-success"
        //                 }`}
        //             >
        //               {order.orderStatus}
        //             </span>
        //           </td>
        //           <td>
        //             {order.createdAt}
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Ordered Date</th>
              </tr>
            </thead>
            <tbody>
              {order.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order?.productId?.title}</td>
                  <td className="px-4 py-2">${order?.productId?.price}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${order.orderStatus === "Pending"
                          ? "bg-yellow-500"
                          : order.orderStatus === "Shipped"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.createdAt}</td>
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
