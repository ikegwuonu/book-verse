import { BookCategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// Sample data - in a real app, this would come from an API or database
const categories = [
  {
    id: "fiction",
    name: "Fiction",
    description: "Bestselling fiction books across various genres",
    books: [
      {
        id: "f1",
        title: "The Midnight Library",
        author: "Matt Haig",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "f2",
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "f3",
        title: "Project Hail Mary",
        author: "Andy Weir",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "f4",
        title: "The Four Winds",
        author: "Kristin Hannah",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "f5",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "f6",
        title: "The Last Thing He Told Me",
        author: "Laura Dave",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
    ],
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    description: "Thought-provoking non-fiction for curious minds",
    books: [
      {
        id: "nf1",
        title: "Atomic Habits",
        author: "James Clear",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "nf2",
        title: "Educated",
        author: "Tara Westover",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "nf3",
        title: "Sapiens",
        author: "Yuval Noah Harari",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "nf4",
        title: "Becoming",
        author: "Michelle Obama",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "nf5",
        title: "The Body Keeps the Score",
        author: "Bessel van der Kolk",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
    ],
  },
  {
    id: "sci-fi",
    name: "Science Fiction",
    description: "Explore new worlds and futuristic concepts",
    books: [
      {
        id: "sf1",
        title: "Dune",
        author: "Frank Herbert",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "sf2",
        title: "The Three-Body Problem",
        author: "Liu Cixin",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "sf3",
        title: "Neuromancer",
        author: "William Gibson",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "sf4",
        title: "Snow Crash",
        author: "Neal Stephenson",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "sf5",
        title: "The Fifth Season",
        author: "N.K. Jemisin",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
    ],
  },
  {
    id: "mystery",
    name: "Mystery & Thriller",
    description: "Page-turning suspense and intrigue",
    books: [
      {
        id: "m1",
        title: "The Silent Patient",
        author: "Alex Michaelides",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "m2",
        title: "Gone Girl",
        author: "Gillian Flynn",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "m3",
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "m4",
        title: "The Guest List",
        author: "Lucy Foley",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "m5",
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
    ],
  },
  {
    id: "biography",
    name: "Biography",
    description: "Fascinating lives and personal journeys",
    books: [
      {
        id: "b1",
        title: "Steve Jobs",
        author: "Walter Isaacson",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "b2",
        title: "Born a Crime",
        author: "Trevor Noah",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "b3",
        title: "The Code Breaker",
        author: "Walter Isaacson",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "b4",
        title: "A Promised Land",
        author: "Barack Obama",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
      {
        id: "b5",
        title: "Greenlights",
        author: "Matthew McConaughey",
        coverUrl: "/placeholder.svg?height=280&width=180",
      },
    ],
  },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Explore Our Collection
              </h1>
              <p className="text-lg text-white/80 mb-6">
                Discover thousands of books across various categories. From
                bestselling fiction to thought-provoking non-fiction, we have
                something for every reader.
              </p>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories and Books */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {categories.map((category) => (
                <BookCategorySection key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Reading Recommendations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                Personalized Reading Recommendations
              </h2>
              <p className="text-gray-600 mb-8">
                Create an account to get personalized book recommendations based
                on your reading history and preferences. Our AI-powered system
                learns what you love to read and suggests new titles you'll
                enjoy.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center text-navy-800 font-medium hover:text-navy-900"
              >
                Create your free account{" "}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
