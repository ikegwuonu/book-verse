"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Book {
  id: number;
  title: string;
  logo: string;
}

export function InfiniteBookScroll() {
  // Sample book logos - in a real app, you would fetch these from an API
  const books: Book[] = [
    {
      id: 2,
      title: "PCH",
      logo: "/PCH.jpg",
    },

    {
      id: 4,
      title: "PCT",
      logo: "/PCT.jpg",
    },
    {
      id: 5,
      title: "PMB",
      logo: "/PMB.jpg",
    },
  ];

  // Duplicate books to create seamless loop
  const allBooks = [...books];

  // Control animation speed
  const [animationDuration, setAnimationDuration] = useState(30);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Adjust animation speed based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Slower on mobile, faster on desktop
      setAnimationDuration(width < 768 ? 40 : 30);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-100 py-8">
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex animate-scroll"
          style={{
            animationDuration: `${animationDuration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {allBooks.map((book, index) => (
            <div
              key={`${book.id}-${index}`}
              className="flex  items-center mx-8 min-w-[100px]"
            >
              <div className="relative    transition-transform hover:scale-105">
                <Image
                  src={book.logo || "/cons-96.svg"}
                  alt={book.title}
                  width={230}
                  height={70}
                  className="object-cover grayscale"
                />
              </div>
              <p className="mt-2 text-sm text-navy-800 font-medium text-center  ">
                {book.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
