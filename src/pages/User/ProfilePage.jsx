import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);  
  const [order, setOrder] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  // Fetch user profile data
  const fetchUserProfile = () => {
    axiosInstance.get("api/user/profile")
      .then(res => {
        setUser(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          image: res.data.image || "",
        });        
      })   
      .catch(error => {
        console.log(error);
      });
  };
 
  // Fetch user orders
  const getOrders = () => {
    axiosInstance.get("api/order/get-order")
      .then((res) => {
        setOrder(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserProfile();
    getOrders();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // Submit the form to update the profile
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    axiosInstance.put("api/user/profile", formData)
      .then((res) => {
        setUser(res.data);
        setIsEditing(false); // Switch back to non-editable mode
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Display loading message while fetching data
  if (!user) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={formData.image || "https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-indigo-500"
        />
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-xl text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="text-center">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full text-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <form onSubmit={handleFormSubmit} className="mt-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                required
              />
            </div>
           
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Order History */}
       <div className="mt-10">
         <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h3>
         <div className="space-y-4">
           {order?.length > 0 ? (
             order.map((order) => (
               <div
                 key={order._id}
                 className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
               >
                 <div>
                   <h4 className="text-xl font-semibold text-gray-800">Order ID: {order?._id}</h4>
                   <h4 className="text-xl font-semibold text-gray-800">Product : {order?.productId?.title}</h4>
                   <img src={order?.productId?.image} alt={order?.productId?.title} className="w-16 h-16 object-cover rounded" />
                   <p className="text-gray-600">Status: {order.orderStatus}</p>
                 </div>
                 <Link to={`/product-details/${order?.productId?._id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition-all duration-300">
                   View Product
                 </Link>
               </div>
             ))
           ) : (
             <p className="text-center text-gray-500">You have no orders yet.</p>
           )}
         </div>
       </div>
    </div>
  );
};

export default ProfilePage;
