"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Call once to set initial state
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0  w-full z-10  transition-colors duration-300 ${
        scrolled
          ? "bg-navy-900 shadow-md"
          : "bg-gradient-to-r from-navy-900 via navy-900 via-slate-800 to-slate-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              BookVerse
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link
                href="#"
                className="text-white hover:text-white/80 transition-colors"
              >
                Home
              </Link>
              <Link
                href={routes.explore}
                className="text-white/80 hover:text-white transition-colors"
              >
                Materials
              </Link>
              <Link
                href="#"
                className="text-white/80 hover:text-white transition-colors"
              >
                Textbooks
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
              <Input
                type="search"
                placeholder="Search books..."
                className="w-[200px] lg:w-[300px] pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus-visible:ring-white/30"
              />
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              Sign In
            </Button>
            <Button className="bg-navy-700 text-white hover:bg-navy-800">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
