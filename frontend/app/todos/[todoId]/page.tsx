import Link from "next/link";
import { notFound } from "next/navigation";
import TodoEditForm from "../_components/TodoEditForm";
import { getTodoByIdAction } from "../actions";

type TodoEditPageProps = {
  params: Promise<{
    todoId: string;
  }>;
};

export default async function TodoEditPage({ params }: TodoEditPageProps) {
  const { todoId } = await params;
  const parsedTodoId = Number(todoId);

  if (!Number.isInteger(parsedTodoId)) {
    notFound();
  }

  const todo = await getTodoByIdAction(parsedTodoId);

  if (!todo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <section className="mx-auto w-full max-w-xl space-y-8">
        <div className="space-y-3">
          <Link
            href="/todos"
            className="text-sm font-medium text-[#672be0] hover:underline"
          >
            목록으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Todo 수정</h1>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <TodoEditForm todo={todo} />
        </div>
      </section>
    </main>
  );
}
