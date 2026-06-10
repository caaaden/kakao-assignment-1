function DateNavigation({ weekStartDateKey, weekEndDateKey, onMoveWeek }) {
  return (
    <div
      className="mb-[18px] grid grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-lg border border-[#ebe6f7] bg-[#fbfaff] p-3 max-[520px]:grid-cols-2"
      aria-label="주간 Todo 날짜 이동"
    >
      <button
        className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-[26px] leading-none text-brand transition hover:bg-[#eee9f8]"
        type="button"
        aria-label="이전 주차"
        onClick={() => onMoveWeek(-1)}
      >
        ◀
      </button>
      <time
        className="min-w-0 text-center text-[17px] font-bold leading-snug text-[#24212b] max-[520px]:col-span-2 max-[520px]:row-start-1"
        dateTime={weekStartDateKey}
      >
        {weekStartDateKey} ~ {weekEndDateKey}
      </time>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-[26px] leading-none text-brand transition hover:bg-[#eee9f8]"
        type="button"
        aria-label="다음 주차"
        onClick={() => onMoveWeek(1)}
      >
        ▶
      </button>
    </div>
  );
}

export default DateNavigation;
