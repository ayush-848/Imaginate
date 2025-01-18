import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import logo from '../assets/logo bg.svg';
import Footer from '../components/Footer';
import { handleError, handleSuccess } from '../utils/errorHandler';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';


const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formField, setFormField] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevField) => ({
      ...prevField,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formField;

    if (password !== confirmPassword) {
      handleError('Passwords do not match.');
      return;
    }
    const success = await signup(name, email, password);

    if (success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }



    setFormField({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
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
                Create an account
              </h1>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={formField.name}
                    placeholder="John Doe"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-300"
                  >
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
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={formField.password}
                    placeholder="••••••••"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-medium text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    value={formField.confirmPassword}
                    placeholder="••••••••"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 placeholder-gray-400"
                    required
                  />
                </div>
                <div className="flex items-start">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-slate-700 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-light text-gray-300"
                  >
                    I accept the{' '}
                    <a
                      className="font-medium text-blue-500 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-md text-sm px-4 py-2"
                >
                  Create an account
                </button>
                <p className="text-xs font-light text-gray-400">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Login here
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

export default SignUp;
