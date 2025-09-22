'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Languages, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from '@/app/contexts/LanguageContext';
import AnimatedHamburger from './AnimatedHamburger';
import MobileMenu from './MobileMenu';

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: '/', type: 'route' },
    { name: t('nav.about'), href: '#about', type: 'anchor' },
    { name: t('nav.artists'), href: '/artists', type: 'route' },
    { name: t('nav.works'), href: '#works', type: 'anchor' },
    { name: t('nav.contact'), href: '#contact', type: 'anchor' }
  ];

  const router = useRouter();

  const handleNavClick = (href: string, type: string) => {
    if (type === 'route') {
      router.push(href);
    } else {
      // Smooth scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <>
      <nav className='w-full fixed p-4 md:p-10 z-20'>
        <div className="bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-300 rounded-full w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 md:h-16">
              {/* Logo */}
              <div className="flex items-center gap-6 md:gap-10">
                <div className="text-black font-bold text-xl md:text-2xl tracking-wide">
                  GRIGO
                </div>
                {/* Desktop Navigation */}
                <div className="hidden md:block">
                  <div className="flex items-center space-x-8">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href, item.type)}
                        className="text-gray-700 hover:text-black transition-colors duration-200 font-light rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-label={`Navigate to ${item.name}`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Right Side */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Language Switcher */}
                <button
                  onClick={handleLanguageToggle}
                  className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label={`Change language to ${language === 'ko' ? 'English' : '한국어'}`}
                >
                  <Languages className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">{language === 'ko' ? 'EN' : '한'}</span>
                </button>

                {/* Sign In Button */}
                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="Sign in to your account"
                >
                      <UserCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">{t('nav.signin')}</span>
                </button>

                {/* Sign Up Button */}
                <button
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Create a new account"
                >
                  {t('nav.signup')}
                </button>
              </div>

              {/* Mobile Menu Controls */}
              <div className="flex md:hidden items-center space-x-2">
                {/* Mobile Language Indicator */}
                <button
                  onClick={handleLanguageToggle}
                  className="p-2 text-gray-600 hover:text-black transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label={`Change language to ${language === 'ko' ? 'English' : '한국어'}`}
                >
                  <Languages className="w-5 h-5" />
                </button>

                {/* Mobile User Icon */}
                <button
                  className="p-2 text-gray-600 hover:text-black transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="User account"
                >
                  <UserCircle className="w-5 h-5" />
                </button>

                {/* Animated Hamburger */}
                <AnimatedHamburger
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
