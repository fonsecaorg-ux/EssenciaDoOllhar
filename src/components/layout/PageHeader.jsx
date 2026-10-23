import { ChevronLeft } from 'lucide-react';

// Cabeçalho taupe padrão das telas internas. O espaço à direita equilibra o
// botão de voltar para manter o título centralizado.
export default function PageHeader({ title, subtitle, onBack }) {
  return (
    <header className="bg-taupe-500 px-5 pb-6 pt-3 text-cream-50">
      <div className="flex items-center gap-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream-50/10 transition hover:bg-cream-50/20"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
          </button>
        ) : (
          <span className="h-9 w-9 shrink-0" aria-hidden="true" />
        )}

        <div className="min-w-0 flex-1 text-center">
          <h1 className="font-serif text-[22px] leading-tight tracking-[0.06em]">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-[8.5px] uppercase tracking-[0.26em] text-cream-100/75">
              {subtitle}
            </p>
          )}
        </div>

        <span className="h-9 w-9 shrink-0" aria-hidden="true" />
      </div>
    </header>
  );
}
