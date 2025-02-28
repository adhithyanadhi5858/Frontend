import React, { useEffect, useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from 'react-redux'
import { clearUser } from "../../redux/features/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { ShoppingCart, Heart, User } from "lucide-react";

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const cartCount = 3
  const [isOpen, setIsOpen] = useState(false);

  const Logout = () => {
    axiosInstance.get("/api/user/logout")
      .then(res => {
        toast.success(res.data.message)
        dispatch(clearUser())
        navigate("/login")
      })
      .catch(error => {
        console.log(error)
      })
  }

  const fetchUserProfile = () => {
    axiosInstance.get("api/user/profile")
      .then(res => {
        console.log(res.data)
      })
      .catch(error => {
        console.log(error);
      });

    useEffect(() => {
      fetchUserProfile()
    }, [])
  };
  return (
    // <div className="navbar bg-primary-100 bg-primary">
    //    <Toaster position="top-center" reverseOrder={false} />
    //   <div className="flex-1">
    //     <Link to={"/"} className="btn btn-ghost text-xl text-neutral-content">VIBBORA</Link>
    //   </div>
    //   <div className="flex-1">
    //     <Link to={"/"} className="btn btn-ghost text-md text-neutral-content">Home</Link>
    //   </div>
    //   <div className="flex-1">
    //     <Link to={"/products"} className="btn btn-ghost text-md text-neutral-content">Products</Link>
    //   </div>
    //   <div className="flex-1">
    //     <Link to={"user/whishlist"} className="btn btn-ghost text-md text-neutral-content">Whishlist</Link>
    //   </div>
    //   <div className="flex-1">
    //     <Link to={"/about"} className="btn btn-ghost text-md text-neutral-content">About</Link>
    //   </div>
    //   <div className="flex-1">
    //     <Link to={"/contact"} className="btn btn-ghost text-md text-neutral-content">Contact</Link>
    //   </div>
    //   <div className="flex-none">
    //     <div className="dropdown dropdown-end">
    //       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-neutral-content ">
    //         <div className="indicator">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-5 w-5"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor">
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    //           </svg>
    //         </div>
    //       </div>
    //       <div
    //         tabIndex={0}
    //         className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
    //         <div className="card-body">
    //           <div className="card-actions">
    //             <Link to={"/user/cart"} className="btn btn-primary btn-block">View cart</Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="dropdown dropdown-end">
    //       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    //         <div className="w-10 rounded-full">
    //           <img
    //             src={formData.image} />
    //         </div>
    //       </div>
    //       <ul
    //         tabIndex={0}
    //         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
    //         <li>
    //           <Link to={"user/profile"} className="justify-between">
    //             Profile
    //             <span className="badge">New</span>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link to={"/user/orders"} className="justify-between">
    //             Your Orders

    //           </Link>
    //         </li>

    //         <li><a onClick={Logout}>Logout</a></li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>

    <header className="bg-blue-700 text-neutral-200 py-3 px-6 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide text-nuatral-400 hover:opacity-80 transition">
          Vibbora
        </Link>

        {/* Nav Links (Hidden in Mobile) */}
        <nav className="hidden md:flex space-x-14 text-base">
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Wishlist", path: "user/whishlist", icon: <Heart className="w-5 h-5 text-red-500" /> },
            { name: "Cart", path: "/user/cart", icon: <ShoppingCart className="w-6 h-6" /> },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`relative flex items-center space-x-1 hover:text-yellow-300 transition ${location.pathname === item.path ? "border-b-2 border-yellow-400 pb-1" : ""
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
              {item.path === "/cart" && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40" // Replace with actual profile image
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-yellow-400"
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg">
              <Link to="user/profile" className="block px-4 py-2 hover:bg-gray-200 transition">Profile</Link>
              <Link to="/user/orders" className="block px-4 py-2 hover:bg-gray-200 transition">My Orders</Link>
              <button onClick={Logout} className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition">Logout</button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-yellow-400 text-xl" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-blue-800 py-2">
          {/* {["/", "products", "user/whishlist", "/user/cart", "about", "contact"].map((item, index) => (
            <Link key={index} to={`/${item.toLowerCase()}`} className="block px-4 py-2 hover:bg-blue-600 transition">
              {item}
            </Link>
          ))} */}
           <Link  to={`/`} className="block px-4 py-2 hover:bg-blue-600 transition">
              Home
            </Link>
            <Link  to={`/products`} className="block px-4 py-2 hover:bg-blue-600 transition">
              Products
            </Link>
            <Link  to={`/user/whishlist`} className="block px-4 py-2 hover:bg-blue-600 transition">
              WishList
            </Link>
            <Link  to={`/user/cart`} className="block px-4 py-2 hover:bg-blue-600 transition">
              Cart
            </Link>
            <Link  to={`/contact`} className="block px-4 py-2 hover:bg-blue-600 transition">
              Contact
            </Link>
            <Link  to={`/about`} className="block px-4 py-2 hover:bg-blue-600 transition">
              About
            </Link>
        </nav>
      )}
    </header>

  );
}

export default Header;

