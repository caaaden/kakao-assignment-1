import Link from "next/link";
import TodoItemActions from "./_components/TodoItemActions";
import { getTodosAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function TodoListPage() {
  const todos = await getTodosAction();

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <section className="mx-auto w-full max-w-3xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#672be0]">Todo API</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Todo List</h1>
          </div>
          <Link
            href="/todos/new"
            className="rounded-lg bg-[#672be0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5522bd]"
          >
            새 Todo
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          {todos.length === 0 ? (
            <div className="px-6 py-12 text-center text-zinc-500">
              등록된 Todo가 없습니다.
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p
                      className={`text-base font-medium ${
                        todo.completed
                          ? "text-zinc-400 line-through"
                          : "text-zinc-900"
                      }`}
                    >
                      {todo.title}
                    </p>
                    <Link
                      href={`/todos/${todo.id}`}
                      className="mt-2 inline-block text-sm font-medium text-[#672be0] hover:underline"
                    >
                      수정하기
                    </Link>
                  </div>
                  <TodoItemActions todo={todo} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
