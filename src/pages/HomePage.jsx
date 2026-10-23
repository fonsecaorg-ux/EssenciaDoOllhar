import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandMark from '../components/brand/BrandMark.jsx';
import BrandWordmark from '../components/brand/BrandWordmark.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import ScrollCarousel from '../components/ui/ScrollCarousel.jsx';
import BeforeAfterCard from '../components/ui/BeforeAfterCard.jsx';
import AppFooter from '../components/layout/AppFooter.jsx';
import { useDestaques } from '../hooks/useDestaques.js';

export default function HomePage() {
  const navigate = useNavigate();
  const { destaques, loading } = useDestaques();

  return (
    <div className="flex flex-1 flex-col pb-8">
      {/* Assinatura da marca centralizada, como na referência */}
      <header className="px-8 pt-5 text-center">
        <BrandMark className="mx-auto h-[104px] w-auto" />
        <BrandWordmark className="mt-1" />
        <span className="mx-auto mt-5 block h-px w-14 bg-gold-400/60" />
      </header>

      {/* Vitrine de trabalhos reais */}
      <section className="mt-7">
        <div className="px-6">
          <SectionTitle
            action={
              <button
                type="button"
                onClick={() => navigate('/servicos')}
                className="text-[9.5px] uppercase tracking-[0.16em] text-taupe-500 transition hover:text-cocoa-800"
              >
                Ver serviços
              </button>
            }
          >
            Destaques
          </SectionTitle>
        </div>

        <ScrollCarousel className="mt-4 px-6">
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square w-[68%] shrink-0 animate-pulse rounded-2xl bg-cream-200/80"
                />
              ))
            : destaques.map((item) => (
                <BeforeAfterCard key={item.id} {...item} className="w-[68%]" />
              ))}
        </ScrollCarousel>
      </section>

      {/* Convite para o agendamento */}
      <section className="mt-8 px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-taupe-500 px-6 py-6 text-cream-50 shadow-soft">
          <BrandMark
            withBlush={false}
            className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 opacity-20"
          />

          <p className="relative font-serif text-[21px] leading-snug">
            Pronta para realçar
            <br />o seu olhar?
          </p>
          <p className="relative mt-2 max-w-[215px] text-[11px] leading-relaxed text-cream-100/80">
            Escolha o melhor dia e horário para cuidar de você.
          </p>

          <button
            type="button"
            onClick={() => navigate('/servicos')}
            className="relative mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-cream-100 px-5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-cocoa-900 transition hover:bg-cream-50"
          >
            Agendar agora
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* Empurra o rodapé para o fim da tela em viewports altos */}
      <div className="flex-1" aria-hidden="true" />
      <AppFooter />
    </div>
  );
}
