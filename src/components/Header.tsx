"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsAuth } from "@/hooks/use-is-auth";
import useScreenSize from "@/hooks/use-screen-size";
import { adminRoutes, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useAdminFirebaseStore } from "@/zustand/adminFirebase";
import { useAdminProfileStore } from "@/zustand/adminProfile";
import { Slot } from "@radix-ui/react-slot";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const router = useRouter();
  const isAuth = useIsAuth();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { width } = useScreenSize();
  const { adminFirebaseStore } = useAdminFirebaseStore();
  const { adminStore } = useAdminProfileStore();
  const ref = useRef<null | HTMLInputElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && ref.current) {
      const searchQuery = ref.current.value.trim(); // Get the input value
      if (searchQuery) {
        router.push(`/search?search=${searchQuery}`);
      }
    }
  };
  return (
    <header
      className={`sticky top-0 w-full z-20 transition-colors duration-300 ${
        scrolled
          ? "bg-navy-900 shadow-md"
          : "bg-gradient-to-r from-navy-900 via navy-900 via-slate-800 to-slate-900"
      }`}
    >
      <div className="container mx-auto px-4 relative">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="text-2xl font-bold text-white">
              BookVerse
            </Link>
            <Button
              onClick={() => setNavOpen((prev) => !prev)}
              variant="outline"
              className="md:hidden ml-4 border-white/20 text-white bg-white/10 hover:text-white hover:bg-navy-700"
            >
              <Menu />
            </Button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Links */}
            <nav className="ml-10 space-x-8">
              <Link
                href={routes.home}
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
                href={routes.allTextbook}
                className="text-white/80 hover:text-white transition-colors"
              >
                Textbooks
              </Link>
            </nav>

            {/* Search & Auth */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
                <Input
                  onKeyDown={handleKeyPress}
                  type="search"
                  ref={ref}
                  placeholder="Search books..."
                  className="w-[200px] lg:w-[300px] pl-8 bg-white/10 border-white/20
                    text-white placeholder:text-white/70 focus-visible:ring-white/30"
                />
              </div>
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white bg-white/10 hover:text-white hover:bg-navy-700"
              >
                {adminStore && isAuth ? (
                  <Link href={adminRoutes.admin}>Dashboard</Link>
                ) : (
                  <Link href={routes.login}>Sign In</Link>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Nav (below top bar) */}
        {navOpen && width < 768 && (
          <div
            className={cn(
              " flex flex-col space-y-4 p-4 md:hidden fixed top-16 inset-x-0 z-10 transition-colors duration-300",

              scrolled
                ? "bg-navy-900 shadow-md"
                : "bg-gradient-to-r from-navy-900 via navy-900 via-slate-800 to-slate-900"
            )}
          >
            <nav className="flex flex-col space-y-2">
              <Link
                href={routes.home}
                onClick={() => setNavOpen((prev) => !prev)}
                className="text-white hover:text-white/80 transition-colors"
              >
                Home
              </Link>
              <Link
                href={routes.explore}
                onClick={() => setNavOpen((prev) => !prev)}
                className="text-white/80 hover:text-white transition-colors"
              >
                Materials
              </Link>
              <Link
                href={routes.explore}
                onClick={() => setNavOpen((prev) => !prev)}
                className="text-white/80 hover:text-white transition-colors"
              >
                Textbooks
              </Link>
            </nav>
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
                <Input
                  type="search"
                  placeholder="Search books..."
                  className="w-full pl-8 bg-white/10 border-white/20
                    text-white placeholder:text-white/70 focus-visible:ring-white/30"
                />
              </div>
              {!adminFirebaseStore.email && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white bg-white/10 hover:text-white hover:bg-navy-700"
                >
                  <Link
                    href={routes.login}
                    onClick={() => setNavOpen((prev) => !prev)}
                  >
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
