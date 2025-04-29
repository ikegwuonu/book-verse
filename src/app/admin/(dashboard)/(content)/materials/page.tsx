"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { materials } from "@/lib/constant";
import { adminRoutes } from "@/lib/routes";

// Sample data for books

// Status badge colors
const statusBadgeColors: Record<string, string> = {
  available: "bg-green-100 text-green-800 hover:bg-green-200",
  borrowed: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  reserved: "bg-blue-100 text-blue-800 hover:bg-blue-200",
};

// Format badge colors
const formatBadgeColors: Record<string, string> = {
  Hardcover: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  Paperback: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  Ebook: "bg-cyan-100 text-cyan-200",
  Audiobook: "bg-pink-100 text-pink-800 hover:bg-pink-200",
};

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [formatFilter, setFormatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get unique genres and formats for filters
  const genres = Array.from(
    new Set(materials.map((material) => material.genre))
  );
  const formats = Array.from(
    new Set(materials.map((material) => material.format))
  );

  // Filter books based on search query, genre filter, format filter, and status filter
  const filteredBooks = materials.filter((material) => {
    const matchesSearch =
      searchQuery === "" ||
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.isbn.includes(searchQuery);

    const matchesGenre = genreFilter === "" || material.genre === genreFilter;
    const matchesFormat =
      formatFilter === "" || material.format === formatFilter;
    const matchesStatus =
      statusFilter === "" || material.status === statusFilter;

    return matchesSearch && matchesGenre && matchesFormat && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to render star rating
  const renderRating = (rating: number, book: any) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        <div className="flex mr-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < fullStars
                  ? "text-yellow-500 fill-yellow-500"
                  : i === fullStars && hasHalfStar
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
        <span className="text-xs text-gray-500 ml-1">({book.reviews})</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <Book className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Books</h1>
            <p className="text-gray-600">
              Manage books in your digital library
            </p>
          </div>
        </div>
        <Button asChild className="bg-navy-800 hover:bg-navy-900">
          <Link href={adminRoutes.addMaterial}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="pl-9"
            />
          </div>
          <div>
            <Select
              value={genreFilter}
              onValueChange={(value) => {
                setGenreFilter(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Genre" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={formatFilter}
              onValueChange={(value) => {
                setFormatFilter(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <Book className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Format" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBooks.length > 0 ? (
                paginatedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="relative h-20 w-16 rounded-md overflow-hidden border border-gray-200">
                        <Image
                          src={book.coverUrl || "/placeholder.svg"}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px]">
                      <div className="truncate" title={book.title}>
                        {book.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {book.publisher}, {book.publicationYear}
                      </div>
                      <div className="text-xs text-gray-500">
                        {book.pages} pages • {book.language}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      <div className="truncate" title={book.author}>
                        {book.author}
                      </div>
                    </TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          formatBadgeColors[book.format] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {book.format}
                      </Badge>
                    </TableCell>
                    <TableCell>{renderRating(book.rating, book)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          statusBadgeColors[book.status] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {book.status.charAt(0).toUpperCase() +
                          book.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/books/${book.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/books/edit/${book.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600 flex items-center cursor-pointer">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No books found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredBooks.length > 0 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredBooks.length
              )}{" "}
              to {Math.min(currentPage * itemsPerPage, filteredBooks.length)} of{" "}
              {filteredBooks.length} books
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
