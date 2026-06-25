export default function TodosLoading() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <section className="mx-auto w-full max-w-3xl space-y-8">
        <div className="space-y-3">
          <div className="h-4 w-24 rounded bg-zinc-200" />
          <div className="h-9 w-48 rounded bg-zinc-200" />
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div className="h-6 w-3/4 rounded bg-zinc-100" />
            <div className="h-6 w-2/3 rounded bg-zinc-100" />
            <div className="h-6 w-5/6 rounded bg-zinc-100" />
          </div>
        </div>
      </section>
    </main>
  );
}
