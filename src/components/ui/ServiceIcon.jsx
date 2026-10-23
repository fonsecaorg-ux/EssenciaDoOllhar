import { Brush, Eye, Leaf, PenTool, Sparkles } from 'lucide-react';

// Ícone de acento derivado do nome do serviço, sem precisar de coluna extra
// no banco. Para novos serviços, basta ampliar o mapeamento.
export default function ServiceIcon({ nome = '', className = 'h-5 w-5' }) {
  const key = nome.toLowerCase();

  const Icon = key.includes('henna')
    ? Leaf
    : key.includes('micro')
      ? PenTool
      : key.includes('cílio') || key.includes('cilio')
        ? Eye
        : key.includes('lamina')
          ? Sparkles
          : Brush;

  return <Icon className={className} strokeWidth={1.6} />;
}
