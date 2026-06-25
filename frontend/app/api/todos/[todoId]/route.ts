import { NextResponse } from "next/server";
import { deleteTodo, updateTodo } from "../../../../lib/todos";

type TodoRouteParams = {
  params: Promise<{
    todoId: string;
  }>;
};

// 클라이언트의 PUT /api/todos/:todoId 요청을 FastAPI PUT /todos/:todoId로 전달합니다.
export async function PUT(request: Request, { params }: TodoRouteParams) {
  try {
    const { todoId } = await params;
    const parsedTodoId = Number(todoId);
    const body = await request.json();

    if (!Number.isInteger(parsedTodoId)) {
      return NextResponse.json(
        { message: "올바르지 않은 Todo id입니다." },
        { status: 400 },
      );
    }

    const todo = await updateTodo(parsedTodoId, body);

    return NextResponse.json(todo);
  } catch {
    return NextResponse.json(
      { message: "Todo를 수정하지 못했습니다." },
      { status: 500 },
    );
  }
}

// 클라이언트의 DELETE /api/todos/:todoId 요청을 FastAPI DELETE /todos/:todoId로 전달합니다.
export async function DELETE(_request: Request, { params }: TodoRouteParams) {
  try {
    const { todoId } = await params;
    const parsedTodoId = Number(todoId);

    if (!Number.isInteger(parsedTodoId)) {
      return NextResponse.json(
        { message: "올바르지 않은 Todo id입니다." },
        { status: 400 },
      );
    }

    await deleteTodo(parsedTodoId);

    return NextResponse.json({ message: "Todo deleted" });
  } catch {
    return NextResponse.json(
      { message: "Todo를 삭제하지 못했습니다." },
      { status: 500 },
    );
  }
}
