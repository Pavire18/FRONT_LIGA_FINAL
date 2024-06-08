import { UserResponse } from "./User";

export interface TeamCreate {
  name: string;
  alias: string;
  delegate: string;
  players: string[];
}

export interface TeamResponse {
  _id: string;
  name: string;
  alias: string;
  delegate: UserResponse;
  players: UserResponse[];
}
