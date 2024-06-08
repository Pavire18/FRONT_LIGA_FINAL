import "./MatchList.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import teamLogo from "../../assets/team_logo.png";
import { MatchDayResponse } from "../../models/MatchDay";
import { MatchResponse } from "../../models/Match";

const MatchList = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  const [matchData, setMatchData] = useState<MatchResponse[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/matchDay?limit=30", {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        const matches: MatchResponse[] = [];
        data.data.map((jornada: MatchDayResponse) => {
          const filteredMatches = jornada.matches.filter((match) => match.team1._id === authInfo.userInfo?.team?._id || match.team2._id === authInfo.userInfo?.team?._id);
          matches.push(...filteredMatches);
          return filteredMatches;
        });
        setMatchData(matches);
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="match">
      <div className="match__title">
        <p>PARTIDOS</p>
      </div>
      {matchData.map((match, index) => (
        <div key={index} className="match-list">
          <div className="match-list__block">
            <div className="match-list__team">
              <p className="match-list__text">{match.team1.alias}</p>
              <img src={teamLogo} className="match-list__image"></img>
            </div>
            <p className="match-list__result">{match.matchPlayed ? match.goalsTeam1.toString() + "-" + match.goalsTeam2.toString() : "NO DISPUTADO"}</p>
            <div className="match-list__team">
              <img src={teamLogo} className="match-list__image"></img>
              <p className="match-list__text">{match.team2.alias}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
