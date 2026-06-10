import { TODO_STORAGE_KEY } from "../constants/todo.js";

export function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    return JSON.parse(savedTodos);
  } catch {
    return [];
  }
}

export function saveTodosToLocalStorage(todos) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}
