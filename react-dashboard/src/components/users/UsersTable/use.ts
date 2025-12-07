import { userService } from "@/services/user";
import axios from "axios";
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast("User delete error", {
          description: error.message,
        });
      } else if (error instanceof Error) {
        toast("Error", {
          description: error.message,
        });
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return {
    handleDeleteUser,
  };
};
