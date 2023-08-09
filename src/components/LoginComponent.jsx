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
    <form className="container">
      <div className="form-group">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          id="username"
          aria-describedby="username"
          placeholder="Enter Username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className="form-control"
          id="password"
          placeholder="Enter Password"
        />
      </div>
      <button type="button" onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginComponent;
