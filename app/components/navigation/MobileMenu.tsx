'use client';

import { motion } from 'framer-motion';
import { Globe, User, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ name: string; href: string }>;
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const handleNavClick = (href: string) => {
    onClose();
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-80 p-0 bg-white/95 backdrop-blur-lg border-l border-gray-200"
      >
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-gray-900">
              Navigation
            </SheetTitle>
            <SheetClose asChild>
              <button
                className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <motion.nav
            className="px-6 py-2 flex-1"
            variants={containerVariants}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  variants={itemVariants}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left py-4 px-4 rounded-lg text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 active:scale-[0.98]"
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.nav>

          <Separator className="mx-6" />

          {/* Language & Auth Section */}
          <motion.div
            className="px-6 py-6 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
          >
            {/* Language Switcher */}
            <motion.button
              variants={itemVariants}
              className="w-full flex items-center space-x-3 py-3 px-4 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-gray-600" />
              </div>
              <span className="font-medium">Language: English</span>
            </motion.button>

            {/* Sign In Button */}
            <motion.button
              variants={itemVariants}
              className="w-full flex items-center space-x-3 py-3 px-4 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
              whileTap={{ scale: 0.98 }}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gray-100">
                  <User className="w-4 h-4 text-gray-600" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">Sign In</span>
            </motion.button>

            {/* Sign Up Button */}
            <motion.button
              variants={itemVariants}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 active:scale-[0.98]"
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}