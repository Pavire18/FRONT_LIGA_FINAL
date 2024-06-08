import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import UserPage from "./pages/UserPage/UserPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { createContext, useState } from "react";
import { UserResponse } from "./models/User";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

export interface AuthContextInfo {
  userInfo?: UserResponse;
  userToken?: string;
  login?: (userToken: string, userInfo: UserResponse) => void;
  logout?: () => void;
}

export const AuthContext = createContext<AuthContextInfo>({});

const App = (): JSX.Element => {
  const [userToken, setUserToken] = useState<string | undefined>();
  const [userInfo, setUserInfo] = useState<UserResponse | undefined>();

  const login = (userTokenFromApi: string, userInfoFromApi: UserResponse): void => {
    setUserToken(userTokenFromApi);
    setUserInfo(userInfoFromApi);
  };

  const logout = (): void => {
    setUserToken(undefined);
    setUserInfo(undefined);
  };

  return (
    <AuthContext.Provider value={{ userInfo, userToken, login, logout }}>
      <div className="app">
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/user" element={<UserPage></UserPage>}></Route>
            <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
          </Routes>
        </HashRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
