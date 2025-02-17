import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

function Header() {

  const navigate = useNavigate()

  const Logout = ()=>{
    axiosInstance.get("/api/user/logout")
    .then(res=>{
      alert(res.data.message)
      navigate("/login")
    })
    .catch(error=>{
      console.log(error)
    })
  }
  return (
    <div className="navbar bg-primary-100 bg-primary">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl text-neutral-content">VIBBORA</Link>
      </div>
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-md text-neutral-content">Home</Link>
      </div>
      <div className="flex-1">
        <Link to={"/products"} className="btn btn-ghost text-md text-neutral-content">Products</Link>
      </div>
      {/* <div className="flex-1">
        <Link to={"user/cart"} className="btn btn-ghost text-md text-neutral-content">Cart</Link>
      </div> */}
      <div className="flex-1">
        <Link to={"user/whishlist"} className="btn btn-ghost text-md text-neutral-content">Whishlist</Link>
      </div>
      <div className="flex-1">
        <Link to={"/about"} className="btn btn-ghost text-md text-neutral-content">About</Link>
      </div>
      <div className="flex-1">
        <Link to={"/contact"} className="btn btn-ghost text-md text-neutral-content">Contact</Link>
      </div>
      <div>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
          </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* <span className="badge badge-sm indicator-item">8</span> */}
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            <div className="card-body">
              {/* <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span> */}
              <div className="card-actions">
                <Link to={"/user/cart"} className="btn btn-primary btn-block">View cart</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.avif" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to={"user/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/orders"} className="justify-between">
                Your Orders
                
              </Link>
            </li>
            
            <li><a onClick={Logout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

  );
}

export default Header;
