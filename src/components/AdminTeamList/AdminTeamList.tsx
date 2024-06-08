import "./AdminTeamList.scss";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../App";
import teamLogo from "../../assets/team_logo.png";
import { TeamCreate, TeamResponse } from "../../models/Team";
import { UserResponse } from "../../models/User";
import { AuthContext } from "../../App";

const AdminTeamList = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [delegates, setDelegates] = useState<UserResponse[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const aliasRef = useRef<HTMLInputElement>(null);
  const [selectedDelegate, setSelectedDelegate] = useState("");

  const handleSelect = (event: any): void => {
    const value = event.target.value;
    setSelectedDelegate(value);
  };

  useEffect(() => {
    fetch("http://localhost:3000/team?limit=30", {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setTeams(data.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error gracefully
      });

    fetch("http://localhost:3000/user/role/DELEGADO", {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setDelegates(data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error gracefully
      });
  }, []);

  const doTeamCreateRequest = (team: TeamCreate): void => {
    fetch("http://localhost:3000/team", {
      method: "POST",
      body: JSON.stringify(team),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${authInfo.userToken as string}`,
      },
    })
      .then(async (response) => {
        if (response.status !== 201) {
          alert("Registro incorrecto");
        }
        return await response.json();
      })
      .then((data) => {
        console.log(data);
        setTeams([...teams, data]);
      })
      .catch((error) => {
        console.error(error);
        alert("Ha ocurrido un error en la petición");
      });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const createInfo: TeamCreate = {
      name: nameRef?.current?.value as string,
      alias: aliasRef?.current?.value as string,
      delegate: selectedDelegate,
      players: [selectedDelegate]
    };

    doTeamCreateRequest(createInfo);
    if (nameRef.current && aliasRef.current) {
      nameRef.current.value = "";
      aliasRef.current.value = "";
    }
  };

  return (
    <div className="admin-team">
      <div className="team-list">
        <div className="team-list__header">
          <div className="team-list__columns">
            <p>NOMBRE</p>
            <p>ALIAS</p>
            <p>DELEGADO</p>
          </div>
          <div className="team-list__title">
            <p>EQUIPOS</p>
          </div>
        </div>
        {teams?.map((team, index) => (
          <div key={index} className="team-list__data">
            <div className="team-list__team">
              <p>{team.name}</p>
              <p>{team.alias}</p>
              <p>
                {team.delegate.name} {team.delegate.lastName}
              </p>
            </div>
            <div className="team-list__actions">
              <a
                className="team-list__link"
                onClick={() => {
                  // deleteTeam(player);
                }}
              >
                JUGADORES
              </a>
              <a
                className="team-list__link"
                onClick={() => {
                  // deleteTeam(player);
                }}
              >
                EDITAR
              </a>
              <a
                className="team-list__link2"
                onClick={() => {
                  // deleteTeam(player);
                }}
              >
                ELIMINAR
              </a>
            </div>

            <img src={teamLogo} alt="" className="team-list__team-image" />
          </div>
        ))}
      </div>
      <div className="team-list">
        <div className="team-list__data">
          <form onSubmit={submitForm} className="team-list__team">
            <input type="text" name="name" ref={nameRef} id="name" />
            <input type="text" name="alias" ref={aliasRef} id="alias" />
            <select value={selectedDelegate} onChange={handleSelect}>
              <option value="" disabled>
                Select a delegate
              </option>
              {delegates?.map((delegate, index) => (
                <option key={index} value={delegate._id}>
                  {delegate.name} {delegate.lastName}
                </option>
              ))}
            </select>
            <input className="team-list__link2" type="submit" value="AÑADIR"></input>
          </form>
          <img src={teamLogo} alt="" className="team-list__team-image" />
        </div>
      </div>
    </div>
  );
};

export default AdminTeamList;
