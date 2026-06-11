import { WEEK_DAY_NAMES } from "../constants/todo.js";
import { formatDateKey } from "../utils/date.js";

function WeekCalendar({ todos, weekDates, selectedDateKey, onSelectDate, onMoveWeek }) {
  const todayDateKey = formatDateKey(new Date());

  return (
    <div
      className="mb-[18px] grid grid-cols-[auto_repeat(7,1fr)_auto] items-center gap-2 rounded-b-lg border border-t-0 border-[#ebe6f7] bg-[#fbfaff] px-3 pb-3 pt-2 max-[520px]:grid-cols-[auto_repeat(7,minmax(58px,1fr))_auto] max-[520px]:overflow-x-auto max-[520px]:pb-4"
      aria-label="주간 Todo 날짜 이동 및 날짜 목록"
    >
      <WeekMoveButton direction="left" onClick={() => onMoveWeek(-1)} />

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
            <span className="text-xs font-bold">{todoCount}</span>
          </button>
        );
      })}

      <WeekMoveButton direction="right" onClick={() => onMoveWeek(1)} />
    </div>
  );
}

function WeekMoveButton({ direction, onClick }) {
  const isPrevious = direction === "left";

  return (
    <button
      className="flex h-10 w-8 items-center justify-center rounded-md bg-transparent text-brand transition hover:bg-[#eee9f8]"
      type="button"
      aria-label={isPrevious ? "이전 주차" : "다음 주차"}
      onClick={onClick}
    >
      <RoundedTriangleIcon direction={direction} />
    </button>
  );
}

function RoundedTriangleIcon({ direction }) {
  const points = direction === "left" ? "16 5 7 12 16 19" : "8 5 17 12 8 19";

  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
    >
      <polygon
        points={points}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default WeekCalendar;
