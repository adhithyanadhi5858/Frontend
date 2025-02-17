import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({ });

  const getProfile = ()=>{
    axiosInstance.get("/api/admine/profile")
    .then(res=>{
        setAdmin({
            name:res.data.name,
            email:res.data.email,
            role:"Administrator"
        })
    })
  }

  useEffect(()=>{
    getProfile()
  },[])

  

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
        <div className="text-left space-y-2">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Role:</strong> {admin.role}</p>
        </div>
        <button className="btn btn-primary btn-sm mt-4">Edit Profile</button>
      </div>
    </div>
  );
};

export default AdminProfile;
