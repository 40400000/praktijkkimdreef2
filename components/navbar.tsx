"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigationLinks = [
    { name: "Orthomoleculair", href: "/orthomoleculair" },
    { name: "Homeopathie", href: "/homeopathie" },
    { name: "Qest4", href: "/qest" },
  ];

  const dropdownItems = [
    { name: "Tarieven", href: "/tarieven" },
    { name: "Contact & over mij", href: "/contact" },
  ];

  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-0">
        <div className="flex justify-between items-center h-22 lg:h-22">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logopraktijkkimdreef.svg"
                alt="Praktijk Kim Dreef"
                width={500}
                height={200}
                className="h-24 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 text-lg font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Dropdown Menu */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-700 hover:text-gray-900 text-lg font-medium transition-colors duration-200 flex items-center"
              >
                Praktijkinformatie
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/afspraak-maken"
              className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Afspraak maken
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Dropdown Items */}
          <div className="border-t border-gray-100 pt-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Praktijkinformatie
            </div>
            {dropdownItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-6 py-2 text-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-4">
            <Link
              href="/afspraak-maken"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Afspraak maken
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
