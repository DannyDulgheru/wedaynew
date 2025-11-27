"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-rose-500" fill="currentColor" />
            <span className="text-2xl font-bold font-playfair bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Weday
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Caracteristici
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Cum funcționează
            </Link>
            <Link
              href="#templates"
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Template-uri
            </Link>
            <Link
              href="#pricing"
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Prețuri
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-rose-500 transition-colors"
            >
              Autentificare
            </Link>
            <Link
              href="/auth/register"
              className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all"
            >
              Începe Acum
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="#features"
              className="block text-gray-700 hover:text-rose-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Caracteristici
            </Link>
            <Link
              href="#how-it-works"
              className="block text-gray-700 hover:text-rose-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cum funcționează
            </Link>
            <Link
              href="#templates"
              className="block text-gray-700 hover:text-rose-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Template-uri
            </Link>
            <Link
              href="#pricing"
              className="block text-gray-700 hover:text-rose-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Prețuri
            </Link>
            <Link
              href="#contact"
              className="block text-gray-700 hover:text-rose-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/auth/login"
              className="block text-gray-700 hover:text-rose-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Autentificare
            </Link>
            <Link
              href="/auth/register"
              className="block text-center bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2.5 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              Începe Acum
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
