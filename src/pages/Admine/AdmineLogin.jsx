// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosInstance";
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
// import { saveAdmine } from "../../redux/features/admineSlice";
// import toast, { Toaster } from "react-hot-toast";

// const AdmineLoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const res = await axiosInstance.post("/api/admine/login", data);
//       toast.success(res.data.message || "Login successful!");
//       dispatch(saveAdmine(res.data));
//       navigate("/admine/profile");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Login failed! Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="block font-medium mb-1">Email</label>
//             <input
//               type="email"
//               className="input input-bordered w-full"
//               placeholder="admin@example.com"
//               {...register("email")}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block font-medium mb-1">Password</label>
//             <input
//               type="password"
//               className="input input-bordered w-full"
//               placeholder="********"
//               {...register("password")}
//               required
//             />
//           </div>

//           <button className="btn btn-primary w-full" type="submit">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdmineLoginPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveAdmine } from "../../redux/features/admineSlice";
import { axiosInstance } from "../../config/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/admine/login", data);
      if(res.data.message=="Admine Not Exist"){
        return toast.error(res.data.message)
      }
      toast.success("Admine Login successful!");
      dispatch(saveAdmine(res.data));

      setTimeout(() => navigate("/admine/profile"), 2000);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
              placeholder="admin@example.com"
              {...register("email")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
              {...register("password")}
              required
            />
          </div>

          <button 
            className={`btn btn-primary w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

