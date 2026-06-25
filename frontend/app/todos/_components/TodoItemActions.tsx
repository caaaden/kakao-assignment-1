"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Todo } from "../../../lib/todos";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

type TodoItemActionsProps = {
  todo: Todo;
};

export default function TodoItemActions({ todo }: TodoItemActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleCompletedChange(checked: boolean) {
    startTransition(async () => {
      await fetch(`${apiUrl}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          completed: checked,
        }),
      });

      router.refresh();
    });
  }

  function handleDeleteClick() {
    startTransition(async () => {
      await fetch(`${apiUrl}/todos/${todo.id}`, {
        method: "DELETE",
      });

      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3">
      <label className="flex items-center gap-2 text-sm font-medium text-zinc-600">
        <input
          type="checkbox"
          checked={todo.completed}
          disabled={isPending}
          onChange={(event) => handleCompletedChange(event.target.checked)}
          className="h-5 w-5 rounded border-zinc-300 accent-[#672be0] disabled:opacity-50"
        />
        완료
      </label>
      <button
        type="button"
        onClick={handleDeleteClick}
        disabled={isPending}
        className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        삭제
      </button>
    </div>
  );
}
