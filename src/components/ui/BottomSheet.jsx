import { useEffect } from 'react';
import { X } from 'lucide-react';

// Folha inferior reutilizável (data e confirmação). No desktop vira um modal
// centralizado, mantendo a largura do app.
export default function BottomSheet({ open, title, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-cocoa-900/45 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-[440px] animate-[slide-up_0.32s_cubic-bezier(0.22,1,0.36,1)] rounded-t-[28px] bg-cream px-6 pb-[max(env(safe-area-inset-bottom),1.25rem)] pt-3 shadow-[0_-20px_60px_-20px_rgba(51,42,36,0.5)] sm:animate-[scale-in_0.22s_ease-out] sm:rounded-[28px]"
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-cream-400 sm:hidden" />

        <div className="mt-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-cocoa-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-full bg-cream-200 text-cocoa-800 transition hover:bg-cream-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 max-h-[68dvh] overflow-y-auto overscroll-contain">{children}</div>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}
