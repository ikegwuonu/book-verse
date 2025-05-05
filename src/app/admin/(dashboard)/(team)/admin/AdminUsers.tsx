"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAdmin } from "@/api/react-query/admin";
import CustomTable from "@/components/CustomTable";
import { column } from "./columns";
import { useModal } from "@/zustand/modalStore";

const AdminUsers = () => {
  const itemsPerPage = 5;
  const { openModal } = useModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, data } = useGetAdmin();
  const admin = data || [];
  // Filter admins based on search query and role filter
  const filteredAdmins = admin.filter((admin) => {
    const matchesSearch =
      searchQuery === "" ||
      `${admin.first_name} ${admin.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "" || admin.role === roleFilter;

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
      <CustomTable
        isLoading={isPending}
        column={column({ openModal })}
        data={filteredAdmins}
        totalItem={admin.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default AdminUsers;
