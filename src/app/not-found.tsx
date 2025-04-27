import { Button } from "@/components/ui/button";

import Link from "next/link";
import { BookX, Home, Search } from "lucide-react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="container max-w-6xl px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-100 text-navy-900">
                <BookX size={32} />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-navy-900">
                Page not found
              </h1>
              <p className="text-xl text-gray-600">
                Sorry, we couldn't find the page you're looking for. It might
                have been moved, deleted, or never existed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-navy-800 hover:bg-navy-900"
                >
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-navy-200 text-navy-800"
                >
                  <Link href="/contact">
                    <Search className="mr-2 h-4 w-4" />
                    Search Books
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-white"></div>
                <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white"></div>
              </div>
              <div className="text-center text-white p-8">
                <div className="text-9xl font-bold mb-4">404</div>
                <div className="text-xl">
                  The page you're looking for is missing
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
