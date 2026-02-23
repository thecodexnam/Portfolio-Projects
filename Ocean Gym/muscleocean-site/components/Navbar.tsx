'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Transformations', href: '/transformations' },
    { name: 'Gym', href: '/gym' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto pl-6 pr-4 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity gap-3"
          >
            <div className="text-2xl sm:text-3xl font-black tracking-tight">
              <span className="text-white">MUSCLE</span>
              <span className="gradient-text ml-2">OCEAN</span>
            </div>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-ocean-blue font-medium transition-colors text-sm lg:text-base px-1 py-2 whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="relative overflow-hidden bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-bold text-sm lg:text-base whitespace-nowrap ml-2 lg:ml-4 border border-white/20 shadow-lg shadow-ocean-blue/25 hover:shadow-xl hover:shadow-ocean-blue/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 hover:border-white/30"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Apply Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden glass border-t border-white/10 overflow-hidden transition-all duration-200 ease-out ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-ocean-blue hover:bg-white/5 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-4 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo text-white border border-white/20 shadow-lg shadow-ocean-blue/25 active:scale-[0.98] transition-transform"
          >
            Apply Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
