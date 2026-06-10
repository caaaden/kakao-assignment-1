function DateNavigation({ weekStartDateKey, weekEndDateKey, onMoveWeek }) {
  return (
    <div
      className="mb-[18px] grid grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-lg border border-[#ebe6f7] bg-[#fbfaff] p-3 max-[520px]:grid-cols-2"
      aria-label="주간 Todo 날짜 이동"
    >
      <button
        className="min-w-[78px] rounded-md bg-[#eee9f8] px-3 py-2 font-bold text-brand transition hover:bg-brand hover:text-white"
        type="button"
        aria-label="이전 주차"
        onClick={() => onMoveWeek(-1)}
      >
        이전 주
      </button>
      <time
        className="min-w-0 text-center text-[17px] font-bold leading-snug text-[#24212b] max-[520px]:col-span-2 max-[520px]:row-start-1"
        dateTime={weekStartDateKey}
      >
        {weekStartDateKey} ~ {weekEndDateKey}
      </time>
      <button
        className="min-w-[78px] rounded-md bg-[#eee9f8] px-3 py-2 font-bold text-brand transition hover:bg-brand hover:text-white"
        type="button"
        aria-label="다음 주차"
        onClick={() => onMoveWeek(1)}
      >
        다음 주
      </button>
    </div>
  );
}

export default DateNavigation;
