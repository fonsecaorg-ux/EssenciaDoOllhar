import Photo from './Photo.jsx';

// Card 1:1 com a comparação antes/depois. Basta enviar `antes` e `depois`
// como URLs para trocar os placeholders pelas fotos reais.
export default function BeforeAfterCard({ antes, depois, titulo, className = '' }) {
  return (
    <article
      className={`shrink-0 snap-start overflow-hidden rounded-2xl border border-cream-300 bg-cream-50 p-1.5 shadow-soft ${className}`}
    >
      <div className="grid aspect-square grid-cols-2 gap-1.5">
        <Photo src={antes} alt={`${titulo ?? 'Trabalho'} — antes`} label="Antes" tone={0} className="rounded-xl" />
        <Photo src={depois} alt={`${titulo ?? 'Trabalho'} — depois`} label="Depois" tone={1} className="rounded-xl" />
      </div>

      {titulo && (
        <p className="px-2 pb-1 pt-2 text-center text-[9px] uppercase tracking-[0.16em] text-taupe-600">
          {titulo}
        </p>
      )}
    </article>
  );
}
