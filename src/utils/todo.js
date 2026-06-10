export function getFilteredTodos(todos, selectedDateKey, currentFilter) {
  const todosForSelectedDate = todos.filter((todo) => todo.date === selectedDateKey);

  if (currentFilter === "active") {
    return todosForSelectedDate.filter((todo) => !todo.isCompleted);
  }

  if (currentFilter === "completed") {
    return todosForSelectedDate.filter((todo) => todo.isCompleted);
  }

  return todosForSelectedDate;
}
