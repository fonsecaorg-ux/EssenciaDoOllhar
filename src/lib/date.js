// Utilidades de data no fuso local do dispositivo, formatadas em pt-BR.

export const WEEKDAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function startOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Grade fixa de 6 semanas começando na segunda-feira (padrão brasileiro).
export function buildMonthGrid(monthDate) {
  const first = startOfMonth(monthDate);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - offset);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });
const fullDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
});
const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
const monthShortFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'short' });
const timeFormatter = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });

const capitalize = (value = '') => value.charAt(0).toUpperCase() + value.slice(1);
const stripDot = (value = '') => value.replace(/\.$/, '');

export const formatMonthYear = (date) => capitalize(monthFormatter.format(date));
export const formatFullDate = (date) => capitalize(fullDateFormatter.format(date));
export const formatWeekday = (date) => stripDot(weekdayFormatter.format(date));
export const formatMonthShort = (date) => stripDot(monthShortFormatter.format(date));
export const formatTime = (date) => timeFormatter.format(date);

export function toDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}
