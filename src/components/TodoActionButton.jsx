function TodoActionButton({ children, danger = false, onClick }) {
  return (
    <button
      className={[
        "rounded-md bg-[#eee9f8] px-2.5 py-2 font-bold text-[#4d425f] transition hover:text-white max-[520px]:flex-1",
        danger ? "hover:bg-[#dc2626]" : "hover:bg-brand",
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TodoActionButton;
