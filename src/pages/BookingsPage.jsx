import { useMemo, useState } from 'react';
import { CalendarDays, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { useAgendamentos } from '../hooks/useAgendamentos.js';
import {
  formatMonthShort,
  formatTime,
  formatWeekday,
  startOfDay,
} from '../lib/date.js';

function AppointmentCard({ agendamento }) {
  const date = new Date(agendamento.data_hora);

  return (
    <article className="flex items-center gap-4 rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3.5 shadow-soft">
      <div className="flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-cream-200/70">
        <span className="font-serif text-[22px] leading-none text-cocoa-900">
          {String(date.getDate()).padStart(2, '0')}
        </span>
        <span className="mt-1 text-[7.5px] uppercase tracking-[0.16em] text-taupe-600">
          {formatMonthShort(date)}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-serif text-[15px] leading-tight text-cocoa-900">
          {agendamento.servicos?.nome ?? 'Serviço'}
        </h3>
        <p className="mt-1 truncate text-[10.5px] text-taupe-600">
          {formatWeekday(date)} · {formatTime(date)}
          {agendamento.profissionais?.nome ? ` · ${agendamento.profissionais.nome}` : ''}
        </p>
        <div className="mt-2">
          <StatusBadge status={agendamento.status} />
        </div>
      </div>
    </article>
  );
}

export default function BookingsPage() {
  const navigate = useNavigate();
  const { agendamentos, loading, error } = useAgendamentos();
  const [tab, setTab] = useState('proximos');

  const { proximos, historico } = useMemo(() => {
    const today = startOfDay();
    const isUpcoming = (item) =>
      item.status !== 'cancelado' && new Date(item.data_hora) >= today;

    return {
      proximos: agendamentos.filter(isUpcoming),
      historico: [...agendamentos.filter((item) => !isUpcoming(item))].reverse(),
    };
  }, [agendamentos]);

  const list = tab === 'proximos' ? proximos : historico;

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Agendamentos" subtitle="Seus momentos reservados" />

      <div className="flex-1 px-5 pt-5">
        {/* Alternância entre próximos e histórico */}
        <div className="flex rounded-full bg-cream-200 p-1">
          {[
            { id: 'proximos', label: `Próximos (${proximos.length})` },
            { id: 'historico', label: `Histórico (${historico.length})` },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex-1 rounded-full py-2 text-[9.5px] font-semibold uppercase tracking-[0.12em] transition ${
                tab === item.id
                  ? 'bg-cream-50 text-cocoa-900 shadow-sm'
                  : 'text-taupe-600 hover:text-cocoa-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3 pb-6">
          {loading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[92px] animate-pulse rounded-2xl bg-cream-200/80" />
            ))}

          {!loading && error && (
            <div className="rounded-2xl border border-blush/60 bg-blush/10 px-4 py-3 text-[11px] leading-relaxed text-[#a4655c]">
              Não foi possível carregar seus agendamentos. Verifique a conexão com o Supabase.
            </div>
          )}

          {!loading && !error && list.length === 0 && (
            <div className="flex flex-col items-center px-6 pt-12 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-cream-200 text-taupe-500">
                <CalendarDays className="h-6 w-6" strokeWidth={1.4} />
              </div>
              <p className="mt-4 font-serif text-lg text-cocoa-900">Nada por aqui ainda</p>
              <p className="mt-1 max-w-[220px] text-[11px] leading-relaxed text-taupe-600">
                Que tal reservar um momento só seu? Escolha um serviço e um horário.
              </p>
              <button
                type="button"
                onClick={() => navigate('/servicos')}
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-cocoa-900 px-5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-cream-50 transition hover:bg-cocoa-800"
              >
                <Plus className="h-3.5 w-3.5" />
                Novo agendamento
              </button>
            </div>
          )}

          {!loading && !error && list.map((item) => <AppointmentCard key={item.id} agendamento={item} />)}
        </div>

        {!loading && !error && list.length > 0 && (
          <div className="pb-6">
            <button
              type="button"
              onClick={() => navigate('/servicos')}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-cocoa-900/15 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-cocoa-900 transition hover:bg-cream-200"
            >
              <Plus className="h-3.5 w-3.5" />
              Agendar novo horário
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
