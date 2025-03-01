import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const AdminHomePage = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    products: 0,
    pending:0,
    delivered:0,
  });
  const [orders, setOrders] = useState()

  const admineDashBoard = () => {
    axiosInstance.get("/api/admine/admine-dashboard")
      .then(res => {
        console.log(res.data)
        setStats({
          users: res.data.data.totalUsers,
          orders: res.data.data.totalOrders,
          products: res.data.data.totalProducts,
          pending : res.data.data.pendingOrders,
          delivered : res.data.data.deliveredOrders,
          revenue:res.data.data.totalSales[0].total
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getOrders = () => {
    axiosInstance.get("/api/order/get-all-orders")
      .then(res => {
        setOrders(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }


  useEffect(() => {

    admineDashBoard()
    getOrders()

  }, [])



  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-blue-500 text-white p-6 rounded-lg">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="card bg-green-500 text-white p-6 rounded-lg">
          <h2 className="text-lg">Total Orders</h2>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="card bg-yellow-500 text-white p-6 rounded-lg">
          <h2 className="text-lg">Revenue</h2>
          <p className="text-2xl font-bold">${stats.revenue}</p>
        </div>
        <div className="card bg-red-500 text-white p-6 rounded-lg">
          <h2 className="text-lg">Total Products</h2>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>
        <div className="card bg-orange-500 text-white p-6 rounded-lg">
          <h2 className="text-lg">Pending Orders</h2>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
        <div className="card bg-violet-500 text-white p-6 rounded-lg">
          <h2 className="text-lg">Delivered Orders</h2>
          <p className="text-2xl font-bold">{stats.delivered}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Status</th>
              <th>Product ID</th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((order,index)=>(
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order?.userId}</td>
                  <td>
                    <span className={`badge ${order.orderStatus === "Delivered" ? "badge-success" : "badge-warning"}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>{order.productId}</td>
                </tr>
              ))
               
            }
          </tbody>
        </table>
      </div> 
    </div>
  );
};

export default AdminHomePage;
