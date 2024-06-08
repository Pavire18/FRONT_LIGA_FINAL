import "./PlayerList.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import userPhoto from "../../assets/user-foto.png";
import { UserResponse } from "../../models/User";
import { TeamResponse } from "../../models/Team";

const PlayerList = (props: any): JSX.Element => {
  const authInfo = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserResponse | undefined>(authInfo.userInfo);
  const [userPlayers, setUserPlayers] = useState<UserResponse[] | undefined>(authInfo.userInfo?.team?.players);
  const [freePlayers, setFreePlayers] = useState<UserResponse[] | undefined>([]);

  const updateTeamRequest = (teamId: string, updatedTeam: TeamResponse, userSelected: UserResponse, tipoAccion: string): void => {
    if (!teamId) {
      alert("Team ID is missing. Cannot proceed with the update.");
      return;
    }

    const ruta = "http://localhost:3000/team/".concat(teamId);
    fetch(ruta, {
      method: "PUT",
      body: JSON.stringify(updatedTeam),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${authInfo.userToken as string}`,
      },
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        if (authInfo.userToken && authInfo.userInfo && authInfo.login) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Ha ocurrido un error en la petición");
      });
    let userUpdated = {};
    if (tipoAccion === "addUser") {
      userUpdated = {
        email: userSelected.email,
        name: userSelected.name,
        lastName: userSelected.lastName,
        role: userSelected.role,
        team: teamId,
      };
    } else {
      userUpdated = {
        email: userSelected.email,
        name: userSelected.name,
        lastName: userSelected.lastName,
        role: userSelected.role,
        team: null,
      };
    }

    const rutaUser = "http://localhost:3000/user/".concat(userSelected._id);
    console.log(rutaUser);
    fetch(rutaUser, {
      method: "PUT",
      body: JSON.stringify(userUpdated),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${authInfo.userToken as string}`,
      },
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((data) => {
        if (authInfo.userToken && authInfo.userInfo && authInfo.login) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Ha ocurrido un error en la petición");
      });
  };

  const deleteUser = (user: UserResponse): void => {
    const playersUpdated = userInfo?.team?.players.filter((item) => item._id !== user._id);
    if (playersUpdated && userInfo?.team) {
      const teamUpdated = {
        ...userInfo?.team,
        players: playersUpdated,
      };

      updateTeamRequest(userInfo.team._id, teamUpdated, user, "");
      if (!freePlayers) return;
      const freePlayersMod: UserResponse[] | undefined = [...freePlayers, user];
      setFreePlayers(freePlayersMod);
      setUserPlayers(playersUpdated);
    }
  };

  const addPlayer = (user: UserResponse): void => {
    if (!userPlayers) return;
    const userPlayersMod: UserResponse[] | undefined = [...userPlayers, user];
    setUserPlayers(userPlayersMod);

    if (!userInfo?.team) return;
    const teamUpdated = {
      ...userInfo.team,
      players: userPlayersMod,
    };

    const userUpdated: UserResponse = {
      ...userInfo,
      team: teamUpdated,
    };

    updateTeamRequest(userInfo.team._id, teamUpdated, user, "addUser");
    setUserInfo(userUpdated);
    if (freePlayers) setFreePlayers(freePlayers.filter((item) => item._id !== user._id));
  };

  if (props.datos === "jugadoresLibres") {
    useEffect(() => {
      fetch("http://localhost:3000/user?limit=30", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          const data = await response.json();
          console.log("FETCH");
          console.log(data.data.filter((user: UserResponse) => user.role === "JUGADOR" && user.team === null));
          setFreePlayers(data.data.filter((user: UserResponse) => user.role === "JUGADOR" && user.team === null));
        })
        .catch((error) => {
          console.error(error);
          // Handle error gracefully
        });
    }, [props.datos]);
  }

  return (
    <>
      <div className="list">
        <div className="list__header">
          <div className="list__columns">
            <p>NOMBRE</p>
            <p>APELLIDOS</p>
            <p>EMAIL</p>
            <p>ROL</p>
          </div>
          <div className="list__title">
            <p>MI EQUIPO</p>
          </div>
          {userInfo?.role !== "JUGADOR" ? <p>SACAR DEL EQUIPO</p> : <></>}
        </div>
        {userPlayers?.map((player, index) => (
          <div key={index} className="list__data">
            <div className="list__player">
              <p>{player.name}</p>
              <p>{player.lastName}</p>
              <p>{player.email}</p>
              <p>{player.role}</p>
            </div>
            {userInfo?.role !== "JUGADOR" ? (
              <a
                onClick={() => {
                  deleteUser(player);
                }}
              >
                ELIMINAR
              </a>
            ) : (
              <></>
            )}
            <img src={userPhoto} alt="" className="list__player-image" />
          </div>
        ))}

        <div className="list__data">
          <div className="list__player">
            <p>{userInfo?.team?.delegate.name}</p>
            <p>{userInfo?.team?.delegate.lastName}</p>
            <p>{userInfo?.team?.delegate.email}</p>
            <p>{userInfo?.team?.delegate.role}</p>
          </div>
          <img src={userPhoto} alt="" className="list__player-image" />
        </div>
      </div>

      <div className="list">
        <div className="list__header">
          <div className="list__columns">
            <p>NOMBRE</p>
            <p>APELLIDOS</p>
            <p>EMAIL</p>
            <p>ROL</p>
          </div>
          {userInfo?.role !== "JUGADOR" ? <p>AÑADIR AL EQUIPO</p> : <></>}
        </div>
        {freePlayers?.map((player, index) => (
          <div key={index} className="list__data">
            <div className="list__player">
              <p>{player.name}</p>
              <p>{player.lastName}</p>
              <p>{player.email}</p>
              <p>{player.role}</p>
            </div>

            <a
              onClick={() => {
                addPlayer(player);
              }}
            >
              {" "}
              AÑADIR{" "}
            </a>

            <img src={userPhoto} alt="" className="list__player-image" />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayerList;
