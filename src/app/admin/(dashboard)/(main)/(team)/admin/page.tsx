import { Button } from "@/components/ui/button";

import { UserPlus, Users } from "lucide-react";
import Link from "next/link";
import AdminUsers from "./AdminUsers";
import { adminRoutes } from "@/lib/routes";

export default function AdminUsersPage() {
  return (
    <main className="flex-1 bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto w-fit">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-navy-800" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Admin Users</h1>
              <p className="text-gray-600">
                Manage administrator accounts and permissions
              </p>
            </div>
          </div>
          <Button asChild className="bg-navy-800 hover:bg-navy-900">
            <Link href={adminRoutes.addAdmin}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Admin
            </Link>
          </Button>
        </div>
        <AdminUsers />
      </div>
    </main>
  );
}
