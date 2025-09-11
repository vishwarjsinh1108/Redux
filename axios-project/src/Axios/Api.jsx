import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// ✅ GET all todos
export const getpost = () => {
  return api.get("/todos");
};

// ✅ DELETE a todo
export const deletepost = (id) => {
  return api.delete(`/todos/${id}`);
};

// ✅ ADD (create) a new todo
export const addpost = (data) => {
  return api.post("/todos", data);
};

// ✅ UPDATE a todo
export const updatepost = (id, data) => {
  return api.put(`/todos/${id}`, data);
};

export default api;