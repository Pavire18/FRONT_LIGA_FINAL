import Header from "../../components/Header/Header";
import "./UserPage.scss";
import userPhoto from "../../assets/user-foto.png";
import { FormEvent, useContext, useRef, useState } from "react";
import { AuthContext } from "../../App";
import { Navigate } from "react-router-dom";
import PlayerList from "../../components/PlayerList/PlayerList";
import MatchList from "../../components/MatchList/MatchList";
import AdminPage from "../../components/AdminPage/AdminPage";

const UserPage = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState(authInfo.userInfo?.role);
  const [localUserInfo, setLocalUserInfo] = useState(authInfo.userInfo);

  const handleSelect = (event: any): void => {
    const value = event.target.value;
    setSelectedOption(value);
    console.log("Selected value:", value);
  };

  const editProfile = (): void => {
    setEditMode(true);
  };

  const doProfileModRequest = (modInfo: any): void => {
    const userId = authInfo?.userInfo?._id;

    if (!userId) {
      alert("User ID is missing. Cannot proceed with the update.");
      return;
    }

    const ruta = "http://localhost:3000/user/".concat(userId);
    fetch(ruta, {
      method: "PUT",
      body: JSON.stringify(modInfo),
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
          const updatedUserInfo = { ...authInfo.userInfo, ...modInfo };
          authInfo.login(authInfo.userToken, updatedUserInfo);
          setLocalUserInfo(updatedUserInfo);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Ha ocurrido un error en la petición");
      });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const modInfo = {
      name: nameRef?.current?.value.split(" ")[0] as string,
      lastName: nameRef?.current?.value.split(" ")[1] as string,
      role: selectedOption as string,
    };

    modInfo.name = (modInfo.name === "" || undefined ? authInfo.userInfo?.name : modInfo.name) as string;
    modInfo.lastName = (modInfo.lastName === "" || undefined ? authInfo.userInfo?.lastName : modInfo.lastName) as string;
    doProfileModRequest(modInfo);
    setEditMode(false);
  };

  return (
    <div>
      {authInfo?.userInfo ? (
        <>
          <Header></Header>
          <section className="user-page">
            <aside className="user-page__profile">
              <img src={userPhoto} alt="" className="user-page__profile-image" />
              <div>
                {editMode ? (
                  <div>
                    <form onSubmit={submitForm} className="user-page__editable">
                      <input className="user-page__input" ref={nameRef} type="text" placeholder={authInfo.userInfo.name + " " + authInfo.userInfo.lastName} />
                      <select value={selectedOption} onChange={handleSelect}>
                        <option value="" disabled>
                          Select a role
                        </option>
                        <option value="JUGADOR">JUGADOR</option>
                        <option value="DELEGADO">DELEGADO</option>
                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                      </select>
                      <input className="user-page__button" type="submit" value="GUARDAR"></input>
                    </form>
                  </div>
                ) : (
                  <div className="user-page__bloked">
                    <h2>
                      {localUserInfo?.name} {localUserInfo?.lastName}
                    </h2>
                    <h3>{selectedOption}</h3>
                    <a onClick={editProfile} className="user-page__profile-mod">
                      Editar Perfil
                    </a>
                  </div>
                )}
              </div>
            </aside>
            <div className="user-page__data">
              {authInfo.userInfo.role !== "ADMINISTRADOR" ? (
                <>
                  <PlayerList datos="jugadoresLibres"></PlayerList>
                  <MatchList></MatchList>
                </>
              ) : (
                <AdminPage></AdminPage>
              )}
            </div>
          </section>
        </>
      ) : (
        <Navigate to="/login" replace={true}></Navigate>
      )}
    </div>
  );
};

export default UserPage;
