import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" text-white shadow-lg bg-primary">
      <div className="container mx-auto flex items-center justify-between p-4 ">
        {/* Left - Logo & Menu */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars size={24} />
          </button>
          <h1 className="text-2xl font-bold">Vibbora Admin</h1>
        </div>

        {/* Center - Nav Links */}
        <nav className={`md:flex space-x-6 ${menuOpen ? "block" : "hidden"} md:block`}>
          <Link to="/admine" className="hover:text-yellow-400">Dashboard</Link>
          <Link to="/admine/orders" className="hover:text-yellow-400">Orders</Link>
          <Link to="/admine/products" className="hover:text-yellow-400">Products</Link>
          <Link to="/admine/users" className="hover:text-yellow-400">Users</Link>
        </nav>

        {/* Right - Admin Profile */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2">
            <FaUserCircle size={24} />
            <span>Admin</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg">
              <Link to="/admine/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center">
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

