import React, { useContext } from 'react';
import logo from '../assets/logo bg.svg';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // Function to get initials or first 3 letters of the name
  const getUserInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase(); // First letter of first and last name
    } else {
      return name.slice(0, 3).toUpperCase(); // First three letters of the single name
    }
  };

  return (
    <header className="relative flex font-montserrat max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
      <a
        href="/"
        className="flex cursor-pointer items-center whitespace-nowrap font-montserrat text-3xl font-semibold text-white"
      >
        <span className="mr-16 text-6xl text-blue-400"></span>
        <span>IMAGINATE&nbsp;</span>
        <img src={logo} alt="Logo" className="w-8 h-8" />
      </a>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label
        className="absolute top-5 right-5 cursor-pointer text-white md:hidden"
        htmlFor="navbar-open"
      >
        <span className="sr-only">Toggle Navigation</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <nav
        aria-label="Header Navigation"
        className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
      >
        <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          <li className="text-gray-400 md:mr-8 hover:text-white">
            <a href="#pricing">Pricing</a>
          </li>
          <li className="text-gray-400 md:mr-8 hover:text-white">
            <a href="#features">Features</a>
          </li>
          <li className="text-gray-400 md:mr-8 hover:text-white">
            <a href="#">Support</a>
          </li>
          {user ? (
  <>
    <li className="text-gray-400 md:mr-8 hover:text-white">
      <a href="/chats">History</a>
    </li>
    <li className="text-gray-200 md:mr-4">
      <button
        className="flex items-center justify-center w-11 h-11 rounded-full bg-transparent text-white font-semibold border-2 border-blue-800"
        disabled
      >
        {getUserInitials(user.name)}
      </button>
    </li>
    <li className="md:mr-4">
      <button
        onClick={logout}
        className="rounded-full border-2 border-red-400 px-6 py-1 text-red-400 transition-colors hover:bg-red-400 hover:text-white"
      >
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li className="md:mr-4">
      <a href="/login">
        <button className="rounded-full border-2 border-blue-400 px-6 py-1 text-blue-400 transition-colors hover:bg-blue-400 hover:text-white">
          Login
        </button>
      </a>
    </li>
    <li className="md:mr-4">
      <a href="/signup">
        <button className="rounded-full border-2 border-blue-400 px-6 py-1 text-blue-400 transition-colors hover:bg-blue-400 hover:text-white">
          Signup
        </button>
      </a>
    </li>
  </>
)}

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
