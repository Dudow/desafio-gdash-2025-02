import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Plus, Edit, Trash2 } from "lucide-react";
import { userService } from "@/services/user";
import { User } from "@/types/user";
import { PaginationParams } from "@/types/pagination";
import Pagination from "@/components/pagination";
import UsersModal from "@/components/users/UsersModal";

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
    } catch (error: any) {
      toast("User loading error", {
        description: error.message,
      });
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

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    try {
      await userService.deleteUser(id);
      toast("User deleted!");
      loadUsers();
    } catch (error: any) {
      toast("User delete error", {
        description: error.message,
      });
    }
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

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (users ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No user found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.createdAt &&
                          new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(user)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              loading={loading}
            />
          </CardContent>
        </Card>

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
