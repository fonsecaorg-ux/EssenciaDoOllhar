import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { supabase } from '../lib/supabase.js';
import { MOCK_AGENDAMENTOS, delay } from '../data/mock.js';
import {
  addSessionAppointment,
  getSessionAppointments,
  subscribe,
} from '../lib/appointmentsStore.js';

const SELECT_FIELDS =
  'id,data_hora,status,observacoes,servico_id,profissional_id,servicos(nome,preco,duracao_minutos),profissionais(nome)';

export function useAgendamentos() {
  // Agendamentos criados nesta sessão (funciona como cache otimista).
  const sessionAppointments = useSyncExternalStore(
    subscribe,
    getSessionAppointments,
    getSessionAppointments
  );

  const [remoteAppointments, setRemoteAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        if (supabase) {
          // A policy de SELECT é restrita à equipe (app_metadata.role = 'staff').
          // Para o histórico do cliente, use uma RPC autenticada.
          const { data, error: requestError } = await supabase
            .from('agendamentos')
            .select(SELECT_FIELDS)
            .order('data_hora', { ascending: true });

          if (requestError) throw requestError;
          if (active) setRemoteAppointments(data ?? []);
        } else {
          await delay(450);
          if (active) setRemoteAppointments(MOCK_AGENDAMENTOS);
        }
      } catch (requestError) {
        if (active) setError(requestError);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const agendamentos = useMemo(() => {
    const all = [...sessionAppointments, ...remoteAppointments];
    return all.sort((a, b) => new Date(a.data_hora) - new Date(b.data_hora));
  }, [sessionAppointments, remoteAppointments]);

  // Cria o agendamento pelo fluxo público (RPC security definer do banco),
  // que também cadastra/atualiza o cliente pelo telefone.
  const criar = useCallback(async ({ cliente, servico, profissional, dataHora, observacoes }) => {
    if (supabase) {
      const { data, error: requestError } = await supabase.rpc('criar_agendamento', {
        p_nome: cliente.nome,
        p_telefone: cliente.telefone,
        p_email: cliente.email ?? null,
        p_servico_id: servico.id,
        p_profissional_id: profissional.id,
        p_data_hora: dataHora,
        p_observacoes: observacoes || null,
      });

      if (requestError) throw requestError;

      return {
        id: data,
        data_hora: dataHora,
        status: 'pendente',
        servicos: { nome: servico.nome },
        profissionais: { nome: profissional.nome },
      };
    }

    await delay(850);
    const created = {
      id: `local-${Date.now()}`,
      data_hora: dataHora,
      status: 'pendente',
      observacoes: observacoes || null,
      servicos: {
        nome: servico.nome,
        preco: servico.preco,
        duracao_minutos: servico.duracao_minutos,
      },
      profissionais: { nome: profissional.nome },
    };

    addSessionAppointment(created);
    return created;
  }, []);

  return { agendamentos, loading, error, criar };
}
