import { createContext, useContext, useState } from "react";

import { apiClient } from "../api/TodoApiService";
import {
  executeBasicAuthenticationService,
  executeJwtAuthenticationService,
} from "../api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [alert, setAlert] = useState(null);

  const [token, setToken] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // Basic Auth login code
  const login = async (username, password) => {
    const baToken = "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuthenticationService(baToken);

      if (response.status == 200) {
        setIsAuthenticated(true);
        setUsername(username);
        setToken(baToken);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = baToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      console.log(err);
      logout();
    }
  };

  // JWT Login code
  // const login = async (username, password) => {
  //   try {
  //     const response = await executeJwtAuthenticationService(
  //       username,
  //       password
  //     );

  //     if (response.status == 200) {
  //       const jwtToken = "Bearer " + response.data.token;

  //       setIsAuthenticated(true);
  //       setUsername(username);
  //       setToken(jwtToken);

  //       apiClient.interceptors.request.use((config) => {
  //         config.headers.Authorization = jwtToken;
  //         return config;
  //       });

  //       return true;
  //     } else {
  //       logout();
  //       return false;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     logout();
  //   }
  // };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
    showAlert("Logged out successfully", "success");
  };

  const state = {
    isAuthenticated,
    token,
    username,
    login,
    logout,
    alert,
    showAlert,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
