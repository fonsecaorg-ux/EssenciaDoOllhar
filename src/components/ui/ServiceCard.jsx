import { ChevronRight } from 'lucide-react';
import { brl, formatDuration } from '../../lib/format.js';
import ServiceIcon from './ServiceIcon.jsx';

export default function ServiceCard({ servico, selected = false, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(servico)}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3.5 rounded-2xl border px-3.5 py-3 text-left transition ${
        selected
          ? 'border-gold-400 bg-cream-50 shadow-soft ring-1 ring-gold-300/60'
          : 'border-cream-300 bg-cream-50/70 hover:border-taupe-300 hover:bg-cream-50'
      }`}
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition ${
          selected ? 'bg-gold-300/40 text-gold-700' : 'bg-cream-200 text-taupe-600'
        }`}
      >
        <ServiceIcon nome={servico.nome} className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-serif text-[16px] leading-tight text-cocoa-900">
          {servico.nome}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-taupe-600">
          {servico.descricao}
        </span>
        <span className="mt-1 block text-[9px] uppercase tracking-[0.12em] text-taupe-500">
          {formatDuration(servico.duracao_minutos)}
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-[13px] font-semibold text-cocoa-900">{brl(servico.preco)}</span>
        <ChevronRight
          className={`h-4 w-4 ${selected ? 'text-gold-600' : 'text-taupe-400'}`}
          strokeWidth={1.7}
        />
      </span>
    </button>
  );
}
