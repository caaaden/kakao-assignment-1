"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Todo } from "../../../lib/todos";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

type TodoEditFormProps = {
  todo: Todo;
};

export default function TodoEditForm({ todo }: TodoEditFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setMessage("할 일을 입력해주세요.");
      return;
    }

    setMessage("");
    startTransition(async () => {
      const response = await fetch(`${apiUrl}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          completed,
        }),
      });

      if (!response.ok) {
        setMessage("Todo를 수정하지 못했습니다.");
        return;
      }

      router.push("/todos");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="todo-title" className="text-sm font-medium text-zinc-700">
          할 일
        </label>
        <input
          id="todo-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 text-base text-zinc-900 outline-none transition focus:border-[#672be0] focus:ring-4 focus:ring-[#672be0]/10"
        />
      </div>

      <label className="flex items-center gap-3 text-sm font-medium text-zinc-700">
        <input
          type="checkbox"
          checked={completed}
          onChange={(event) => setCompleted(event.target.checked)}
          className="h-5 w-5 rounded border-zinc-300 accent-[#672be0]"
        />
        완료 처리
      </label>

      {message ? <p className="text-sm text-red-500">{message}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-lg bg-[#672be0] px-4 text-sm font-semibold text-white transition hover:bg-[#5522bd] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "저장 중..." : "저장하기"}
      </button>
    </form>
  );
}
