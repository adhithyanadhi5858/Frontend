import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const ProfilePage = () => {
  const [user, setUser] = useState([]);

  const fetchUserProfile =  () => {
   
    axiosInstance.get("/api/user/profile")
    .then(res=>{
      setUser(res.data);
      console.log()
    })   
    .catch(error=>{
      console.log(error);
    })
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!user) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <button className="btn btn-primary mt-4">Edit Profile</button>

      <h3 className="text-xl font-semibold mt-6">Order History</h3>
      <ul className="mt-3">
        {/* {user.orders.length > 0 ? (
          user.orders.map((order) => (
            <li key={order._id} className="border p-2 rounded my-2">
              Order ID: {order._id} - Status: {order.status}
            </li>
          ))
        ) : (
          <p>No orders found.</p>
        )} */}
      </ul>
    </div>
  );
};

export default ProfilePage;
