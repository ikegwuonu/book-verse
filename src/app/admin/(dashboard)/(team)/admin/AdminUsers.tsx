"use client";
import React, { useContext } from "react";
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
  ChevronLeft,
  ChevronRight,
  Edit,
  Filter,
  MoreHorizontal,
  Search,
  Trash2,
  UserPlus,
  Users,
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
import Header from "@/components/Header";
import { AdminSidebar } from "@/components/AdminSidebar";
import { admins } from "@/lib/constant";

// Role badge colors
const roleBadgeColors: Record<string, string> = {
  "super-admin": "bg-red-100 text-red-800 hover:bg-red-200",
  "content-manager": "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "user-manager": "bg-amber-100 text-amber-800 hover:bg-amber-200",
  "analytics-viewer": "bg-green-100 text-green-800 hover:bg-green-200",
};

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter admins based on search query and role filter
  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch =
      searchQuery === "" ||
      `${admin.firstName} ${admin.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "" || admin.roleId === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="pl-9"
            />
          </div>
          <div className="w-full md:w-64">
            <Select
              value={roleFilter}
              onValueChange={(value) => {
                setRoleFilter(value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Filter by role" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super-admin">Super Admin</SelectItem>
                <SelectItem value="content-manager">Content Manager</SelectItem>
                <SelectItem value="user-manager">User Manager</SelectItem>
                <SelectItem value="analytics-viewer">
                  Analytics Viewer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 w-full">
              <Table
                variant="retro"
                className="min-w-[700px] whitespace-nowrap overflow-x-auto w-full" */}
      {/* Admin Table */}
      <
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-32">
        <div className="grid grid-cols-1 w-full">
          <Table className="min-w-[700px] whitespace-nowrap overflow-x-auto w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAdmins.length > 0 ? (
                paginatedAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={admin.image || "/placeholder.svg"}
                          alt={`hh`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {admin.firstName} {admin.lastName}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {admin.firstName} {admin.lastName}
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          roleBadgeColors[admin.roleId] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(admin.dateAdded, "MMM d, yyyy")}
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
                              href={`/admin/users/edit/${admin.id}`}
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
                  <TableCell colSpan={6} className="h-24 text-center">
                    No administrators found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredAdmins.length > 0 && (
          <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Showing{" "}
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredAdmins.length
              )}{" "}
              to {Math.min(currentPage * itemsPerPage, filteredAdmins.length)}{" "}
              of {filteredAdmins.length} admins
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
    </>
  );
};

export default AdminUsers;
