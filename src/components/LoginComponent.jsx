import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const LoginComponent = () => {
  const [username, setUsername] = useState("anurag");

  const navigate = useNavigate();

  const { login, showAlert } = useAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const [password, setPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (await login(username, password)) {
      showAlert("Logged in successfully", "success");
      navigate(`/welcome/${username}`);
    } else {
      showAlert("Wrong Credentials", "warning");
    }
  };

  return (
    <div className="login">
      <h1>Login Page</h1>
      <div className="login-form">
        <div>
          <div>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <label>Password</label>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <button type="button" name="login" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
