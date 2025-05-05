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
import { Timestamp } from "firebase/firestore"; // Ensure this matches your Firebase setup
import { useModal } from "@/zustand/modalStore";
import ViewTextbookModal from "./ViewTextbookModal";
import { convertTimestamp } from "@/lib/utils";
import ConfirmDeleteModal from "./DeleteTextbookModal";
import EditTextbookModal from "./EditTextbookModal";

const statusBadgeColors: Record<string, string> = {
  published: "bg-green-100 text-green-800 hover:bg-green-200",
  draft: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  review: "bg-blue-100 text-blue-800 hover:bg-blue-200",
};

export const columns = (
  openModal: (type?: string, data?: React.ReactNode) => void
): Column<IGetTextBook & { id: string }>[] => [
  {
    key: "cover",
    label: "Cover",
    render: (item) => (
      <div className="relative h-10 w-10  rounded-md overflow-hidden border border-gray-200">
        <Image
          src={item.cover || "/placeholder.svg"}
          alt={item.title}
          fill
          sizes="40"
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
        {<p>{item.isbn}</p>} {item.edition && <p>{item.edition} Edition</p>}
      </div>
    ),
  },

  {
    key: "faculty",
    label: "Faculty",
    render: (item) => (
      <div>
        <p className="font-semibold">{item.faculty}</p>
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
    render: (item) => <p>{convertTimestamp(item.created_at)}</p>,
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
            <p
              onClick={() =>
                openModal("edit", <ViewTextbookModal textbook={item} />)
              }
              className="flex items-center cursor-pointer"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <p
              onClick={() =>
                openModal("edit", <EditTextbookModal textbook={item} />)
              }
              className="flex items-center cursor-pointer"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={() =>
              openModal("edit", <ConfirmDeleteModal textbook={item} />)
            }
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              openModal("edit", <ConfirmDeleteModal textbook={item} />)
            }
            className="text-red-600 focus:text-red-600 flex items-center cursor-pointer"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
