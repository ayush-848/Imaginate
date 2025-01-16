import React, { useState } from 'react';
import logo from '../assets/logo bg.svg';
import Footer from '../components/Footer';

const SignUp = () => {
  const [formField, setFormField] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevField) => ({
      ...prevField,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    // Log form data for debugging
    console.log('Form Data:', formField);
  
    // Define the API endpoint
    const url = 'http://localhost:5000/auth/create-account';
  
    try {
      // Make the POST request to the server
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formField), // Send the form data as JSON
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        alert(`Error: ${errorData.message || 'Failed to create account.'}`);
        return;
      }
  
      // Parse the response body
      const result = await response.json();
      
      // Optionally reset the form fields
      setFormField({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      // Handle network or other unexpected errors
      console.error('Network Error:', error);
      alert('Network error. Please try again later.');
    }
  };
  

  return (
    <div>
      <section className="bg-gradient-to-b from-black via-slate-900 to-black text-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 font-montserrat">
          <a href="#" className="flex items-center mb-6 text-3xl font-bold">
            <span>IMAGINATE</span>
            <img src={logo} alt="Logo" className="w-8 h-8" />
          </a>
          <div className="w-full bg-slate-800 rounded-lg shadow-lg border border-slate-700 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handlesubmit}>
                {/* Full Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-300"
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
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-300"
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
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-300"
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
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-slate-700 focus:ring-3 focus:ring-blue-600 dark:focus:ring-blue-500 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-300"
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
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-400">
                  Already have an account?{' '}
                  <a
                    href="#"
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
