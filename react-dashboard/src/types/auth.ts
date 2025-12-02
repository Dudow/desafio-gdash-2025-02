import { User } from "./user";

export interface AuthResponse {
  jwtToken: string;
  user: User;
}
