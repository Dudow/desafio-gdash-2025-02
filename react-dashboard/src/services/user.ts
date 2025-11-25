import { PaginatedResponse, PaginationParams } from "@/types/pagination";
import api from "./api";

import { User } from "@/types/user";

interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  role?: "admin" | "user";
}

interface UpdateUserDTO {
  email?: string;
  name?: string;
  role?: "admin" | "user";
}

export const userService = {
  async getUsers(params: PaginationParams): Promise<PaginatedResponse<User>> {
    const response = await api.get<PaginatedResponse<User>>("/users", {
      params,
    });
    return response.data;
  },

  async getUserById(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async createUser(data: CreateUserDTO): Promise<User> {
    const response = await api.post<User>("/users", data);
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const response = await api.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
