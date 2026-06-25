"use server";

import { getTodoById, getTodos } from "../../lib/todos";

// 목록 페이지의 Server Component에서 FastAPI 데이터를 조회합니다.
export async function getTodosAction() {
  return getTodos();
}

// 수정 페이지의 Server Component에서 수정 대상 Todo를 조회합니다.
export async function getTodoByIdAction(todoId: number) {
  return getTodoById(todoId);
}
