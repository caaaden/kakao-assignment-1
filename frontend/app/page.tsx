import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 text-zinc-900">
      <section className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-[#672be0]">Next.js Todo</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Todo App</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-500">
          FastAPI CRUD API와 연결된 Todo 페이지로 이동합니다.
        </p>
        <Link
          href="/todos"
          className="mt-8 inline-flex rounded-lg bg-[#672be0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5522bd]"
        >
          Todo 목록 보기
        </Link>
      </section>
    </main>
  );
}
