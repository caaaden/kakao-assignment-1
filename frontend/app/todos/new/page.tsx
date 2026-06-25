import Link from "next/link";
import TodoCreateForm from "../_components/TodoCreateForm";

export default function TodoNewPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Todo 생성</h1>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <TodoCreateForm />
        </div>
      </section>
    </main>
  );
}
