import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMaterial } from "@/api/react-query/material";
import { useGetTextBooks } from "@/api/react-query/textbook";
import { useSearchParams } from "next/navigation";
import { showinfo } from "@/lib/toast";
import { IGetMaterial, IGetTextBook } from "@/lib/types";

interface BookCardProps {
  book: IGetTextBook & { id: string };
  view: "grid" | "list";
  type: "material" | "textbook";
}

export default function SearchTextbookCard({
  book,
  view,
  type,
}: BookCardProps) {
  if (!book) return null;
  const search = useSearchParams().get("search") || "";
  const { data, isPending } = useGetMaterial();
  const material = data || [];
  const textbook = data || [];
  const { data: textbookData, isPending: textbookPending } = useGetTextBooks();

  const filterMaterials = material.filter((item) =>
    item.topic.toLowerCase().includes(search?.trim().toLowerCase())
  );
  const textbookMaterials = textbook.filter((item) =>
    item.course_title.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <div
      className={cn(
        "bg-gray-100 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] border",
        view === "list" && "flex"
      )}
    >
      <div
        className={cn(
          view === "grid"
            ? "w-full h-36 relative"
            : "w-24 h-36 sm:w-32 sm:h-48 relative flex-shrink-0"
        )}
      >
        <Image
          src={book.cover || "/placeholder.svg"}
          alt={`Cover of ${book.title}`}
          fill
          className="object-cover"
        />
      </div>
      <div className={cn("p-4", view === "list" && "flex-1")}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-white line-clamp-1">
              {book.title}
            </h3>
            <p className="text-gray-400">{book.author}</p>
          </div>
          <div className="flex items-center bg-blue-900 px-2 py-1 rounded text-xs text-white">
            <Star className="h-3 w-3 mr-1 fill-white" />
            {4.5}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
            {book.department}
          </span>
          <span className="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
            {book.academic_level} Level
          </span>
        </div>
        {view === "list" && (
          <p className="mt-2 text-gray-400 text-sm hidden md:block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        )}
        <button className="mt-3 w-full bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
