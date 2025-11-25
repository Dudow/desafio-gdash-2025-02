import { AuthResponse } from "@/types/auth";
import api from "./api";
import { User } from "@/types/user";

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },

  logout(): void {
    localStorage.removeItem("token");
  },
};
