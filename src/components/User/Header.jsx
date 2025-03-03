import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { ShoppingCart, Heart, User } from "lucide-react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount =3
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user,setUser] = useState()

  const Logout = () => {
    axiosInstance.get("/api/user/logout")
      .then(res => {
        toast.success(res.data.message);
        dispatch(clearUser());
        navigate("/login");
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    axiosInstance.get("/api/user/profile")
      .then(res => {
        setUser(res.data.image)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <header className="bg-blue-700 text-neutral-200 py-3 px-6 shadow-md fixed w-full top-0 z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide hover:opacity-80 transition">
          VIBBORA
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-14 text-base">
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "Wishlist", path: "/user/whishlist", icon: <Heart className="w-5 h-5 text-red-500" /> },
            { name: "Cart", path: "/user/cart", icon: <ShoppingCart className="w-6 h-6" /> },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`relative flex items-center space-x-1 hover:text-yellow-300 transition ${
                location.pathname === item.path ? "border-b-2 border-yellow-400 pb-1" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
              {item.path === "/user/cart" && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
            <img
              src={user} // Replace with actual profile image
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-yellow-400"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg">
              <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-200 transition">Profile</Link>
              <Link to="/user/orders" className="block px-4 py-2 hover:bg-gray-200 transition">My Orders</Link>
              <button onClick={Logout} className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-yellow-400 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-blue-800 transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <button className="text-white text-2xl" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>
        <nav className="space-y-4 text-white px-6">
          <Link to="/" className="block py-2 hover:bg-blue-600 transition" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="block py-2 hover:bg-blue-600 transition" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/user/whishlist" className="block py-2 hover:bg-blue-600 transition" onClick={() => setMenuOpen(false)}>
            Wishlist
          </Link>
          <Link to="/user/cart" className="block py-2 hover:bg-blue-600 transition" onClick={() => setMenuOpen(false)}>
            Cart
          </Link>
          <Link to="/contact" className="block py-2 hover:bg-blue-600 transition" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/about" className="block py-2 hover:bg-blue-600 transition" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;


