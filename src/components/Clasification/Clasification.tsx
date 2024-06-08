import "./Clasification.scss";
import teamLogo from "../../assets/team_logo.png";
import { useEffect, useState } from "react";

interface ClasificationData {
  teamName: string;
  pg: number;
  pp: number;
  pt: number;
}

const Clasification = (): JSX.Element => {
  const [clasficationData, setClasificationData] = useState<ClasificationData[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/league/clasification", {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setClasificationData(data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error gracefully
      });
  }, []);
  return (
    <div className="clasification-card">
      <div className="clasification-card__header">
        <div className="clasification-card__title">
          <p>CLASIFICACIÓN</p>
        </div>
        <div className="clasification-card__labels">
          <div className="clasification-card__column-group">
            <p>POS</p>
            <p>EQUIPO</p>
          </div>
          <div className="clasification-card__column-group">
            <p>PTS</p>
            <p>PG</p>
            <p>PP</p>
          </div>
        </div>
      </div>
      {clasficationData.map((team, index) => (
        <div key={index} className="clasification-card-list">
          <div className="clasification-card-list__block1">
            <div className="clasification-card-list__position">{index + 1}</div>
            <img src={teamLogo} className="clasification-card-list__image"></img>
            <p className="clasification-card-list__text">{team.teamName}</p>
          </div>
          <div className="clasification-card-list__block2">
            <p className="clasification-card-list__text">{team.pt}</p>
            <p className="clasification-card-list__text">{team.pg}</p>
            <p className="clasification-card-list__text">{team.pp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clasification;
