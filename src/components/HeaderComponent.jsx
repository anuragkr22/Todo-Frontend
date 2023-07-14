import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../security/AuthContext";

const HeaderComponent = () => {

  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="border-bottom border-light border-5 mb-10 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <Link
              className="navbar-brand ms-2 fs-2 fw-bold text-black"
              to="/todos"
            >
              TodoApplication
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  {isAuthenticated && (
                    <Link className="nav-link" to="/welcome/in28minutes">
                      Home
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  {isAuthenticated && (
                    <Link className="nav-link" to="/todos">
                      Todos
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                {!isAuthenticated && (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated && (
                  <Link className="nav-link" to="/login" onClick={logout}>
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
