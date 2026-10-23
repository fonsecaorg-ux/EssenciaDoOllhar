import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, ChevronRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Button from '../components/ui/Button.jsx';
import BottomSheet from '../components/ui/BottomSheet.jsx';
import DatePickerSheet from '../components/ui/DatePickerSheet.jsx';
import { useServicos } from '../hooks/useServicos.js';
import { useProfissionais } from '../hooks/useProfissionais.js';
import { useAgendamentos } from '../hooks/useAgendamentos.js';
import { getSlots, toTimestamp } from '../lib/availability.js';
import { brl, formatDuration, initials } from '../lib/format.js';
import { formatFullDate, startOfDay } from '../lib/date.js';

const inputClass =
  'mt-1.5 h-12 w-full rounded-xl border border-cream-300 bg-cream-50 px-4 text-[13px] text-cocoa-900 outline-none transition placeholder:text-taupe-400 focus:border-gold-400 focus:ring-2 focus:ring-gold-300/30';

// Folha de confirmação: resume o horário e coleta os dados do cliente.
function ConfirmSheet({ open, onClose, resumo, onConfirm, submitting, error }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const digits = telefone.replace(/\D/g, '');
  const canSubmit = nome.trim().length >= 3 && digits.length >= 10;

  return (
    <BottomSheet
      open={open}
      title="Confirmar agendamento"
      onClose={onClose}
      footer={
        <div className="space-y-3">
          {error && <p className="text-center text-[11px] leading-relaxed text-[#a4655c]">{error}</p>}

          <Button
            loading={submitting}
            disabled={!canSubmit}
            onClick={() => onConfirm({ nome: nome.trim(), telefone: telefone.trim() })}
          >
            Confirmar
          </Button>

          <p className="text-center text-[9.5px] leading-relaxed text-taupe-500">
            A Kezia confirma o horário pelo WhatsApp cadastrado.
          </p>
        </div>
      }
    >
      <div className="rounded-2xl bg-cream-200/60 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-serif text-[15px] leading-tight text-cocoa-900">
              {resumo.servico}
            </p>
            <p className="mt-0.5 truncate text-[10.5px] text-taupe-600">{resumo.profissional}</p>
          </div>
          <p className="shrink-0 text-[13px] font-semibold text-cocoa-900">{resumo.preco}</p>
        </div>

        <div className="mt-2 border-t border-cream-300/80 pt-2 text-[10.5px] text-taupe-600">
          {resumo.data} · {resumo.horario}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-[8.5px] font-medium uppercase tracking-[0.22em] text-taupe-500">
            Nome completo
          </span>
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="text-[8.5px] font-medium uppercase tracking-[0.22em] text-taupe-500">
            WhatsApp
          </span>
          <input
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            className={inputClass}
          />
        </label>
      </div>
    </BottomSheet>
  );
}

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { servicos, loading: loadingServices, error: servicesError } = useServicos();
  const { profissionais } = useProfissionais();
  const { criar } = useAgendamentos();

  const [servicoId] = useState(() => searchParams.get('servico') || '');
  const [profissionalId, setProfissionalId] = useState('');
  const [data, setData] = useState(() => startOfDay());
  const [horario, setHorario] = useState(null);
  const [observacoes, setObservacoes] = useState('');
  const [dateOpen, setDateOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(null);

  const servico = servicos.find((item) => item.id === servicoId) ?? servicos[0];
  const profissional =
    profissionais.find((item) => item.id === profissionalId) ?? profissionais[0];

  const slots = useMemo(() => getSlots(data, profissional?.id), [data, profissional?.id]);

  // Trocar de data ou profissional invalida o horário escolhido.
  useEffect(() => {
    setHorario(null);
  }, [data, profissional?.id]);

  async function handleConfirm({ nome, telefone }) {
    if (!servico || !profissional || !horario) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const created = await criar({
        cliente: { nome, telefone },
        servico,
        profissional,
        dataHora: toTimestamp(data, horario),
        observacoes,
      });

      setConfirmOpen(false);
      setSuccess({
        ...created,
        servico: servico.nome,
        profissional: profissional.nome,
        data,
        horario,
      });
    } catch (requestError) {
      setSubmitError(
        requestError?.message || 'Não foi possível concluir o agendamento. Tente novamente.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingServices) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader
          title="Agendamento Fácil"
          subtitle="Escolha data e horário"
          onBack={() => navigate('/servicos')}
        />
        <div className="space-y-3 px-5 pt-5">
          {[112, 76, 120, 150].map((height, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl bg-cream-200/80"
              style={{ height }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (servicesError || !servico) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader
          title="Agendamento Fácil"
          subtitle="Escolha data e horário"
          onBack={() => navigate('/servicos')}
        />
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="font-serif text-lg text-cocoa-900">Serviços indisponíveis</p>
          <p className="mt-1 text-[11px] leading-relaxed text-taupe-600">
            Não conseguimos carregar o catálogo agora. Volte e tente novamente.
          </p>
          <Button className="mt-5" onClick={() => navigate('/servicos')}>
            Escolher serviço
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-cream">
      <PageHeader
        title="Agendamento Fácil"
        subtitle="Escolha data e horário"
        onBack={() => navigate('/servicos')}
      />

      <div className="flex-1 px-5 pt-5">
        {/* Serviço escolhido */}
        <section className="rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[8.5px] uppercase tracking-[0.22em] text-taupe-500">Serviço</p>
              <h2 className="mt-1 truncate font-serif text-[17px] leading-tight text-cocoa-900">
                {servico.nome}
              </h2>
              <p className="mt-1 text-[10.5px] text-taupe-600">
                {formatDuration(servico.duracao_minutos)} · {brl(servico.preco)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/servicos')}
              className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-700 underline-offset-4 transition hover:underline"
            >
              Trocar
            </button>
          </div>
        </section>

        {/* Profissional (quando houver mais de um, vira seletor) */}
        {profissionais.length > 1 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {profissionais.map((item) => {
              const active = profissional?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProfissionalId(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[11px] transition ${
                    active
                      ? 'border-cocoa-900 bg-cocoa-900 text-cream-50'
                      : 'border-cream-300 bg-cream-50 text-cocoa-800'
                  }`}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-cream-200/70 font-serif text-[9px] text-cocoa-800">
                    {initials(item.nome)}
                  </span>
                  {item.nome}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-taupe-500/15 font-serif text-[12px] text-taupe-700">
              {initials(profissional?.nome)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[8.5px] uppercase tracking-[0.22em] text-taupe-500">Profissional</p>
              <p className="mt-0.5 truncate text-[13px] text-cocoa-900">{profissional?.nome}</p>
            </div>
          </div>
        )}

        {/* Data */}
        <div className="mt-5">
          <SectionTitle className="text-[15px]">Data</SectionTitle>
          <button
            type="button"
            onClick={() => setDateOpen(true)}
            className="mt-2 flex h-[52px] w-full items-center justify-between rounded-2xl border border-cream-300 bg-cream-50 px-4 text-left transition hover:border-gold-400"
          >
            <span className="flex min-w-0 items-center gap-3">
              <CalendarDays className="h-4 w-4 shrink-0 text-gold-600" strokeWidth={1.6} />
              <span className="truncate text-[13px] text-cocoa-900">{formatFullDate(data)}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-taupe-400" />
          </button>
        </div>

        {/* Horários */}
        <div className="mt-5">
          <SectionTitle className="text-[15px]">Horário</SectionTitle>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {slots.map((slot) => {
              const active = horario === slot.time;

              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setHorario(slot.time)}
                  aria-pressed={active}
                  className={`h-11 rounded-xl border text-[12.5px] font-medium tabular-nums transition ${
                    active
                      ? 'border-cocoa-900 bg-cocoa-900 text-cream-50 shadow-soft'
                      : slot.available
                        ? 'border-cream-300 bg-cream-50 text-cocoa-800 hover:border-gold-400'
                        : 'border-cream-300/60 bg-cream-200/40 text-taupe-400 line-through'
                  }`}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>

          {!slots.some((slot) => slot.available) && (
            <p className="mt-3 text-[11px] text-taupe-600">
              Sem horários neste dia. Escolha outra data.
            </p>
          )}
        </div>

        {/* Observações */}
        <div className="mt-5">
          <label
            htmlFor="observacoes"
            className="text-[8.5px] font-medium uppercase tracking-[0.22em] text-taupe-500"
          >
            Observações{' '}
            <span className="normal-case tracking-normal text-taupe-400">(opcional)</span>
          </label>
          <textarea
            id="observacoes"
            rows={2}
            value={observacoes}
            onChange={(event) => setObservacoes(event.target.value)}
            placeholder="Alguma preferência ou observação?"
            className="mt-2 w-full resize-none rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3 text-[13px] leading-relaxed text-cocoa-900 outline-none transition placeholder:text-taupe-400 focus:border-gold-400 focus:ring-2 focus:ring-gold-300/30"
          />
        </div>
      </div>

      {/* CTA fixo */}
      <div className="sticky bottom-0 z-20 mt-6 border-t border-cream-300 bg-cream/90 px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 backdrop-blur">
        <Button
          disabled={!horario}
          onClick={() => {
            setSubmitError('');
            setConfirmOpen(true);
          }}
        >
          Agendar
        </Button>
      </div>

      <DatePickerSheet
        open={dateOpen}
        value={data}
        onClose={() => setDateOpen(false)}
        onConfirm={(nextDate) => {
          setData(nextDate);
          setDateOpen(false);
        }}
      />

      <ConfirmSheet
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        resumo={{
          servico: servico.nome,
          profissional: profissional?.nome ?? '',
          data: formatFullDate(data),
          horario: horario ?? '--:--',
          preco: brl(servico.preco),
        }}
        onConfirm={handleConfirm}
        submitting={submitting}
        error={submitError}
      />

      {/* Confirmação final */}
      {success && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-cocoa-900/50 px-6 backdrop-blur-sm">
          <div className="w-full max-w-[360px] animate-[scale-in_0.28s_ease-out] rounded-[28px] bg-cream px-6 py-8 text-center shadow-2xl">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-300/30 text-gold-600">
              <Check className="h-7 w-7" strokeWidth={1.6} />
            </div>

            <h2 className="mt-5 font-serif text-2xl leading-tight text-cocoa-900">
              Agendamento solicitado
            </h2>
            <p className="mt-2 text-[12px] leading-relaxed text-taupe-600">
              Guardamos seu horário como <span className="text-cocoa-900">pendente</span>. A Kezia
              confirma em breve pelo WhatsApp.
            </p>

            <div className="mt-5 rounded-2xl bg-cream-200/60 px-4 py-3 text-left">
              <p className="font-serif text-[15px] text-cocoa-900">{success.servico}</p>
              <p className="mt-1 text-[10.5px] text-taupe-600">
                {formatFullDate(success.data)} · {success.horario}
              </p>
            </div>

            <Button className="mt-6" onClick={() => navigate('/agendamentos')}>
              Ver meus agendamentos
            </Button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-4 block w-full text-[9px] uppercase tracking-[0.22em] text-taupe-500 transition hover:text-cocoa-800"
            >
              Voltar ao início
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
