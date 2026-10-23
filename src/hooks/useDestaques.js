import { useEffect, useState } from 'react';
import { MOCK_DESTAQUES, delay } from '../data/mock.js';

// Conteúdo da vitrine "Antes e Depois". Pode evoluir para uma tabela
// `galeria` + bucket público no Supabase Storage.
export function useDestaques() {
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      await delay(300);
      if (active) {
        setDestaques(MOCK_DESTAQUES);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { destaques, loading };
}
