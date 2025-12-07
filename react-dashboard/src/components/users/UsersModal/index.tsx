import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Dispatch, SetStateAction } from "react";
import { useUsersModal } from "./use";

interface UsersModalProps {
  isDialogOpen: boolean;
  editingUser: User | null;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  loadUsers: () => Promise<void>;
}

export default function UsersModal({
  isDialogOpen,
  editingUser,
  setIsDialogOpen,
  loadUsers,
}: UsersModalProps) {
  const { handleSaveUser, setFormData, formData } = useUsersModal({
    editingUser,
    setIsDialogOpen,
    loadUsers,
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingUser ? "Edit User" : "New User"}</DialogTitle>
          <DialogDescription>Fill user data</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          {!editingUser && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveUser}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
