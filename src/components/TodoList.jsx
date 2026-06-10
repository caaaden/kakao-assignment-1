import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, onEditTodo, onToggleTodo, onDeleteTodo }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0" aria-label="Todo 목록">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEditTodo={onEditTodo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
