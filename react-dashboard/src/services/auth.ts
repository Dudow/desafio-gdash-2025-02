import { AuthResponse } from "@/types/auth";
import api from "./api";
import { User } from "@/types/user";
import axios from "axios";

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/users/login", {
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.response?.data?.message || "Login Error",
          status: error.response?.status,
        };
      } else if (error instanceof Error) {
        throw {
          message: error.message || "Login Error",
        };
      } else {
        console.error();

        throw {
          message: "Unknown error:",
          error,
        };
      }
    }
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/users", data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/users/me");

    return response.data;
  },

  logout(): void {
    localStorage.removeItem("token");
  },
};
