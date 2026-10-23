import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  WEEKDAYS_SHORT,
  addMonths,
  buildMonthGrid,
  formatMonthYear,
  isSameDay,
  startOfDay,
} from '../../lib/date.js';

// Calendário minimalista, semana começando na segunda. Dias passados ficam
// desabilitados; o dia selecionado recebe o preenchimento escuro da marca.
export default function Calendar({ month, onMonthChange, value, onChange }) {
  const days = useMemo(() => buildMonthGrid(month), [month]);
  const today = startOfDay();

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onMonthChange(addMonths(month, -1))}
          aria-label="Mês anterior"
          className="grid h-8 w-8 place-items-center rounded-full border border-cream-300 bg-cream-50 text-cocoa-800 transition hover:border-taupe-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <p className="font-serif text-base capitalize tracking-[0.02em] text-cocoa-900">
          {formatMonthYear(month)}
        </p>

        <button
          type="button"
          onClick={() => onMonthChange(addMonths(month, 1))}
          aria-label="Próximo mês"
          className="grid h-8 w-8 place-items-center rounded-full border border-cream-300 bg-cream-50 text-cocoa-800 transition hover:border-taupe-300"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center">
        {WEEKDAYS_SHORT.map((weekday, index) => (
          <span
            key={`${weekday}-${index}`}
            className="py-1 text-[9.5px] uppercase tracking-[0.1em] text-taupe-500"
          >
            {weekday}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day) => {
          const disabled = day < today;
          const selected = isSameDay(day, value);
          const inMonth = day.getMonth() === month.getMonth();
          const isToday = isSameDay(day, today);

          return (
            <div key={day.toISOString()} className="flex justify-center">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(day)}
                className={`relative grid h-9 w-9 place-items-center rounded-full text-[12.5px] transition ${
                  selected
                    ? 'bg-cocoa-900 font-medium text-cream-50 shadow-soft'
                    : disabled
                      ? 'text-taupe-300'
                      : inMonth
                        ? 'text-cocoa-900 hover:bg-cream-200'
                        : 'text-taupe-400/70 hover:bg-cream-200'
                }`}
              >
                {day.getDate()}
                {isToday && !selected && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-gold-500" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
