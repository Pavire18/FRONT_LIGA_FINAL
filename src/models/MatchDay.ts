import { MatchResponse } from "./Match";

export interface MatchCreate {
  matches: MatchResponse[];
  matchDate: Date;
}

export interface MatchDayResponse {
  _id: string;
  matches: MatchResponse[];
  matchDate: Date;
}
