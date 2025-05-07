import Link from "next/link";
import React from "react";

export default function FooterLinks() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                New Releases
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Materials
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Textbooks
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Book Clubs
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Reading Challenges
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Pharmacology
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Pharmacognosy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Science
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Microbiology
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Pharmaceutics
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Account</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Login
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                My Library
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Reading History
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Preferences
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Partners
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Press
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Copyright
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white text-sm">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
