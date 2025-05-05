"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { adminRoutes } from "@/lib/routes";
import CustomTable from "@/components/CustomTable";
import { columns } from "./columns";
import { useGetTextBooks } from "@/api/react-query/textbook";
import { useModal } from "@/zustand/modalStore";

export default function TextbooksPage() {
  const { openModal } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending } = useGetTextBooks();
  const textbooks = data || [];
  // Get unique Faculty for filter
  const faculty = Array.from(
    new Set(textbooks?.map((book) => book.faculty)) || []
  );
  const itemsPerPage = 5;
  // Filter textbooks based on search query, category filter, and status filter
  const filteredTextbooks = textbooks.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);

    const matchesCategory =
      categoryFilter === "" || book.faculty === categoryFilter;
    const matchesStatus = statusFilter === "" || book.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(textbooks.length / itemsPerPage);
  const paginatedTextbooks = textbooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto">
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
                <SelectItem value="all">All Faculty</SelectItem>
                {faculty.map((category) => (
                  <SelectItem key={category} value={category || "Empty"}>
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
      <CustomTable
        isLoading={isPending}
        column={columns(openModal)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItem={data?.length || 5}
        data={filteredTextbooks}
      />
    </div>
  );
}
