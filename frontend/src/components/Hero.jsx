import React from 'react';

const Hero = () => {
  return (
    <div className="relative mx-auto px-4 pt-16 font-raleway sm:max-w-xl md:max-w-4xl md:px-8 lg:py-32 xl:px-20 text-white ">
      <div className="mx-auto max-w-xl lg:max-w-screen-xl">
        <div className="mx-auto mb-16 flex flex-col items-center text-center lg:mb-0 lg:max-w-2xl">
          <div className="mb-6 max-w-xl">
            <div className='mb-4'>
              <p className="bg-teal-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-bold uppercase tracking-wider text-blue-900 border border-slate-100">
                INTRODUCING
              </p>
            </div>
            <h2 className='font-bold md:text-5xl lg:text-5xl mb-10 font-montserrat'>&nbsp;&nbsp;&nbsp;&nbsp;IMAGINATE ✨</h2>
            <h2 className="mb-6 max-w-xl text-3xl sm:text-3xl md:text-3xl font-semibold text-blue-400 italic font-montserrat">
              Turn Your Words into Stunning{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-300 text-transparent bg-clip-text text-4xl font-extrabold animate-text-shadow hover:scale-105 transition-all">
                Visuals
              </span>
            </h2>
            <p className="text-lg text-gray-300 md:text-xl max-w-xl mx-auto my-8 font-montserrat">
              Imaginate lets you transform text prompts into stunning AI-generated artwork. Whether you're an artist, designer, or dreamer, bring your ideas to life in seconds.
            </p>
          </div>
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
