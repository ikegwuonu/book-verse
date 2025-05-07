"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Book,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { department, format } from "@/lib/constant";
import { adminRoutes } from "@/lib/routes";
import { useGetMaterial } from "@/api/react-query/material";
import CustomTable from "@/components/CustomTable";
import { columns } from "./columns";
import { useModal } from "@/zustand/modalStore";

export default function BooksPage() {
  const { openModal } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [formatFilter, setFormatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { data, isPending } = useGetMaterial();
  const material = data || [];

  // Get unique genres and formats for filters
  const departments = Array.from(new Set(department.map((item) => item.val)));
  const formats = Array.from(new Set(format.map((item) => item.val)));

  // Filter books based on search query, department filter, format filter, and status filter
  const filteredBooks = material.filter((material) => {
    const matchesSearch =
      searchQuery === "" ||
      material.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.lecturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.course_code.includes(searchQuery);

    const matchesdepartment =
      departmentFilter === "" || material.department === departmentFilter;
    const matchesFormat =
      formatFilter === "" || material.format === formatFilter;
    const matchesStatus =
      statusFilter === "" || material.status === statusFilter;

    return matchesSearch && matchesdepartment && matchesFormat && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <Book className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Materials</h1>
            <p className="text-gray-600">
              Manage materials in your digital library
            </p>
          </div>
        </div>
        <Button asChild className="bg-navy-800 hover:bg-navy-900">
          <Link href={adminRoutes.addMaterial}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Material
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by topic, lecturer, or Course code..."
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
              value={departmentFilter}
              onValueChange={(value) => {
                setDepartmentFilter(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Department" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {department.map((dpt) => (
                  <SelectItem key={dpt.val} value={dpt.val}>
                    {dpt.val}
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
                {format.map((format) => (
                  <SelectItem key={format.val} value={format.val}>
                    {format.label}
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
      <CustomTable
        totalItem={material.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        column={columns(openModal)}
        data={filteredBooks}
        isLoading={isPending}
      />
    </div>
  );
}
