import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import GetStarted from '../components/GetStarted';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-slate-950 overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0">
          {/* Reduced radius for glowing effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.2),rgba(0,0,0,0)_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15),rgba(0,0,0,0)_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.8),rgba(0,0,0,0)_50%,rgba(0,0,0,0.8))]" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 70%)' // Optional: Adjust grid fade effect
          }}
        />

        {/* Content */}
        <div className="relative">
          <Navbar />
          <Hero />
        </div>
      </div>
      <GetStarted />
      <Footer/>
    </div>
  );
};

export default Home;
