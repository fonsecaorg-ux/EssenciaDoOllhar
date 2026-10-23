import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import StatusBar from './StatusBar.jsx';
import BottomTabBar from './BottomTabBar.jsx';

// Todas as telas, exceto a Home, usam cabeçalho taupe: a barra de status
// acompanha a cor para manter a continuidade visual.
export default function AppShell() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const showTabs = !pathname.startsWith('/agendar');
  const statusTone = pathname === '/' ? 'cream' : 'taupe';

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex min-h-dvh justify-center bg-cream sm:items-center sm:bg-taupe-600 sm:p-6">
      <div className="relative flex h-dvh w-full max-w-[440px] flex-col overflow-hidden bg-cream shadow-[0_30px_80px_-30px_rgba(51,42,36,0.55)] sm:h-[min(880px,calc(100dvh_-_3rem))] sm:rounded-[34px] sm:ring-1 sm:ring-cocoa-900/10">
        <StatusBar tone={statusTone} />

        <main
          ref={mainRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
        >
          <div key={pathname} className="flex flex-1 flex-col animate-[fade-in_0.28s_ease-out]">
            <Outlet />
          </div>
        </main>

        {showTabs && <BottomTabBar />}
      </div>
    </div>
  );
}
