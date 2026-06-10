import { FILTERS } from "../constants/todo.js";

function FilterTabs({ currentFilter, onFilterChange }) {
  return (
    <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg bg-[#f1edf9] p-1" aria-label="Todo 상태 필터">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={[
            "min-w-0 rounded-md px-2 py-2.5 font-bold transition",
            currentFilter === filter.value
              ? "bg-brand text-white shadow-[0_6px_16px_rgba(103,43,224,0.22)]"
              : "bg-transparent text-[#5d536d] hover:bg-white hover:text-brand",
          ].join(" ")}
          type="button"
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
