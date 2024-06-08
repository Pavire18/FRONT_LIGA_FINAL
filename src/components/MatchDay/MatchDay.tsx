import { useEffect, useState } from "react";
import "./MatchDay.scss";
import { MatchDayResponse } from "../../models/MatchDay";
import teamLogo from "../../assets/team_logo.png";

const MatchDay = (): JSX.Element => {
  const [matchData, setMatchData] = useState<MatchDayResponse[]>([]);
  const [currentMatchDay, setCurrentMatchDay] = useState<MatchDayResponse>();
  const [currentIndex, setCurrentIndex] = useState(0);
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
        setMatchData(data.data);
        setCurrentMatchDay(data.data[0]);
        setCurrentIndex(0);
        console.log(data.data[0]);
      })
      .catch((error) => {
        console.error(error);
        // Handle error gracefully
      });
  }, []);

  const goNextMatchDay = (): void => {
    if (currentIndex !== matchData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentMatchDay(matchData[currentIndex + 1]);
    }
  };

  const goPreviusMatchDay = (): void => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentMatchDay(matchData[currentIndex - 1]);
    }
  };

  return (
    <div className="matchday-card">
      <div className="matchday-card__header">
        <div className="matchday-card__title">
          <p>CLASIFICACIÓN</p>
        </div>
        <div className="matchday-card__labels">
          <input type="button" value="<" onClick={goPreviusMatchDay} className="matchday-card__btn"/>
          <p>JORNADA {currentIndex + 1}</p>
          <input type="button" value=">" onClick={goNextMatchDay} className="matchday-card__btn"/>
        </div>
      </div>
      {currentMatchDay?.matches.map((match, index) => (
        <div key={index} className="matchday-card-list">
          <div className="matchday-card-list__block">
            <div className="matchday-card-list__team">
              <p className="matchday-card-list__text">{match.team1.alias}</p>
              <img src={teamLogo} className="matchday-card-list__image"></img>
            </div>
            <p className="matchday-card-list__result">{match.matchPlayed ? match.goalsTeam1.toString() + "-" + match.goalsTeam2.toString() : "NO DISPUTADO"}</p>
            <div className="matchday-card-list__team">
              <img src={teamLogo} className="matchday-card-list__image"></img>
              <p className="matchday-card-list__text">{match.team2.alias}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchDay;
