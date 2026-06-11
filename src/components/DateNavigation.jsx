function DateNavigation({ monthLabel, selectedDateKey }) {
  return (
    <div className="rounded-t-lg border border-b-0 border-[#ebe6f7] bg-[#fbfaff] px-3 pb-2 pt-4 text-center">
      <time className="text-lg font-extrabold text-brand" dateTime={selectedDateKey}>
        {monthLabel}
      </time>
    </div>
  );
}

export default DateNavigation;
