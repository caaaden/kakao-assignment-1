import { NextResponse } from "next/server";
import { createTodo, getTodos } from "../../../lib/todos";

// 클라이언트의 GET /api/todos 요청을 FastAPI GET /todos로 전달합니다.
export async function GET() {
  try {
    const todos = await getTodos();

    return NextResponse.json(todos);
  } catch {
    return NextResponse.json(
      { message: "Todo 목록을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}

// 클라이언트의 POST /api/todos 요청을 FastAPI POST /todos로 전달합니다.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const todo = await createTodo(body);

    return NextResponse.json(todo, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Todo를 생성하지 못했습니다." },
      { status: 500 },
    );
  }
}
