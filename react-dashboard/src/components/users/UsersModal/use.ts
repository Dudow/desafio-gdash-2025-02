import { userService } from "@/services/user";
import { User } from "@/types/user";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface UseUsersModalProps {
  editingUser: User | null;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  loadUsers: () => Promise<void>;
}

export const useUsersModal = ({
  editingUser,
  setIsDialogOpen,
  loadUsers,
}: UseUsersModalProps) => {
  const handleSaveUser = async () => {
    try {
      if (editingUser) {
        await userService.updateUser(editingUser._id, {
          email: formData.email,
          name: formData.name,
        });
        toast("User updated!");
      } else {
        await userService.createUser(formData);
        toast("User created!");
      }
      setIsDialogOpen(false);
      loadUsers();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast("Error", {
          description: error.response?.data?.message || error.message,
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

  const [formData, setFormData] = useState({
    email: editingUser?.email ?? "",
    name: editingUser?.name ?? "",
    password: "",
  });

  return {
    handleSaveUser,
    setFormData,
    formData,
  };
};
