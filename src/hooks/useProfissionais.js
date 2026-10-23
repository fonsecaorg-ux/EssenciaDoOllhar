import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { MOCK_PROFISSIONAIS, delay } from '../data/mock.js';

export function useProfissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        if (supabase) {
          const { data, error: requestError } = await supabase
            .from('profissionais')
            .select('id,nome,especialidade')
            .order('nome', { ascending: true });

          if (requestError) throw requestError;
          if (active) setProfissionais(data ?? []);
        } else {
          await delay(300);
          if (active) setProfissionais(MOCK_PROFISSIONAIS);
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

  return { profissionais, loading, error };
}
