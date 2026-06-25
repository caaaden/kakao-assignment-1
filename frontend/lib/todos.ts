import axios from "axios";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoPayload = {
  title: string;
  completed: boolean;
};

const todoApi = axios.create({
  baseURL: process.env.BACKEND_URL,
});

// FastAPI 서버에서 전체 Todo 목록을 가져옵니다.
export async function getTodos() {
  const response = await todoApi.get<Todo[]>("/todos");

  return response.data;
}

// 현재 과제의 API 목록에는 단건 조회가 없으므로 목록에서 id로 찾습니다.
export async function getTodoById(todoId: number) {
  const todos = await getTodos();

  return todos.find((todo) => todo.id === todoId) ?? null;
}

// Todo 생성 요청을 FastAPI 서버로 전달합니다.
export async function createTodo(payload: TodoPayload) {
  const response = await todoApi.post<Todo>("/todos", payload);

  return response.data;
}

// Todo 수정 요청을 FastAPI 서버로 전달합니다.
export async function updateTodo(todoId: number, payload: TodoPayload) {
  const response = await todoApi.put<Todo>(`/todos/${todoId}`, payload);

  return response.data;
}

// Todo 삭제 요청을 FastAPI 서버로 전달합니다.
export async function deleteTodo(todoId: number) {
  await todoApi.delete(`/todos/${todoId}`);
}
