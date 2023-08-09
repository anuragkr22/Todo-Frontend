import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "http://03-rest-api-full-stack-h2-env.eba-fibgwbar.ap-south-1.elasticbeanstalk.com/",
});

export const retrieveAllTodosForUsernameApi = (username) =>
  apiClient.get(`/users/${username}/todos`);

export const deleteTodoApi = (username, id) =>
  apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodoApi = (username, id) =>
  apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodoApi = (username, id, todoDetails) =>
  apiClient.put(`/users/${username}/todos/${id}`, todoDetails);

export const createTodoApi = (username, todoDetails) =>
  apiClient.post(`/users/${username}/todos`, todoDetails);

