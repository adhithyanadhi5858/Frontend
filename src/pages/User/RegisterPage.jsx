// import React, { useState } from 'react'
// import '../../styles/style.css'
// import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { useForm } from "react-hook-form";
// import { axiosInstance } from '../../config/axiosInstance'
// import { useSelector, useDispatch } from 'react-redux'
// import { saveUser } from '../../redux/features/userSlice';

// function Register() {
//   const { isUserAuth, userData } = useSelector((state) => state.user)
//     const dispatch = useDispatch()

//  const navigate = useNavigate()
//  const { register, handleSubmit } = useForm();

//  const onSubmit =async(data)=>{
    
//     try {
//         axiosInstance.post("/api/user/register",data)
//         .then(res=>{
//             alert(res.data.message)
//             navigate("/user/profile")
//             dispatch(saveUser(res.data.newUser))
//         })
//     } catch (error) {
//         console.log(error)
//     }
//  }


//   return (


//     <>
//       <div className='form-body'>
        
//             <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//               <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                 <img
//                   alt="Your Company"
//                   src="logo.png"
//                   className="mx-auto h-10 w-auto"
//                 />
//                 <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//                   Sign Up to your account
//                 </h2>
//               </div>

//               <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                 <form action="#" onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
//                   <div>
//                     <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
//                       Name
//                     </label>
//                     <div className="mt-2">
//                       <input
//                         id="name"
//                         {...register("name")}
//                         type="text"
//                         required
//                         autoComplete="name"
//                         className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
//                       Email address
//                     </label>
//                     <div className="mt-2">
//                       <input
//                         id="email"
//                         {...register("email")}
//                         type="email"
//                         required
//                         autoComplete="email"
//                         className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                       
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex items-center justify-between">
//                       <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
//                         Password
//                       </label>
//                     </div>
//                     <div className="mt-2">
//                       <input
//                         id="password"
//                         {...register("password")}
//                         type="password"
//                         required
//                         autoComplete="current-password"
//                         className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        
//                      />
//                     </div>
//                   </div>

//                   <div>
//                     <button
//                       type="submit"
//                       className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Signup
//                     </button>
//                   </div>
//                   <div>
//                     <Link to={"/login"} className="label-text-alt link link-hover"  >Login ?</Link>
//                   </div>
//                 </form>
//               </div>
//             </div>
        
//       </div>
//     </>
//   )
// }

// export default Register

import React from "react";
import "../../styles/style.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../../redux/features/userSlice";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const { isUserAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/user/register", data);
      dispatch(saveUser(res.data.newUser));
      toast.success("Registration successful!");
      setTimeout(() => navigate("/user/profile"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
      console.error(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="form-body">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src="logo.png" className="mx-auto h-10 w-auto" />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign Up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    {...register("name")}
                    type="text"
                    required
                    autoComplete="name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password")}
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Signup
                </button>
              </div>
              <div>
                <Link to={"/login"} className="label-text-alt link link-hover">
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;



