import { useEffect, useState } from 'react';

// Barra de status "falsa" no estilo iOS, usada dentro do frame do app.
function currentTime() {
  return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 18 12" className="h-2.5 w-4" fill="currentColor" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="6" width="3" height="6" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 12" className="h-2.5 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M1 4.2a11 11 0 0 1 14 0" />
      <path d="M3.6 6.9a7.2 7.2 0 0 1 8.8 0" />
      <path d="M6.2 9.5a3.2 3.2 0 0 1 3.6 0" />
      <circle cx="8" cy="11.3" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 26 12" className="h-3 w-6" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.45" />
      <rect x="2.5" y="2.5" width="17" height="7" rx="1.6" fill="currentColor" />
      <path d="M23.5 4.2v3.6c1.3-.3 1.3-3.3 0-3.6Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export default function StatusBar({ tone = 'cream' }) {
  const [time, setTime] = useState(currentTime);
  const onTaupe = tone === 'taupe';

  useEffect(() => {
    const interval = setInterval(() => setTime(currentTime()), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative z-30 flex shrink-0 items-center justify-between px-7 pb-1.5 pt-[calc(env(safe-area-inset-top)_+_0.45rem)] ${
        onTaupe ? 'bg-taupe-500 text-cream-50' : 'bg-cream text-cocoa-900'
      }`}
    >
      <span className="text-[12px] font-semibold tabular-nums tracking-tight">{time}</span>
      <div className="flex items-center gap-1.5 opacity-90">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
