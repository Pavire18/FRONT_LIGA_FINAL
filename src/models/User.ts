import { TeamResponse } from "./Team";

// const allowedRoles: string[] = ["JUGADOR", "DELEGADO", "ADMINISTRADOR"];

export interface UserCreate {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: string;
  image: string;
  team?: string;
}

export interface UserResponse {
  _id: string;
  team?: TeamResponse;
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: string;
  image: string;
}
