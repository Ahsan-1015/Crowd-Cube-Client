import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';
import { MdLogout } from 'react-icons/md';
import { HiOutlineLogin } from 'react-icons/hi';
import 'animate.css';
import '../Navbar/Navbar.css';

const navUrl = isLoggedIn => (
  <>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/campaigns">All Campaigns</NavLink>
    </li>
    {isLoggedIn && (
      <>
        <li>
          <NavLink to="/addCampaign">Add New Campaign</NavLink>
        </li>
        <li>
          <NavLink to="/myCampaign">My Campaigns</NavLink>
        </li>
        <li>
          <NavLink to="/myDonations">My Donations</NavLink>
        </li>
      </>
    )}
  </>
);

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-[#76ABAE] bg-navbar text-white shadow-md">
      {/* Navbar container */}
      <div className="w-11/12 2xl:w-10/12 max-w-[2500px] mx-auto flex items-center justify-between py-3">
        {/* Hamburger Menu (sm & md only) */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none p-2 rounded-full border"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <h1 className="text-xl md:text-3xl font-extrabold text-[#31363F]">
            <NavLink to="/">
              CROWD <span className="text-yellow-500">CUBE</span>
            </NavLink>
          </h1>
        </div>

        {/* Navigation Links (lg only) */}
        <div className="hidden lg:flex space-x-6 items-center text-black text-xl">
          <ul className="menu menu-horizontal xl:px-1 gap-2 lg:text-md xl:text-lg">
            {navUrl(!!user?.email)}
          </ul>
        </div>

        {/* Profile or Login/Register */}
        <div className="flex items-center gap-4">
          {user?.email ? (
            <div className="relative group">
              {/* Profile Image */}
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-black cursor-pointer"
                src={user.photoURL || '/default-avatar.png'}
                alt="User"
              />

              {/* Dropdown */}
              <div className="absolute w-40 -left-7 lg:left-0 xl:left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-2 px-6 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2 z-10">
                {/* User Info */}
                <div className="text-lg font-semibold">
                  {user.displayName || 'User'}
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full justify-center btn bg-[#6B1D1D] hover:bg-[#8B1D1D] text-white text-md py-1"
                >
                  <MdLogout />
                  <span className="ml-2">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex gap-4">
              {/* Login/Register Buttons */}
              <NavLink
                to="/login"
                className="btn bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 pointer-events-auto"
              >
                <HiOutlineLogin className="text-white" />
                <span className="ml-2 text-white font-semibold">Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className="btn bg-gradient-to-r from-green-400 to-green-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="text-white font-semibold">Register</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (Toggle-able for sm & md) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-900">
          <ul className="menu flex flex-col w-60 gap-4 px-4 py-2">
            {navUrl(!!user?.email)}

            {user?.email ? (
              <button
                onClick={handleLogout}
                className="btn bg-[#6B1D1D] text-white mt-4"
              >
                <MdLogout />
                <span className="ml-2">Logout</span>
              </button>
            ) : (
              <div className=" flex gap-4">
                <NavLink
                  to="/login"
                  className="btn bg-gradient-to-r from-blue-400 via-blue-300 to-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <HiOutlineLogin className="text-white" />
                  <span className="ml-2 text-white font-semibold">Login</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn bg-gradient-to-r from-green-400 to-green-300 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="text-white font-semibold">Register</span>
                </NavLink>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
