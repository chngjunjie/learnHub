import React from 'react';
import TapirLogo from './TapirLogo';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-duo-green-50 to-duo-blue-50 border-t-2 border-duo-green-200 py-8 font-nunito">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand and Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-2">
              <TapirLogo size="h-20 w-20" />
              <span className="font-bold text-xl text-duo-green-700 font-comfortaa">LearnHub</span>
            </div>
            <p className="text-gray-600 text-sm text-center md:text-left">
              The free, fun, and effective way to learn languages!
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-duo-green-500 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-duo-blue-500 transition-colors">Courses</a>
            <a href="#" className="text-gray-600 hover:text-duo-yellow-600 transition-colors">Help</a>
            <a href="#" className="text-gray-600 hover:text-duo-red-500 transition-colors">Contact</a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <div className="text-duo-green-500 hover:text-duo-green-600 transition-colors cursor-pointer hover:animate-bounce-slow">
              📱
            </div>
            <div className="text-duo-blue-500 hover:text-duo-blue-600 transition-colors cursor-pointer hover:animate-bounce-slow">
              🌐
            </div>
            <div className="text-duo-yellow-500 hover:text-duo-yellow-600 transition-colors cursor-pointer hover:animate-bounce-slow">
              ✨
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LearnHub - Making language learning fun and accessible for everyone
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
