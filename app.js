const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const message = document.querySelector("#message");
const filterTabs = document.querySelectorAll(".filter-tab");
const previousDateButton = document.querySelector("#previous-date-button");
const nextDateButton = document.querySelector("#next-date-button");
const selectedDateElement = document.querySelector("#selected-date");
const weekCalendar = document.querySelector("#week-calendar");
const TODO_STORAGE_KEY = "dailyTodoApp.todos";
const WEEK_DAY_NAMES = ["월", "화", "수", "목", "금", "토", "일"];

let todos = [];
let currentFilter = "all";
let selectedDate = new Date();

// 현재 선택된 필터에 맞는 Todo만 목록에 표시합니다.
function renderTodos() {
  todoList.innerHTML = "";
  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.className = todo.isCompleted ? "todo-item completed" : "todo-item";

    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const editButton = createActionButton("수정", "edit-button");
    editButton.addEventListener("click", () => editTodo(todo.id));

    const completeButton = createActionButton(
      todo.isCompleted ? "취소" : "완료",
      "complete-button"
    );
    completeButton.addEventListener("click", () => toggleTodoCompletion(todo.id));

    const deleteButton = createActionButton("삭제", "delete-button");
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    actions.append(editButton, completeButton, deleteButton);
    todoItem.append(todoText, actions);
    todoList.append(todoItem);
  });
}

function getFilteredTodos() {
  const selectedDateKey = formatDateKey(selectedDate);
  const todosForSelectedDate = todos.filter((todo) => todo.date === selectedDateKey);

  if (currentFilter === "active") {
    return todosForSelectedDate.filter((todo) => !todo.isCompleted);
  }

  if (currentFilter === "completed") {
    return todosForSelectedDate.filter((todo) => todo.isCompleted);
  }

  return todosForSelectedDate;
}

// 현재 필터값과 일치하는 탭에 선택 스타일을 적용합니다.
function updateActiveFilterTab() {
  filterTabs.forEach((tab) => {
    const isSelected = tab.dataset.filter === currentFilter;
    tab.classList.toggle("active", isSelected);
  });
}

// Todo 배열을 JSON 문자열로 변환해 브라우저 로컬스토리지에 저장합니다.
function saveTodosToLocalStorage() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

// 페이지가 열릴 때 로컬스토리지에 저장된 Todo JSON을 다시 배열로 복원합니다.
function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (!savedTodos) {
    return;
  }

  todos = JSON.parse(savedTodos);
}

// 선택된 날짜가 포함된 주의 월요일부터 일요일까지 범위를 표시합니다.
function renderSelectedDate() {
  const weekDates = getWeekDates(selectedDate);
  const weekStartDateKey = formatDateKey(weekDates[0]);
  const weekEndDateKey = formatDateKey(weekDates[6]);

  selectedDateElement.textContent = `${weekStartDateKey} ~ ${weekEndDateKey}`;
  selectedDateElement.dateTime = weekStartDateKey;
  renderWeekCalendar();
}

function selectDate(date) {
  selectedDate = new Date(date);
  renderSelectedDate();
  clearMessage();
  renderTodos();
}

function moveSelectedWeek(weekAmount) {
  const nextDate = new Date(selectedDate);
  nextDate.setDate(selectedDate.getDate() + weekAmount * 7);
  selectedDate = nextDate;

  renderSelectedDate();
  clearMessage();
  renderTodos();
}

// 선택된 날짜가 포함된 주의 월요일부터 일요일까지 날짜를 계산합니다.
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

function renderWeekCalendar() {
  const weekDates = getWeekDates(selectedDate);
  const selectedDateKey = formatDateKey(selectedDate);
  const todayDateKey = formatDateKey(new Date());

  weekCalendar.innerHTML = "";

  weekDates.forEach((date, index) => {
    const dateKey = formatDateKey(date);
    const todoCount = todos.filter((todo) => todo.date === dateKey).length;
    const weekDayButton = document.createElement("button");
    weekDayButton.type = "button";
    weekDayButton.className = "week-day-button";
    weekDayButton.classList.toggle("selected", dateKey === selectedDateKey);
    weekDayButton.classList.toggle("today", dateKey === todayDateKey);
    weekDayButton.setAttribute("aria-label", `${dateKey} Todo ${todoCount}개`);

    const dayName = document.createElement("span");
    dayName.className = "week-day-name";
    dayName.textContent = WEEK_DAY_NAMES[index];

    const dayNumber = document.createElement("span");
    dayNumber.className = "week-day-number";
    dayNumber.textContent = date.getDate();

    const countText = document.createElement("span");
    countText.className = "week-day-count";
    countText.textContent = `${todoCount}개`;

    weekDayButton.append(dayName, dayNumber, countText);
    weekDayButton.addEventListener("click", () => selectDate(date));
    weekCalendar.append(weekDayButton);
  });
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 버튼 생성 코드를 한 곳에 모아 항목 렌더링을 읽기 쉽게 유지합니다.
function createActionButton(text, extraClassName) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `todo-action-button ${extraClassName}`;
  button.textContent = text;
  return button;
}

function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text,
    date: formatDateKey(selectedDate),
    isCompleted: false,
  };

  todos = [newTodo, ...todos];
  saveTodosToLocalStorage();
  renderWeekCalendar();
  renderTodos();
}

function editTodo(todoId) {
  const targetTodo = todos.find((todo) => todo.id === todoId);

  if (!targetTodo) {
    return;
  }

  const editedText = prompt("수정할 내용을 입력하세요.", targetTodo.text);
  const trimmedText = editedText ? editedText.trim() : "";

  // 수정 입력값이 비어 있으면 기존 Todo를 유지합니다.
  if (!trimmedText) {
    showMessage("수정할 내용을 입력해주세요.");
    return;
  }

  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, text: trimmedText } : todo
  );
  saveTodosToLocalStorage();
  clearMessage();
  renderWeekCalendar();
  renderTodos();
}

function toggleTodoCompletion(todoId) {
  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  saveTodosToLocalStorage();
  clearMessage();
  renderWeekCalendar();
  renderTodos();
}

function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodosToLocalStorage();
  clearMessage();
  renderWeekCalendar();
  renderTodos();
}

function showMessage(text) {
  message.textContent = text;
}

function clearMessage() {
  message.textContent = "";
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (!todoText) {
    showMessage("할 일을 입력한 뒤 추가해주세요.");
    todoInput.focus();
    return;
  }

  addTodo(todoText);
  todoInput.value = "";
  todoInput.focus();
  clearMessage();
});

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    currentFilter = tab.dataset.filter;
    updateActiveFilterTab();
    clearMessage();
    renderTodos();
  });
});

previousDateButton.addEventListener("click", () => {
  moveSelectedWeek(-1);
});

nextDateButton.addEventListener("click", () => {
  moveSelectedWeek(1);
});

loadTodosFromLocalStorage();
renderSelectedDate();
updateActiveFilterTab();
renderTodos();
