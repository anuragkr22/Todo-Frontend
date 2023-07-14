import React from "react";
import { Link, useParams } from "react-router-dom";

const WelcomeComponent = () => {
  const { username } = useParams();

  return (
    <div>
      <h1>Welcome {username}</h1>
      Manage your <Link to="/todos">todos</Link>
    </div>
  );
};

export default WelcomeComponent;
