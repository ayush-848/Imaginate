import { Sparkles } from 'lucide-react';
import React from 'react';
import logo from '../assets/logo bg.svg';

const Hero = () => {
  return (
    <div className="relative mx-auto px-4 pt-16 font-raleway sm:max-w-xl md:max-w-4xl md:px-8 lg:py-32 xl:px-20 text-white">
      <div className="mx-auto max-w-xl lg:max-w-screen-xl">
        <div className="mx-auto mb-16 flex flex-col items-center text-center lg:mb-0 lg:max-w-2xl">
          <div className="mb-6 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full text-blue-400 text-sm mb-4 font-raleway font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Image Generation</span>
            </div>
            {/* Logo and Title */}
            <h2
  className="flex items-center justify-center font-bold text-4xl sm:text-4xl md:text-5xl lg:text-5xl mb-10 font-montserrat"
>
  IMAGINATE
  <img
    src={logo}
    alt="Logo"
    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 ml-2"
  />
</h2>

            {/* Subtitle */}
            <h2 className="mb-6 max-w-xl text-2xl sm:text-2xl md:text-3xl font-semibold text-blue-400 italic font-montserrat">
              Turn Your Words into Stunning{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-300 text-transparent bg-clip-text text-3xl font-extrabold animate-text-shadow hover:scale-105 transition-all md:text-4xl">
                Visuals
              </span>
            </h2>
            {/* Description */}
            <p className="text-base text-gray-300 md:text-xl max-w-xl mx-auto my-8 font-montserrat">
              Imaginate lets you transform text prompts into stunning AI-generated artwork. Whether you're an artist, designer, or dreamer, bring your ideas to life in seconds.
            </p>
          </div>
          {/* Call-to-action Buttons */}
          <div className="flex items-center">
            <a
              href="#"
              className="mr-6 inline-flex h-12 items-center justify-center rounded bg-blue-700 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-blue-800 focus:ring"
            >
              Get started
            </a>
            <a
              href="#"
              aria-label=""
              className="inline-flex items-center font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-500"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
