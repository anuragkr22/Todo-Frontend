import React, { useEffect, useState } from "react";

import {
  deleteTodoApi,
  retrieveAllTodosForUsernameApi,
} from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

const ListTodosComponent = () => {
  const navigate = useNavigate();

  const { showAlert, username } = useAuth();

  const [todos, setTodos] = useState([]);

  const refreshTodos = () => {
    retrieveAllTodosForUsernameApi(username)
      .then((res) => setTodos(res.data))
      .catch(console.log);
  };

  useEffect(() => {
    refreshTodos();
    //eslint-disable-next-line
  }, []);

  const handleDeleteTodo = (id) => {
    deleteTodoApi(username, id)
      .then(() => {
        refreshTodos();
        showAlert("Deleted Todo", "success");
      })
      .catch(console.log);
  };

  const updateTodoHandle = (id) => {
    navigate(`/todo/${id}`);
  };

  const handleAddNewTodo = () => {
    navigate("/todo/-1");
  };

  return (
    <div className="container">
      <h1>Your Todos:</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Description</th>
            <th>Target Date</th>
            <th>Is Done?</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.targetDate}</td>
                <td>{todo.done.toString()}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => updateTodoHandle(todo.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="btn btn-success" onClick={handleAddNewTodo}>
        Add New Todo
      </button>
    </div>
  );
};

export default ListTodosComponent;
