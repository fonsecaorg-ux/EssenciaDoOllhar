const META = {
  pendente: { label: 'Pendente', className: 'bg-gold-300/35 text-gold-700' },
  confirmado: { label: 'Confirmado', className: 'bg-sage-100 text-sage-600' },
  concluido: { label: 'Concluído', className: 'bg-cream-300/70 text-taupe-600' },
  cancelado: { label: 'Cancelado', className: 'bg-blush/30 text-[#a4655c]' },
};

export default function StatusBadge({ status }) {
  const meta = META[status] ?? META.pendente;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[8.5px] font-semibold uppercase tracking-[0.14em] ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}
