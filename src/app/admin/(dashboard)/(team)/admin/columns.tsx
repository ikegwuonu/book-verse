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
import { IGetAdmin, IGetTextBook } from "@/lib/types";
import { convertTimestamp, roleMap } from "@/lib/utils";
import { Download, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ConfirmDeleteModal from "./DeleteAdminModal";

const roleBadgeColors: Record<string, string> = {
  "super-admin": "bg-red-100 text-red-800 hover:bg-red-200",
  "content-manager": "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "user-manager": "bg-amber-100 text-amber-800 hover:bg-amber-200",
  "analytics-viewer": "bg-green-100 text-green-800 hover:bg-green-200",
};
interface ColumnProps {
  openModal: (type?: string, data?: React.ReactNode) => void;
}
export const column = ({ openModal }: ColumnProps): Column<IGetAdmin>[] => [
  {
    key: "image",
    label: "Image",
    render: (admin) => (
      <div className="relative h-10 w-10 rounded-md overflow-hidden border border-gray-200">
        <Image
          src={admin.image || "/placeholder.svg"}
          alt={admin.first_name}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    key: "first_name",
    label: "Name",
    render: (admin) => (
      <>
        <p className="font-medium">
          {admin.first_name} {admin.last_name}
        </p>
      </>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (admin) => <p className=" max-w-40 truncate">{admin.email}</p>,
  },
  {
    key: "role",
    label: "Role",
    render: (admin) => (
      <Badge
        className={roleBadgeColors[admin.role] || "bg-gray-100 text-gray-800"}
      >
        {roleMap[admin.role]}
      </Badge>
    ),
  },

  {
    key: "created_at",
    label: "Date added",
    render: (admin) => <p>{convertTimestamp(admin.created_at)}</p>,
  },
  {
    key: "notes",
    label: "Action",
    render: (admin) => (
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
              href={`/admin/users/edit/${admin.email}`}
              className="flex items-center cursor-pointer"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              openModal("edit", <ConfirmDeleteModal admin={admin} />)
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
