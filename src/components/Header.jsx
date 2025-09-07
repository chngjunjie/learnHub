import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TapirLogo from './TapirLogo';

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-duo-green-200 font-nunito">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div 
              className={`transition-transform duration-300 ${isHovered ? 'animate-wiggle' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <TapirLogo className="text-duo-green-500" size="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-comfortaa text-duo-green-700">
              LearnHub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-6 xl:space-x-8">
              <li>
                <Link 
                  to="/home" 
                  className={`font-semibold text-base xl:text-lg transition-all duration-200 hover:text-duo-green-500 hover:scale-105 ${
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
                  className={`font-semibold text-base xl:text-lg transition-all duration-200 hover:text-duo-blue-500 hover:scale-105 ${
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
                  className={`font-semibold text-base xl:text-lg transition-all duration-200 hover:text-duo-yellow-500 hover:scale-105 ${
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

          {/* Desktop Action Button */}
          <button className="hidden md:block bg-duo-green-500 hover:bg-duo-green-600 text-white font-semibold px-4 lg:px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg font-nunito text-sm lg:text-base">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden relative z-50 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-700 mt-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-700 mt-1.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="pb-6 pt-2">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/home" 
                  className={`block font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-200 ${
                    location.pathname === '/home' 
                      ? 'text-duo-green-500 bg-duo-green-50' 
                      : 'text-gray-700 hover:text-duo-green-500 hover:bg-duo-green-50'
                  }`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`block font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-200 ${
                    location.pathname === '/about' 
                      ? 'text-duo-blue-500 bg-duo-blue-50' 
                      : 'text-gray-700 hover:text-duo-blue-500 hover:bg-duo-blue-50'
                  }`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/language-learning" 
                  className={`block font-semibold text-lg py-2 px-4 rounded-lg transition-all duration-200 ${
                    location.pathname === '/language-learning' || location.pathname === '/' 
                      ? 'text-duo-yellow-600 bg-duo-yellow-50' 
                      : 'text-gray-700 hover:text-duo-yellow-500 hover:bg-duo-yellow-50'
                  }`}
                  onClick={closeMenu}
                >
                  Learn Languages 🌟
                </Link>
              </li>
              <li className="pt-4">
                <button 
                  className="w-full bg-duo-green-500 hover:bg-duo-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg font-nunito"
                  onClick={closeMenu}
                >
                  Get Started
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
