import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Header from "./Header";
import { routes } from "@/lib/routes";

export default function Hero() {
  return (
    <div className=" flex flex-col">
      {/* Hero Section with Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-slate-800 to-slate-900">
          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-slate-700/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-navy-800/20 rounded-full filter blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative ">
          {/* <p className="text-2xl font-bold">Inspiration Meets Organization.</p> */}

          <div className="max-w-3xl mx-auto text-center py-8 md:py-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your World of Knowledge,{" "}
              <span className=" text-white md:text-transparent bg-clip-text md:bg-gradient-to-r from-gray-200 to-white bg-transparent">
                Digitized
              </span>
            </h1>
            <p className="md:text-xl text-white/90 mb-8 text-base">
              Curate your learning journey. Discover resources in our
              comprehensive digital library.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-navy-700 text-white hover:bg-navy-800"
              >
                <Link href={routes.explore}>Get Started</Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="border-white/20 bg-slate-400 text-white hover:bg-white/10"
              >
                <Link href={routes.explore}> Explore Collection</Link>
              </Button>
            </div>
            <p className="text-slate-300 text-sm py-4">
              Your ideas deserve a home. ✨
            </p>
            {/*gemini AIzaSyDRomnBdo2UiYLrtf6tWWYyJLpqmuUX63M */}
            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">10K+</p>
                <p className="text-white/80">Materials</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">5K+</p>
                <p className="text-white/80">Textbooks</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-white/80">Departments</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">100K+</p>
                <p className="text-white/80">Readers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
