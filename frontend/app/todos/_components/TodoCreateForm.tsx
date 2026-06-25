"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export default function TodoCreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
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
      const response = await fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          completed: false,
        }),
      });

      if (!response.ok) {
        setMessage("Todo를 생성하지 못했습니다.");
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
          placeholder="새로운 할 일을 입력하세요"
          className="h-12 w-full rounded-lg border border-zinc-200 bg-white px-4 text-base text-zinc-900 outline-none transition focus:border-[#672be0] focus:ring-4 focus:ring-[#672be0]/10"
        />
      </div>

      {message ? <p className="text-sm text-red-500">{message}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-lg bg-[#672be0] px-4 text-sm font-semibold text-white transition hover:bg-[#5522bd] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "추가 중..." : "추가하기"}
      </button>
    </form>
  );
}
