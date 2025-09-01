import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function TodoApp() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: "ADD_TODO", payload: input });
      setInput("");
    }
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = () => {
    dispatch({ type: "EDIT_TODO", payload: { id: editId, newText: editText } });
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="container">
      <h2>Redux To-Do List</h2>
      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editId === todo.id ? (
              <div className="edit-section">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="save-btn" onClick={handleSave}>Save</button>
              </div>
            ) : (
              <>
                <span
                  onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
                  className={todo.completed ? "completed" : ""}
                >
                  {todo.text}
                </span>
                <div className="btn-group">
                  <button className="edit-btn" onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
                  <button className="delete-btn" onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
