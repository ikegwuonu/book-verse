import { Column } from "@/components/CustomTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { adminRoutes } from "@/lib/routes";
import { IGetTextBook } from "@/lib/types";
import { Download, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const statusBadgeColors: Record<string, string> = {
  published: "bg-green-100 text-green-800 hover:bg-green-200",
  draft: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  review: "bg-blue-100 text-blue-800 hover:bg-blue-200",
};
export const colums: Column<IGetTextBook & { id: string }>[] = [
  {
    key: "cover",
    label: "Cover",
    render: (item) => (
      <div className="relative h-20 w-16 rounded-md overflow-hidden border border-gray-200">
        <Image
          src={item.cover || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    key: "title",
    label: "Title",
    render: (item) => (
      <>
        <div className="truncate font-medium max-w-40" title={item.title}>
          {item.title}
        </div>
        <div className="text-xs text-gray-500 mt-1 " title={item.author}>
          {item.author}
        </div>
      </>
    ),
  },
  {
    key: "isbn",
    label: "ISBN",
    render: (item) => (
      <div>
        {<p>{item.isbn}</p>} {item.edition && <p>{item.edition}</p>}
      </div>
    ),
  },

  {
    key: "department",
    label: "Department",
    render: (item) => (
      <div>
        <p>{item.faculty}</p>
        <p>{item.department}</p>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <>
        <Badge
          className={
            statusBadgeColors[item.status] || "bg-gray-100 text-gray-800"
          }
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
        <p>{item.added_by}</p>
      </>
    ),
  },
  {
    key: "created_at",
    label: "Created At",
    render: (item) => (
      <>
        <p>{new Date(item.created_at).toLocaleDateString()}</p>
      </>
    ),
  },
  {
    key: "id",
    label: "Actions",
    render: (item) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={"/#"} className="flex items-center cursor-pointer">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/admin/textbooks/edit/${item.id}`}
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
    ),
  },
];
