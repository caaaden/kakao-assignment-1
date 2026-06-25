"use client";

import Link from "next/link";

type TodosErrorProps = {
  error: Error;
  reset: () => void;
};

export default function TodosError({ error, reset }: TodosErrorProps) {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <section className="mx-auto w-full max-w-xl space-y-6 rounded-xl border border-red-100 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-red-500">Error</p>
          <h1 className="mt-2 text-2xl font-bold">Todo 데이터를 불러오지 못했습니다.</h1>
          <p className="mt-3 text-sm text-zinc-500">{error.message}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-[#672be0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5522bd]"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="rounded-lg border border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            홈으로
          </Link>
        </div>
      </section>
    </main>
  );
}
