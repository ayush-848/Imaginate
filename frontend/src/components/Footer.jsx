import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from '../assets/logo bg.svg'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white font-montserrat shadow">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-12 md:space-y-0 md:space-x-12">
          {/* Logo & About */}
          <div className="flex-1">
            <a href="/" className="flex items-center space-x-1 rtl:space-x-reverse mb-4">
              <span className="text-2xl font-semibold whitespace-nowrap">
                IMAGINATE 
              </span><img src={logo} alt="Logo" className="w-8 h-8" />
            </a>
            <p className="text-gray-400 text-sm">
              IMAGINATE is your go-to platform for turning ideas into stunning visuals. Explore endless creative possibilities and unleash your imagination.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-3 text-sm">
              <li>
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Licensing</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Support</a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="text-gray-400 space-y-3 text-sm">
              <li>
                <a href="#" className="hover:underline">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:underline">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:underline">API Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Developer Tools</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Community Forum</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter to get the latest updates and exclusive offers.
            </p>
            <form className="flex items-center space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-xs rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Social Media */}
          <div className="flex space-x-6 rtl:space-x-reverse mb-4 sm:mb-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaGithub size={20} />
            </a>
          </div>

          {/* Copyright */}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2023 IMAGINATE ✨. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
