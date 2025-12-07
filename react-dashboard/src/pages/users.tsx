import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { userService } from "@/services/user";
import { User } from "@/types/user";
import { PaginationParams } from "@/types/pagination";
import UsersModal from "@/components/users/UsersModal";
import UsersTable from "@/components/users/UsersTable";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const params: PaginationParams = { page, limit: 10 };
      const response = await userService.getUsers(params);
      setUsers(response.data);
      setTotalPages(response.totalPages);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast("User loading error", {
          description: error.message,
        });
      } else if (error instanceof Error) {
        toast("Error", {
          description: error.message,
        });
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
    } else {
      setEditingUser(null);
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            New user
          </Button>
        </div>

        <UsersTable
          loadUsers={loadUsers}
          users={users}
          loading={loading}
          handleOpenDialog={handleOpenDialog}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />

        <UsersModal
          editingUser={editingUser}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          loadUsers={loadUsers}
        />
      </div>
    </div>
  );
}
