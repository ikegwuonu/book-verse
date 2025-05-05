import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
export interface Column<T> {
  label: string;
  key: keyof T;
  render: (item: T) => React.ReactNode;
}

interface CustomTableProps<T> {
  column: Column<T>[];
  data: T[];
  isAction?: boolean;
  action?: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  totalItem: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const CustomTable = <T extends Record<string, any>>({
  column,
  data,
  isAction,
  action,
  currentPage,
  itemsPerPage = 5,
  totalItem,
  setCurrentPage,
}: CustomTableProps<T>) => {
  const totalPage = Math.ceil(totalItem / itemsPerPage);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-32">
      <div className="grid grid-cols-1 w-full">
        <Table className="min-w-[700px] whitespace-nowrap overflow-x-auto w-full">
          <TableHeader>
            <TableRow>
              {column.map((col, i) => (
                <TableHead key={`${i}`}>{col.label}</TableHead>
              ))}

              {/* <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((admin) => (
                <TableRow key={admin.id}>
                  {column.map((col) => (
                    <TableCell key={`cell-${String(col.key)}`}>
                      {col.render(admin)}{" "}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={column.length} className="h-24 text-center">
                  No admin found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPage > 0 && (
        <div className="flex items-center justify-between px-4 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalPage)}{" "}
            to {Math.min(currentPage * itemsPerPage, totalPage)} of {totalPage}{" "}
            rows
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
              Page {currentPage} of {totalPage}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPage))
              }
              disabled={currentPage === totalPage}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
