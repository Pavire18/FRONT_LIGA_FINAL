import AdminTeamList from "../AdminTeamList/AdminTeamList";
import "./AdminPage.scss";
// import { useContext } from "react";
// import { AuthContext } from "../../App";

const AdminPage = (): JSX.Element => {
  // const authInfo = useContext(AuthContext);

  return (
    <div className="admin-page">
      <div className="admin-page__selection">
        <input type="button" className="admin-page__btn" value="Usuarios"></input>
        <input type="button" className="admin-page__btn--selected" value="Equipos"></input>
        <input type="button" className="admin-page__btn" value="Liga"></input>
      </div>
      <AdminTeamList></AdminTeamList>
    </div>
  );
};

export default AdminPage;
