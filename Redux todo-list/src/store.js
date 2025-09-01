import { createStore } from "redux";

// --- Reducer ---
const initialState = [];
function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "TOGGLE_TODO":
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case "DELETE_TODO":
      return state.filter((t) => t.id !== action.payload);
    case "EDIT_TODO":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.newText } : t
      );
    default:
      return state;
  }
}

// --- Store ---
export const store = createStore(todoReducer);
