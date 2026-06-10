import { useState } from "react";
import TodoActionButton from "./TodoActionButton.jsx";

function TodoItem({ todo, onEditTodo, onToggleTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.text);

  function handleStartEdit() {
    setEditingText(todo.text);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setEditingText(todo.text);
    setIsEditing(false);
  }

  function handleSubmitEdit(event) {
    event.preventDefault();

    const trimmedText = editingText.trim();

    if (!trimmedText) {
      onEditTodo(todo.id, editingText);
      return;
    }

    onEditTodo(todo.id, trimmedText);
    setIsEditing(false);
  }

  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-3.5 rounded-lg border border-[#ebe6f7] bg-[#fbfaff] p-3.5 max-[520px]:grid-cols-1">
      {isEditing ? (
        <form
          className="contents max-[520px]:flex max-[520px]:flex-col max-[520px]:gap-2"
          onSubmit={handleSubmitEdit}
        >
          <label className="sr-only" htmlFor={`edit-todo-${todo.id}`}>
            Todo 수정
          </label>
          <input
            id={`edit-todo-${todo.id}`}
            className="min-w-0 rounded-md border border-[#d8cfee] bg-white px-3 py-2 text-[#24212b] outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(103,43,224,0.14)]"
            type="text"
            value={editingText}
            onChange={(event) => setEditingText(event.target.value)}
          />
          <div className="flex gap-2 max-[520px]:w-full">
            <TodoActionButton type="submit">저장</TodoActionButton>
            <TodoActionButton onClick={handleCancelEdit}>취소</TodoActionButton>
          </div>
        </form>
      ) : (
        <>
          <span
            className={[
              "min-w-0 [overflow-wrap:anywhere] leading-normal",
              todo.isCompleted ? "text-[#8a819c] line-through" : "",
            ].join(" ")}
          >
            {todo.text}
          </span>
          <div className="flex gap-2 max-[520px]:w-full">
            <TodoActionButton onClick={handleStartEdit}>수정</TodoActionButton>
            <TodoActionButton onClick={() => onToggleTodo(todo.id)}>
              {todo.isCompleted ? "취소" : "완료"}
            </TodoActionButton>
            <TodoActionButton danger onClick={() => onDeleteTodo(todo.id)}>
              삭제
            </TodoActionButton>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
