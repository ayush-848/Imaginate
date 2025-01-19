// src/components/Login.js

import React, { useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { handleError} from '../utils/errorHandler';
import useAuth from '../hooks/useAuth';
import logo from '../assets/logo bg.svg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Login = () => {
  const navigate = useNavigate();

  const [formField, setFormField] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevField) => ({
      ...prevField,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formField;
    
    if (!email || !password) {
      return handleError('All fields are required');
    }

    const success = await login(email, password);

    if (success) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-gradient-to-b from-black via-slate-900 to-black text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto md:h-screen lg:py-0 font-montserrat">
          <a href="#" className="flex items-center mt-8 mb-4 text-3xl font-bold lg:-mt-10">
            <span>IMAGINATE</span>
            <img src={logo} alt="Logo" className="w-8 h-8" />
          </a>
          <div className="w-full bg-slate-800 rounded-lg shadow-lg border border-slate-700 sm:max-w-sm">
            <div className="p-4 space-y-3 sm:p-6">
              <h1 className="text-lg font-bold tracking-tight text-white md:text-xl">
                Log In to your account
              </h1>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={formField.email}
                    placeholder="name@company.com"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={formField.password}
                    placeholder="••••••••"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-md text-sm px-4 py-2"
                >
                  Login
                </button>
                <p className="text-xs font-light text-gray-400">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-medium text-blue-500 hover:underline">
                    Sign up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
