import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form";

const AdmineRegisterPage = () => {
  
   const navigate = useNavigate()
   const { register, handleSubmit } = useForm();
  
   const onSubmit =async(data)=>{
      
      try {
          axiosInstance.post("/api/admine/register",data)
          .then(res=>{
              alert(res.data.message)
              console.log(res.data)
              navigate("/admine/profile")
          })
      } catch (error) {
          console.log(error)
      }
   }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} >
        <div className="mb-4">
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="admin@name"
              {...register("name")}
              
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="admin@example.com"
              {...register("email")}
              
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="********"
              {...register("password")}
              required
            />
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdmineRegisterPage;
