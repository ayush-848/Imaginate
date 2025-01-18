import React from 'react';
import logo from '../assets/logo bg.svg'

const Navbar = () => {
  return (
    <div>
      <header className="relative flex font-montserrat max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a href="/" className="flex cursor-pointer items-center whitespace-nowrap font-montserrat text-3xl font-semibold text-white">
          <span className="mr-16 text-6xl text-blue-400">
          </span>
          <span>IMAGINATE</span><img src={logo} alt="Logo" className="w-8 h-8" />

        </a>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label className="absolute top-5 right-5 cursor-pointer text-white md:hidden" htmlFor="navbar-open">
          <span className="sr-only">Toggle Navigation</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <nav aria-label="Header Navigation" className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start">
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="font-bold text-gray-200 md:mr-8 hover:text-white">
              <a href="#">Pricing</a>
            </li>
            <li className="text-gray-200 md:mr-8 hover:text-white">
              <a href="#">Features</a>
            </li>
            <li className="text-gray-200 md:mr-8 hover:text-white">
              <a href="#">Support</a>
            </li>
            <li className="md:mr-4">
              <a href="/login">
                <button className="rounded-full border-2 border-blue-400 px-6 py-1 text-blue-400 transition-colors hover:bg-blue-400 hover:text-white">
                  Login
                </button>
              </a>
            </li>
            <li className='md:mr-4'>
            <a href="/signup">
                <button className="rounded-full border-2 border-blue-400 px-6 py-1 text-blue-400 transition-colors hover:bg-blue-400 hover:text-white">
                  Signup
                </button>
              </a>
            </li>

          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
