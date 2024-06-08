import { FormEvent, useContext, useRef } from "react";
import Header from "../../components/Header/Header";
import "./LoginPage.scss";
import { LoginInfo } from "../../utils/auth";
import { AuthContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const authInfo = useContext(AuthContext);
  const navigate = useNavigate();

  const doLoginRequest = (loginInfo: LoginInfo): void => {
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        if (response.status !== 200) {
          alert("Login incorrecto");
        } else {
          navigate("/");
        }
        return await response.json();
      })
      .then((data) => {
        if (data.token && data.user && authInfo.login) {
          console.log(data);
          authInfo.login(data.token, data.user);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Ha ocurrido un error en la petición");
      });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const loginInfo: LoginInfo = {
      email: emailRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
    };

    if (!loginInfo.email || !loginInfo.password) {
      alert("Email y constraseña obligatiorios");
    } else {
      doLoginRequest(loginInfo);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="login-page">
        <div className="login-page__card">
          <h1 className="login-page__title">BIENVENIDO</h1>
          <p className="login-page__text1">LOG IN</p>
          <p className="login-page__text2">Introduce tus credenciales para acceder:</p>
          <form onSubmit={submitForm} className="login-page__form">
            <label htmlFor="email">Email:</label>
            <input className="login-page__input" ref={emailRef} type="text" id="email" placeholder="Introduce tu email" />
            <label htmlFor="password">Password:</label>
            <input className="login-page__input" ref={passwordRef} type="password" id="password" placeholder="Introduce tu contraseña" />

            <input className="login-page__button login-page__button--green" type="submit" title="Log in" value="ACCEDER" ></input>
            <NavLink to="/register" className="login-page__button" type="button" title="Registrarse" >REGISTRARSE</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
