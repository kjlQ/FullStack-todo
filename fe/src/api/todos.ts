import axios from "axios";

export const getTodos = () => {
  return axios.get("http://127.0.0.1:5000/api/todos");
};

export const addTodo = (task: string) => {
  return axios.post("http://127.0.0.1:5000/api/todos", { task });
};

export const RemoveTodo = (id: number) => {
  return axios.delete(`http://127.0.0.1:5000/api/todos/${id}`);
};
