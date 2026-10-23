import { CalendarDays, Home, Sparkles, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/servicos', label: 'Serviços', icon: Sparkles },
  { to: '/agendamentos', label: 'Agendamentos', icon: CalendarDays },
  { to: '/perfil', label: 'Perfil', icon: User },
];

export default function BottomTabBar() {
  return (
    <nav
      aria-label="Navegação principal"
      className="relative z-30 shrink-0 border-t border-cream-300 bg-cream-100/95 backdrop-blur"
    >
      <ul className="grid grid-cols-4 px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.4rem)]">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl py-1 transition-colors ${
                  isActive ? 'text-gold-700' : 'text-taupe-500 hover:text-cocoa-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-[21px] w-[21px]" strokeWidth={isActive ? 1.9 : 1.6} />
                  <span className={`text-[9.5px] leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {label}
                  </span>
                  <span
                    className={`h-1 w-1 rounded-full ${isActive ? 'bg-gold-500' : 'bg-transparent'}`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
