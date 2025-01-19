import React, { useState } from 'react';

const logoutAnimation = ({ isVisible }) => {
  return (
    <div
      className={`fixed font-montserrat inset-0 z-50 flex items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 border-4 border-blue-400/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-blue-400 rounded-full animate-spin"></div>
          
          {/* Inner dot pulse */}
          <div className="absolute inset-0 m-auto w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-xl text-slate-300 mb-2">Logging out...</p>
        <p className="text-sm text-slate-400">Please wait</p>
      </div>
    </div>
  );
};

export default logoutAnimation;