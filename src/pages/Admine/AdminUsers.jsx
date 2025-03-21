import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AdminUsersPage = () => {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchUsers = async () => {
    try {
      axiosInstance.get("api/user/get-all-users")
      .then(res=>{
        setUsers(res.data)
      })
      .catch(err=>{
        console.log(err)
      })

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const deleteUser = async (id) => {
    try {
      axiosInstance.delete(`api/user/delete/${id}`)
      .then(res=>{
        toast.success(res.data.message);
        fetchUsers()
      })
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading Users...</div>;

  return (
    <div className="p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">All Users List</h2>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
            <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role=="admine" ? "Admin" : "User"}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
