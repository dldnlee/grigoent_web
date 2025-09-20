'use client';

import { useState } from 'react';

export default function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Artists', href: '#artists' },
    { name: 'Our Works', href: '#works' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <nav className='w-full fixed p-10  z-20'>
      <div className="bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-300 rounded-full w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-10">
              <div className="text-black font-bold text-2xl tracking-wide">
                GRIGO
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-black transition-colors duration-200 font-light"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* Desktop Navigation */}
            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🌐</span>
                </div>
                <span className="text-sm">EN</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors">
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">👤</span>
                </div>
                <span className="text-sm">Sign In</span>
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Sign Up
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-black focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-200">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-black block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                {/* Mobile buttons */}
                <div className="border-t border-gray-300 pt-4 space-y-2">
                  <button className="w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors">
                    Language (EN)
                  </button>
                  <button className="w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors">
                    Sign In
                  </button>
                  <button className="w-full bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
