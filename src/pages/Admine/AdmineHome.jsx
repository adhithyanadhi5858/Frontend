import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const AdminHomePage = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    products: 0,
  });

  const [orders,setOrders]=useState()

 const getOrders = ()=>{
  axiosInstance.get("/api/order/get-all-orders")
  .then(res=>{
    console.log(res.data)
    setStats({
      orders:res.data.length
    })
  })
  .catch(error=>{
    console.log(error)
  })
 }

  const getUsers = ()=>{
    axiosInstance.get("/api/user/get-all-users")
    .then(res=>{
      console.log(res.data)
        setStats({
          users:res.data.length
        })
       
    })
    .catch(error=>{
      console.log(error)
    })
  }
  // useEffect(() => {
  // getUsers()
  
  // }, []);

 

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
      </div>

      {/* Recent Orders Table */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders > 0 ? (
              orders.map((order,index) => (
                <tr key={order.index}>
                  <td>{}</td>
                  <td>{}</td>
                  <td>
                    <span className={`badge ${order.status === "Completed" ? "badge-success" : "badge-warning"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>${}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No recent orders.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
