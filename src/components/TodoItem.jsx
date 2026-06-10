import TodoActionButton from "./TodoActionButton.jsx";

function TodoItem({ todo, onEditTodo, onToggleTodo, onDeleteTodo }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-3.5 rounded-lg border border-[#ebe6f7] bg-[#fbfaff] p-3.5 max-[520px]:grid-cols-1">
      <span
        className={[
          "min-w-0 [overflow-wrap:anywhere] leading-normal",
          todo.isCompleted ? "text-[#8a819c] line-through" : "",
        ].join(" ")}
      >
        {todo.text}
      </span>
      <div className="flex gap-2 max-[520px]:w-full">
        <TodoActionButton onClick={() => onEditTodo(todo.id)}>수정</TodoActionButton>
        <TodoActionButton onClick={() => onToggleTodo(todo.id)}>
          {todo.isCompleted ? "취소" : "완료"}
        </TodoActionButton>
        <TodoActionButton danger onClick={() => onDeleteTodo(todo.id)}>
          삭제
        </TodoActionButton>
      </div>
    </li>
  );
}

export default TodoItem;
