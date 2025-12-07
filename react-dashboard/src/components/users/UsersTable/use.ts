import { userService } from "@/services/user";
import { toast } from "sonner";

interface UseUsersTableProps {
  loadUsers: () => Promise<void>;
}

export const useUsersTable = ({ loadUsers }: UseUsersTableProps) => {
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

  return {
    handleDeleteUser,
  };
};
