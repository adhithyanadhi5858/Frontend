import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from 'react-redux';
import { clearAdmine } from "../../redux/features/admineSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AdmineLogout = () => {
    axiosInstance.get("api/admine/logout")
      .then(res => {
        dispatch(clearAdmine());
        toast.success("Admin Logout Successful!");
        navigate("admine/login");
      })
      .catch(err => {
        toast.error("Logout failed!");
      });
  };

  return (
    <header className="text-white shadow-lg bg-primary">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto flex items-center justify-between p-4">

        {/* Left - Logo & Menu Button */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
            <FaBars size={24} />
          </button>
          <h1 className="text-2xl font-bold">VIBBORA Admin</h1>
        </div>

        {/* Center - Navigation Links */}
        <nav
          className={`absolute md:relative top-16 left-0 w-full md:w-auto md:flex flex-col md:flex-row bg-primary md:bg-transparent transition-all duration-300 z-50 pb-16 ${
            navOpen ? "block" : "hidden md:flex"
          }`}
        >
          <Link to="/admine" className="block md:inline-block px-4 py-2 md:py-0 hover:text-yellow-400">
            Dashboard
          </Link>
          <Link to="/admine/orders" className="block md:inline-block px-4 py-2 md:py-0 hover:text-yellow-400">
            Orders
          </Link>
          <Link to="/admine/products" className="block md:inline-block px-4 py-2 md:py-0 hover:text-yellow-400">
            Products
          </Link>
          <Link to="/admine/users" className="block md:inline-block px-4 py-2 md:py-0 hover:text-yellow-400">
            Users
          </Link>
        </nav>

        {/* Right - Admin Profile */}
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
            <FaUserCircle size={24} />
            <span>Admin</span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg">
              <Link to="/admine/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link>
              <button
                onClick={AdmineLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


