import { NavLink } from "react-router-dom";
import "./Header.scss";
import { useContext } from "react";
import { AuthContext } from "../../App";
const Header = (): JSX.Element => {
  const authInfo = useContext(AuthContext);
  const colors = ["player", "delegate", "admin"];
  let index = 0;
  switch (authInfo.userInfo?.role) {
    case "JUGADOR":
      index = 0;
      break;
    case "DELEGADO":
      index = 1;
      break;
    case "ADMINISTRADOR":
      index = 2;
      break;
    default:
      index = 0;
      break;
  }

  return (
    <header className={`header ${colors[index]}`}>
      <h1 className="header__title">FOOTBALL MANAGER</h1>
      <div className="header__user-info">
        {authInfo?.userInfo ? (
          <div className="header__links">
            <NavLink to="/user" className="header__link">Mi perfil</NavLink>
            <span> / </span>
            <NavLink to="/login" className="header__link" onClick={authInfo.logout}>Salir</NavLink>
          </div>
        ) : (
          <div className="header__links">
            <NavLink to="/login" className="header__link">
              LOGIN
            </NavLink>
            <span> / </span>
            <NavLink to="/register" className="header__link">
              REGISTER
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
