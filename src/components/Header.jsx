import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-lg border-b-2 border-duo-green-200 font-nunito">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div 
            className={`text-3xl font-bold text-duo-green-500 transition-transform duration-300 ${isHovered ? 'animate-wiggle' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            🦉
          </div>
          <h1 className="text-2xl font-bold font-comfortaa text-duo-green-700">
            LearnHub
          </h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/home" 
                className={`font-semibold text-lg transition-all duration-200 hover:text-duo-green-500 hover:scale-105 ${
                  location.pathname === '/home' 
                    ? 'text-duo-green-500 border-b-2 border-duo-green-500 pb-1' 
                    : 'text-gray-700 hover:border-b-2 hover:border-duo-green-300 pb-1'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`font-semibold text-lg transition-all duration-200 hover:text-duo-blue-500 hover:scale-105 ${
                  location.pathname === '/about' 
                    ? 'text-duo-blue-500 border-b-2 border-duo-blue-500 pb-1' 
                    : 'text-gray-700 hover:border-b-2 hover:border-duo-blue-300 pb-1'
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/language-learning" 
                className={`font-semibold text-lg transition-all duration-200 hover:text-duo-yellow-500 hover:scale-105 ${
                  location.pathname === '/language-learning' || location.pathname === '/' 
                    ? 'text-duo-yellow-600 border-b-2 border-duo-yellow-500 pb-1' 
                    : 'text-gray-700 hover:border-b-2 hover:border-duo-yellow-400 pb-1'
                }`}
              >
                Learn Languages 🌟
              </Link>
            </li>
          </ul>
        </nav>

        {/* Action Button */}
        <button className="bg-duo-green-500 hover:bg-duo-green-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg font-nunito">
          Get Started
        </button>
      </div>
    </header>
  );
}

export default Header;
