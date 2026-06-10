import { useEffect, useMemo, useState } from "react";

const TODO_STORAGE_KEY = "dailyTodoApp.todos";
const WEEK_DAY_NAMES = ["월", "화", "수", "목", "금", "토", "일"];
const FILTERS = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

function App() {
  const [todos, setTodos] = useState(() => loadTodosFromLocalStorage());
  const [todoText, setTodoText] = useState("");
  const [message, setMessage] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const selectedDateKey = formatDateKey(selectedDate);
  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);
  const weekStartDateKey = formatDateKey(weekDates[0]);
  const weekEndDateKey = formatDateKey(weekDates[6]);

  const filteredTodos = useMemo(() => {
    const todosForSelectedDate = todos.filter((todo) => todo.date === selectedDateKey);

    if (currentFilter === "active") {
      return todosForSelectedDate.filter((todo) => !todo.isCompleted);
    }

    if (currentFilter === "completed") {
      return todosForSelectedDate.filter((todo) => todo.isCompleted);
    }

    return todosForSelectedDate;
  }, [currentFilter, selectedDateKey, todos]);

  // Todo 데이터가 바뀔 때마다 JSON 문자열로 변환해 로컬스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = todoText.trim();

    if (!trimmedText) {
      setMessage("할 일을 입력한 뒤 추가해주세요.");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      date: selectedDateKey,
      isCompleted: false,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setTodoText("");
    setMessage("");
  }

  function handleEditTodo(todoId) {
    const targetTodo = todos.find((todo) => todo.id === todoId);

    if (!targetTodo) {
      return;
    }

    const editedText = prompt("수정할 내용을 입력하세요.", targetTodo.text);
    const trimmedText = editedText ? editedText.trim() : "";

    // 수정 입력값이 비어 있으면 기존 Todo를 유지합니다.
    if (!trimmedText) {
      setMessage("수정할 내용을 입력해주세요.");
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: trimmedText } : todo
      )
    );
    setMessage("");
  }

  function handleToggleTodo(todoId) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
    setMessage("");
  }

  function handleDeleteTodo(todoId) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    setMessage("");
  }

  function handleSelectDate(date) {
    setSelectedDate(new Date(date));
    setMessage("");
  }

  function handleMoveWeek(weekAmount) {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + weekAmount * 7);

    setSelectedDate(nextDate);
    setMessage("");
  }

  function handleFilterChange(filterValue) {
    setCurrentFilter(filterValue);
    setMessage("");
  }

  return (
    <main className="flex min-h-screen items-start justify-center px-5 py-16 max-[520px]:px-3.5 max-[520px]:py-7">
      <section
        className="w-full max-w-[560px] rounded-lg border border-[#e8e2f5] bg-white p-8 shadow-[0_18px_40px_rgba(42,31,70,0.08)] max-[520px]:p-5"
        aria-labelledby="app-title"
      >
        <header className="mb-6 text-center">
          <h1 id="app-title" className="m-0 text-[32px] font-bold leading-tight">
            Todo List
          </h1>
        </header>

        <div
          className="mb-[18px] grid grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-lg border border-[#ebe6f7] bg-[#fbfaff] p-3 max-[520px]:grid-cols-2"
          aria-label="주간 Todo 날짜 이동"
        >
          <button
            className="min-w-[78px] rounded-md bg-[#eee9f8] px-3 py-2 font-bold text-brand transition hover:bg-brand hover:text-white"
            type="button"
            aria-label="이전 주차"
            onClick={() => handleMoveWeek(-1)}
          >
            이전 주
          </button>
          <time
            className="min-w-0 text-center text-[17px] font-bold leading-snug text-[#24212b] max-[520px]:col-span-2 max-[520px]:row-start-1"
            dateTime={weekStartDateKey}
          >
            {weekStartDateKey} ~ {weekEndDateKey}
          </time>
          <button
            className="min-w-[78px] rounded-md bg-[#eee9f8] px-3 py-2 font-bold text-brand transition hover:bg-brand hover:text-white"
            type="button"
            aria-label="다음 주차"
            onClick={() => handleMoveWeek(1)}
          >
            다음 주
          </button>
        </div>

        <div
          className="mb-[18px] grid grid-cols-7 gap-2 max-[520px]:grid-cols-[repeat(7,minmax(58px,1fr))] max-[520px]:overflow-x-auto max-[520px]:pb-1"
          aria-label="이번 주 날짜 목록"
        >
          {weekDates.map((date, index) => {
            const dateKey = formatDateKey(date);
            const todoCount = todos.filter((todo) => todo.date === dateKey).length;
            const isSelected = dateKey === selectedDateKey;
            const isToday = dateKey === formatDateKey(new Date());

            return (
              <button
                key={dateKey}
                className={[
                  "flex min-h-[82px] min-w-0 flex-col items-center gap-1 rounded-lg border p-2.5 text-[#4d425f] transition max-[520px]:min-h-[76px]",
                  isSelected
                    ? "border-brand bg-brand text-white shadow-[0_8px_18px_rgba(103,43,224,0.24)]"
                    : "border-[#ebe6f7] bg-[#fbfaff] hover:border-brand hover:shadow-[0_6px_16px_rgba(103,43,224,0.12)]",
                  isToday && !isSelected ? "border-brand" : "",
                ].join(" ")}
                type="button"
                aria-label={`${dateKey} Todo ${todoCount}개`}
                onClick={() => handleSelectDate(date)}
              >
                <span className="text-xs font-bold">{WEEK_DAY_NAMES[index]}</span>
                <span className="text-xl font-extrabold leading-none">{date.getDate()}</span>
                <span className="text-xs font-bold">{todoCount}개</span>
              </button>
            );
          })}
        </div>

        <form className="grid grid-cols-[1fr_auto] gap-2.5 max-[520px]:grid-cols-1" onSubmit={handleSubmit} noValidate>
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
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button
            className="rounded-md bg-brand px-[18px] font-bold text-white transition hover:bg-[#5622c4] max-[520px]:min-h-[46px]"
            type="submit"
          >
            추가
          </button>
        </form>

        <p className="my-3.5 min-h-[22px] text-sm text-[#c2410c]" role="status" aria-live="polite">
          {message}
        </p>

        <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg bg-[#f1edf9] p-1" aria-label="Todo 상태 필터">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              className={[
                "min-w-0 rounded-md px-2 py-2.5 font-bold transition",
                currentFilter === filter.value
                  ? "bg-brand text-white shadow-[0_6px_16px_rgba(103,43,224,0.22)]"
                  : "bg-transparent text-[#5d536d] hover:bg-white hover:text-brand",
              ].join(" ")}
              type="button"
              onClick={() => handleFilterChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <ul className="m-0 flex list-none flex-col gap-2.5 p-0" aria-label="Todo 목록">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="grid grid-cols-[1fr_auto] items-center gap-3.5 rounded-lg border border-[#ebe6f7] bg-[#fbfaff] p-3.5 max-[520px]:grid-cols-1"
            >
              <span
                className={[
                  "min-w-0 [overflow-wrap:anywhere] leading-normal",
                  todo.isCompleted ? "text-[#8a819c] line-through" : "",
                ].join(" ")}
              >
                {todo.text}
              </span>
              <div className="flex gap-2 max-[520px]:w-full">
                <TodoActionButton onClick={() => handleEditTodo(todo.id)}>수정</TodoActionButton>
                <TodoActionButton onClick={() => handleToggleTodo(todo.id)}>
                  {todo.isCompleted ? "취소" : "완료"}
                </TodoActionButton>
                <TodoActionButton danger onClick={() => handleDeleteTodo(todo.id)}>
                  삭제
                </TodoActionButton>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function TodoActionButton({ children, danger = false, onClick }) {
  return (
    <button
      className={[
        "rounded-md bg-[#eee9f8] px-2.5 py-2 font-bold text-[#4d425f] transition hover:text-white max-[520px]:flex-1",
        danger ? "hover:bg-[#dc2626]" : "hover:bg-brand",
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function loadTodosFromLocalStorage() {
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

function getWeekDates(date) {
  const weekStartDate = getMondayOfWeek(date);

  return Array.from({ length: 7 }, (_, index) => {
    const weekDate = new Date(weekStartDate);
    weekDate.setDate(weekStartDate.getDate() + index);
    return weekDate;
  });
}

function getMondayOfWeek(date) {
  const monday = new Date(date);
  const day = monday.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + mondayOffset);
  return monday;
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default App;
