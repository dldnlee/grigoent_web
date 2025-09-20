'use client';

import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from './button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Artists', href: '#artists' },
    { name: 'Our Works', href: '#works' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-black/95 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="text-white font-bold text-xl">
                GRIGO
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Section: Icons + Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Utility Icons */}
              <button className="text-gray-400 hover:text-white transition-colors p-2">
                <Search className="h-5 w-5" />
              </button>

              {/* Auth Buttons */}
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Sign In
              </Button>
              <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white focus:outline-none focus:text-white p-2"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-white/10">
              <div className="px-2 pt-4 pb-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="pt-4 space-y-2">
                  <Button variant="ghost" className="w-full text-gray-300 hover:text-white">
                    Sign In
                  </Button>
                  <Button variant="default" className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}