import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader.jsx';
import ServiceCard from '../components/ui/ServiceCard.jsx';
import Button from '../components/ui/Button.jsx';
import { useServicos } from '../hooks/useServicos.js';
import { brl } from '../lib/format.js';

export default function ServicesPage() {
  const navigate = useNavigate();
  const { servicos, loading, error } = useServicos();
  const [selected, setSelected] = useState(null);

  const selectedService = servicos.find((servico) => servico.id === selected);

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Serviços" subtitle="Feitos para o seu olhar" />

      <div className="flex-1 px-5 pt-5">
        <p className="px-1 text-[11px] leading-relaxed text-taupe-600">
          Escolha o cuidado de hoje e reserve seu horário.
        </p>

        <div className="mt-4 space-y-3 pb-5">
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-[78px] animate-pulse rounded-2xl bg-cream-200/80" />
            ))}

          {!loading && error && (
            <div className="rounded-2xl border border-blush/60 bg-blush/10 px-4 py-3 text-[11px] leading-relaxed text-[#a4655c]">
              Não foi possível carregar os serviços. Tente novamente em instantes.
            </div>
          )}

          {!loading &&
            !error &&
            servicos.map((servico) => (
              <ServiceCard
                key={servico.id}
                servico={servico}
                selected={selectedService?.id === servico.id}
                onSelect={(item) => setSelected(item.id)}
              />
            ))}
        </div>
      </div>

      {/* CTA fixo acima da tab bar, como na referência */}
      <div className="sticky bottom-0 z-20 border-t border-cream-300 bg-cream/90 px-5 py-3 backdrop-blur">
        <Button
          disabled={!selectedService}
          onClick={() => navigate(`/agendar?servico=${selectedService.id}`)}
        >
          {selectedService ? `Continuar · ${brl(selectedService.preco)}` : 'Selecione um serviço'}
        </Button>
      </div>
    </div>
  );
}
