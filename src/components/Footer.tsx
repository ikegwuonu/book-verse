import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-2">
              Ready to expand your literary horizons?
            </h2>
            <p className="text-gray-300 mb-4">
              Join thousands of readers who discover new books, track their
              reading progress, and connect with fellow book lovers through
              BookVerse's digital library platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 max-w-xs"
              />
              <Button className="bg-white text-navy-900 hover:bg-white/90">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-orange-600"></div>
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full w-0.5 bg-navy-900"
                    style={{ transform: `rotate(${i * 22.5}deg)` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-white/10" />

      {/* Links Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Audiobooks
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Book Clubs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Reading Challenges
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Non-Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Science Fiction
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Mystery & Thriller
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Biography
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  My Library
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Reading History
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Preferences
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Copyright
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-navy-900 border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-xl font-bold mr-2">BookVerse</span>
              <span className="text-sm text-gray-400">
                © 2025 All rights reserved
              </span>
            </div>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
