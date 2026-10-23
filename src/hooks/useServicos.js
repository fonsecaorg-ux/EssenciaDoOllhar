import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { MOCK_SERVICOS, delay } from '../data/mock.js';

// Retorna o catálogo de serviços. Com Supabase configurado consulta a tabela
// `servicos`; sem credenciais devolve o mock para desenvolvimento visual.
export function useServicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        if (supabase) {
          const { data, error: requestError } = await supabase
            .from('servicos')
            .select('id,nome,descricao,preco,duracao_minutos')
            .order('nome', { ascending: true });

          if (requestError) throw requestError;
          if (active) setServicos(data ?? []);
        } else {
          await delay(400);
          if (active) setServicos(MOCK_SERVICOS);
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

  return { servicos, loading, error };
}
