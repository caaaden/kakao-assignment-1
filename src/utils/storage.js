import { SELECTED_DATE_STORAGE_KEY, TODO_STORAGE_KEY } from "../constants/todo.js";

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

export function loadSelectedDateFromLocalStorage() {
  const savedDateKey = localStorage.getItem(SELECTED_DATE_STORAGE_KEY);

  if (!savedDateKey) {
    return new Date();
  }

  const savedDate = new Date(savedDateKey);

  if (Number.isNaN(savedDate.getTime())) {
    return new Date();
  }

  return savedDate;
}

export function saveSelectedDateToLocalStorage(dateKey) {
  localStorage.setItem(SELECTED_DATE_STORAGE_KEY, dateKey);
}
