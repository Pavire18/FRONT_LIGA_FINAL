import { TeamResponse } from "./Team";
import { UserResponse } from "./User";

export interface MatchCreate {
  team1: string;
  team2: string;
  goalsTeam1: number;
  goalsTeam2: number;
  matchPlayed: boolean;
  winner: string | null;
}

export interface MatchResponse {
  _id: string;
  team1: TeamResponse;
  team2: TeamResponse;
  goalsTeam1: number;
  goalsTeam2: number;
  matchPlayed: boolean;
  winner: UserResponse | null;
}
