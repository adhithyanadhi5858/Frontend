import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch admin profile
  const getProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/admine/profile");
      setAdmin({
        name: res.data.name,
        email: res.data.email,
        image: res.data.image,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", admin.name);
    formData.append("email", admin.email);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await axiosInstance.put("/api/admine/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAdmin({
        name: res.data.updateAdmine.name,
        email: res.data.updateAdmine.email,
        image: res.data.updateAdmine.image,
      });
      setEditMode(false);
      toast.success("Profile Updated!");
    } catch (error) {
      console.error(error);
      alert("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

        {/* Profile Picture */}
        <div className="mb-4">
          {admin.image ? (
            <img src={admin.image} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {/* Profile Form */}
        {editMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-left font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-left font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-left font-semibold">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="w-full bg-gray-400 text-white py-2 rounded mt-2"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="text-left space-y-2">
            <p><strong>Name:</strong> {admin.name}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded mt-4"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;



