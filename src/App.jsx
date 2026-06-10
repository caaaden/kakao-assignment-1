import { useEffect, useMemo, useState } from "react";
import DateNavigation from "./components/DateNavigation.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import WeekCalendar from "./components/WeekCalendar.jsx";
import { getFilteredTodos } from "./utils/todo.js";
import { getWeekDates, formatDateKey } from "./utils/date.js";
import {
  loadSelectedDateFromLocalStorage,
  loadTodosFromLocalStorage,
  saveSelectedDateToLocalStorage,
  saveTodosToLocalStorage,
} from "./utils/storage.js";

function App() {
  const [todos, setTodos] = useState(() => loadTodosFromLocalStorage());
  const [todoText, setTodoText] = useState("");
  const [message, setMessage] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(() => loadSelectedDateFromLocalStorage());

  const selectedDateKey = formatDateKey(selectedDate);
  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);
  const weekStartDateKey = formatDateKey(weekDates[0]);
  const weekEndDateKey = formatDateKey(weekDates[6]);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, selectedDateKey, currentFilter);
  }, [currentFilter, selectedDateKey, todos]);

  // Todo 데이터가 바뀔 때마다 JSON 문자열로 변환해 로컬스토리지에 저장합니다.
  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  // 선택된 날짜를 저장해 새로고침 후에도 같은 주간 뷰를 유지합니다.
  useEffect(() => {
    saveSelectedDateToLocalStorage(selectedDateKey);
  }, [selectedDateKey]);

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

  function handleEditTodo(todoId, editedText) {
    const trimmedText = editedText.trim();

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

        <DateNavigation
          weekStartDateKey={weekStartDateKey}
          weekEndDateKey={weekEndDateKey}
          onMoveWeek={handleMoveWeek}
        />

        <WeekCalendar
          todos={todos}
          weekDates={weekDates}
          selectedDateKey={selectedDateKey}
          onSelectDate={handleSelectDate}
        />

        <TodoForm
          todoText={todoText}
          onTodoTextChange={setTodoText}
          onSubmit={handleSubmit}
        />

        <p className="my-3.5 min-h-[22px] text-sm text-[#c2410c]" role="status" aria-live="polite">
          {message}
        </p>

        <FilterTabs currentFilter={currentFilter} onFilterChange={handleFilterChange} />

        <TodoList
          todos={filteredTodos}
          onEditTodo={handleEditTodo}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </section>
    </main>
  );
}

export default App;
