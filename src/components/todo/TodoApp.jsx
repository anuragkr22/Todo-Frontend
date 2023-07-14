import React from "react";
import "./todoApp.css";
import LoginComponent from "../LoginComponent";
import WelcomeComponent from "../WelcomeComponent";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ErrorComponent from "../ErrorComponent";
import ListTodosComponent from "../ListTodosComponent";
import HeaderComponent from "../HeaderComponent";
import FooterComponent from "../FooterComponent";
import AuthProvider, { useAuth } from "../../security/AuthContext";
import Alert from "../Alert";
import TodoComponent from "../TodoComponent";

const AuthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return children;

  return <Navigate to="/" />;
};

const TodoApp = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <HeaderComponent />
        <Alert />
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path="/welcome/:username"
            element={
              <AuthenticatedRoute>
                <WelcomeComponent />
              </AuthenticatedRoute>
            }
          />
          <Route path="*" element={<ErrorComponent />} />
          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListTodosComponent />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/todo/:id"
            element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }
          />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default TodoApp;
