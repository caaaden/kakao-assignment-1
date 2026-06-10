function TodoForm({ todoText, onTodoTextChange, onSubmit }) {
  return (
    <form
      className="grid grid-cols-[1fr_auto] gap-2.5 max-[520px]:grid-cols-1"
      onSubmit={onSubmit}
      noValidate
    >
      <label className="sr-only" htmlFor="todo-input">
        새 Todo 입력
      </label>
      <input
        id="todo-input"
        className="min-w-0 rounded-md border border-[#d8cfee] bg-white px-3.5 py-3 text-[#24212b] outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(103,43,224,0.14)]"
        type="text"
        placeholder="할 일을 입력하세요"
        autoComplete="off"
        value={todoText}
        onChange={(event) => onTodoTextChange(event.target.value)}
      />
      <button
        className="rounded-md bg-brand px-[18px] font-bold text-white transition hover:bg-[#5622c4] max-[520px]:min-h-[46px]"
        type="submit"
      >
        추가
      </button>
    </form>
  );
}

export default TodoForm;
