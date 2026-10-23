import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:
    'bg-cocoa-900 text-cream-50 hover:bg-cocoa-800 disabled:bg-taupe-400/50 disabled:text-cream-100',
  gold: 'bg-gold-500 text-cocoa-900 hover:bg-gold-400 disabled:bg-gold-300/60',
  soft: 'bg-cream-200 text-cocoa-900 hover:bg-cream-300',
  outline: 'border border-cocoa-900/15 bg-transparent text-cocoa-900 hover:bg-cream-200',
};

export default function Button({
  variant = 'primary',
  loading = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-[11px] font-semibold uppercase tracking-[0.18em] transition active:scale-[0.99] disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
