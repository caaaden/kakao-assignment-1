import { WEEK_DAY_NAMES } from "../constants/todo.js";
import { formatDateKey } from "../utils/date.js";

function WeekCalendar({ todos, weekDates, selectedDateKey, onSelectDate }) {
  const todayDateKey = formatDateKey(new Date());

  return (
    <div
      className="mb-[18px] grid grid-cols-7 gap-2 max-[520px]:grid-cols-[repeat(7,minmax(58px,1fr))] max-[520px]:overflow-x-auto max-[520px]:pb-1"
      aria-label="이번 주 날짜 목록"
    >
      {weekDates.map((date, index) => {
        const dateKey = formatDateKey(date);
        const todoCount = todos.filter((todo) => todo.date === dateKey).length;
        const isSelected = dateKey === selectedDateKey;
        const isToday = dateKey === todayDateKey;

        return (
          <button
            key={dateKey}
            className={[
              "flex min-h-[82px] min-w-0 flex-col items-center gap-1 rounded-lg border p-2.5 text-[#4d425f] transition max-[520px]:min-h-[76px]",
              isSelected
                ? "border-brand bg-brand text-white shadow-[0_8px_18px_rgba(103,43,224,0.24)]"
                : "border-[#ebe6f7] bg-[#fbfaff] hover:border-brand hover:shadow-[0_6px_16px_rgba(103,43,224,0.12)]",
              isToday && !isSelected ? "border-brand" : "",
            ].join(" ")}
            type="button"
            aria-label={`${dateKey} Todo ${todoCount}개`}
            onClick={() => onSelectDate(date)}
          >
            <span className="text-xs font-bold">{WEEK_DAY_NAMES[index]}</span>
            <span className="text-xl font-extrabold leading-none">{date.getDate()}</span>
            <span className="text-xs font-bold">{todoCount}개</span>
          </button>
        );
      })}
    </div>
  );
}

export default WeekCalendar;
