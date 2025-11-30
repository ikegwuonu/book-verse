"use client";

import { useState } from "react";
import { Book, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BookCard from "@/components/BookCard";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useGetMaterial } from "@/api/react-query/material";
import { useGetTextBooks } from "@/api/react-query/textbook";
import { showinfo } from "@/lib/toast";
import SearchTextbookCard from "@/components/TextbookCard";
import DataLoading from "@/components/DataLoading";

// Mock data for books
const mockBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: "1925",
    genre: "Classic",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: "1960",
    genre: "Fiction",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    year: "1949",
    genre: "Dystopian",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
  },
  {
    id: "4",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: "1937",
    genre: "Fantasy",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
  },
  {
    id: "5",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: "1813",
    genre: "Romance",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.4,
  },
  {
    id: "6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: "1951",
    genre: "Coming-of-age",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.2,
  },
];

export default function BookSearch() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const search = useSearchParams().get("search") || "";
  const { data, isPending } = useGetMaterial();
  const { data: textbookData, isPending: textbookPending } = useGetTextBooks();
  const material = data || [];
  const textbook = textbookData || [];

  const filterMaterials = material.filter(
    (item) =>
      item.topic &&
      item.topic.toLowerCase().includes(search.trim().toLowerCase())
  );

  const filterTextbooks = textbook.filter(
    (item) =>
      item.title &&
      item.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Filter books based on search query and genre
  //   const filteredBooks = mockBooks.filter((book) => {
  //     const matchesSearch =
  //       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       book.author.toLowerCase().includes(searchQuery.toLowerCase());
  //     const matchesGenre =
  //       genre === "all" || book.genre.toLowerCase() === genre.toLowerCase();
  //     return matchesSearch && matchesGenre;
  //   });
  if (isPending || textbookPending) {
    <div className="min-h-full w-full">
      {" "}
      <DataLoading />
    </div>;
  }
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-gray-700 font-medium">Find valuable resources</p>
        </div>

        <div className="bg-gray-100 border p-6 rounded-lg shadow-lg mb-8">
          {/* <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-800"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-blue-800">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="dystopian">Dystopian</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="coming-of-age">Coming-of-age</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div> */}

          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              {filterMaterials.length + filterTextbooks.length}{" "}
              {filterMaterials.length + filterTextbooks.length === 1
                ? "book"
                : "books"}{" "}
              found
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setView("grid")}
                className={cn(
                  "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-400",
                  view === "grid" && "bg-blue-900 text-white hover:bg-blue-800"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setView("list")}
                className={cn(
                  "border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-400",
                  view === "list" && "bg-blue-900 text-white hover:bg-blue-800"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>

        {filterMaterials.length + filterTextbooks.length > 0 ? (
          <div
            className={cn(
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            )}
          >
            {filterMaterials.length > 0 &&
              filterMaterials.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  view={view}
                  type={"material"}
                />
              ))}
            {filterTextbooks.length > 0 &&
              filterTextbooks.map((book) => (
                <SearchTextbookCard
                  book={book}
                  type="textbook"
                  key={book.id}
                  view={view}
                />
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-blue-900">
              No books found
            </h3>
            <p className="mt-2 text-gray-400">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
