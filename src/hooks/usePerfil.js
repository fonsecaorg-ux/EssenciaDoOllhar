import { useEffect, useState } from 'react';
import { MOCK_GALERIA, MOCK_PERFIL, delay } from '../data/mock.js';

// Perfil institucional da Kezia. Quando existir uma tabela `perfil` (ou CMS),
// basta trocar o mock pela consulta mantendo o mesmo formato de retorno.
export function usePerfil() {
  const [perfil, setPerfil] = useState(MOCK_PERFIL);
  const [galeria, setGaleria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      await delay(350);
      if (active) {
        setPerfil(MOCK_PERFIL);
        setGaleria(MOCK_GALERIA);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { perfil, galeria, loading };
}
