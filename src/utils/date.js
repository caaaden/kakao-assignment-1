export function getWeekDates(date) {
  const weekStartDate = getMondayOfWeek(date);

  return Array.from({ length: 7 }, (_, index) => {
    const weekDate = new Date(weekStartDate);
    weekDate.setDate(weekStartDate.getDate() + index);
    return weekDate;
  });
}

export function getMondayOfWeek(date) {
  const monday = new Date(date);
  const day = monday.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + mondayOffset);
  return monday;
}

export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
