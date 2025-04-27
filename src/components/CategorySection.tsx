"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  books: Book[];
}

interface BookCategorySectionProps {
  category: Category;
}

export function BookCategorySection({ category }: BookCategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approximate width of a book card + margin
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">{category.name}</h2>
          <p className="text-gray-600">{category.description}</p>
        </div>
        <Link
          href={`/category/${category.id}`}
          className="text-navy-700 hover:text-navy-900 font-medium text-sm flex items-center"
        >
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="relative group">
        {/* Scroll buttons */}
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border-gray-200 -ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
        )}

        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md border-gray-200 -mr-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        )}

        {/* Scrollable book container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
          onScroll={checkScrollButtons}
        >
          {category.books.map((book) => (
            <div key={book.id} className="min-w-[180px] max-w-[180px]">
              <Link href={`/book/${book.id}`} className="block group/book">
                <div className="relative aspect-[2/3] rounded-md overflow-hidden shadow-md transition-transform group-hover/book:scale-105 group-hover/book:shadow-lg">
                  <Image
                    src={book.coverUrl || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 font-medium text-navy-800 line-clamp-1 group-hover/book:text-navy-900">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
