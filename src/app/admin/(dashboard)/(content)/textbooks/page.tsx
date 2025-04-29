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
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { textbooks } from "@/lib/constant";
import { adminRoutes } from "@/lib/routes";

const statusBadgeColors: Record<string, string> = {
  published: "bg-green-100 text-green-800 hover:bg-green-200",
  draft: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  review: "bg-blue-100 text-blue-800 hover:bg-blue-200",
};

export default function TextbooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get unique categories for filter
  const categories = Array.from(
    new Set(textbooks.map((book) => book.category))
  );

  // Filter textbooks based on search query, category filter, and status filter
  const filteredTextbooks = textbooks.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);

    const matchesCategory =
      categoryFilter === "" || book.category === categoryFilter;
    const matchesStatus = statusFilter === "" || book.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTextbooks.length / itemsPerPage);
  const paginatedTextbooks = filteredTextbooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <BookOpen className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Textbooks</h1>
            <p className="text-gray-600">
              Manage textbooks in your digital library
            </p>
          </div>
        </div>
        <Button asChild className="bg-navy-800 hover:bg-navy-900">
          <Link href={adminRoutes.addTextbook}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Textbook
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
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
          <div className="w-full md:w-48">
            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                setCategoryFilter(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
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
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Textbooks Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Edition</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added By</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTextbooks.length > 0 ? (
                paginatedTextbooks.map((book) => (
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
                        {book.publisher}, {book.year}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px]">
                      <div className="truncate" title={book.author}>
                        {book.author}
                      </div>
                    </TableCell>
                    <TableCell>{book.edition}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.category}</TableCell>
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
                    <TableCell>{book.addedBy}</TableCell>
                    <TableCell>
                      {format(book.createdAt, "MMM d, yyyy")}
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
                              href={`/admin/textbooks/${book.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin/textbooks/edit/${book.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center cursor-pointer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
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
                  <TableCell colSpan={10} className="h-24 text-center">
                    No textbooks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredTextbooks.length > 0 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredTextbooks.length
              )}{" "}
              to{" "}
              {Math.min(currentPage * itemsPerPage, filteredTextbooks.length)}{" "}
              of {filteredTextbooks.length} textbooks
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
