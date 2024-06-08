import { FormEvent, useRef } from "react";
import Header from "../../components/Header/Header";
import "./RegisterPage.scss";
import { RegisterInfo } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const doRegisterRequest = (registerInfo: RegisterInfo): void => {
    fetch("http://localhost:3000/user", {
      method: "POST",
      body: JSON.stringify(registerInfo),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(async (response) => {
        if (response.status !== 201) {
          alert("Registro incorrecto");
        } else {
          navigate("/login");
        }
        return await response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        alert("Ha ocurrido un error en la petición");
      });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const registerInfo: RegisterInfo = {
      email: emailRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
      name: nameRef?.current?.value as string,
      lastName: lastNameRef?.current?.value as string,
    };

    if (!registerInfo.email || !registerInfo.password || !registerInfo.name || !registerInfo.lastName) {
      alert("Email y constraseña obligatiorios");
    } else {
      doRegisterRequest(registerInfo);
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="register-page">
        <div className="register-page__card">
          <h1 className="register-page__title">BIENVENIDO</h1>
          <p className="register-page__text1">SIGN IN</p>
          <p className="register-page__text2">Introduce tus credenciales para acceder:</p>
          <form onSubmit={submitForm} className="register-page__form">
            <label htmlFor="email">Email:</label>
            <input className="register-page__input" ref={emailRef} type="text" id="email" placeholder="Introduce tu email"/>
            <label htmlFor="password">Password:</label>
            <input className="register-page__input" ref={passwordRef} type="password" id="password" placeholder="Introduce tu contraseña"/>
            <label htmlFor="name">Name:</label>
            <input className="register-page__input" ref={nameRef} type="text" id="name" placeholder="Introduce tu nombre"/>
            <label htmlFor="lastName">Last Name:</label>
            <input className="register-page__input" ref={lastNameRef} type="test" id="lastName" placeholder="Introduce tus apellidos"/>

            <input className="register-page__button register-page__button--green" type="submit" title="Log in" value="ACCEDER" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
