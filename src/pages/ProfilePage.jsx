import { useRef } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Instagram, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandMark from '../components/brand/BrandMark.jsx';
import Photo from '../components/ui/Photo.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import ScrollCarousel from '../components/ui/ScrollCarousel.jsx';
import BeforeAfterCard from '../components/ui/BeforeAfterCard.jsx';
import ContactActions from '../components/ui/ContactActions.jsx';
import { CONTATO } from '../data/contato.js';
import { usePerfil } from '../hooks/usePerfil.js';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { perfil, galeria } = usePerfil();
  const carouselRef = useRef(null);

  const moveGallery = (direction) => {
    const element = carouselRef.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.7, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Cabeçalho taupe com marca d'água dourada e foto sobreposta */}
      <div className="relative bg-taupe-500 px-5 pb-14 pt-3 text-cream-50">
        <BrandMark
          withBlush={false}
          className="pointer-events-none absolute -right-7 top-0 h-44 w-44 opacity-20"
        />

        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Voltar"
            className="grid h-9 w-9 place-items-center rounded-full bg-cream-50/10 transition hover:bg-cream-50/20"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
          </button>

          <p className="text-[8.5px] uppercase tracking-[0.3em] text-cream-100/85">Perfil da Kezia</p>

          <span className="h-9 w-9" aria-hidden="true" />
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <Photo
            src={perfil.foto}
            alt={perfil.nome}
            tone={2}
            placeholderText="KF"
            className="h-28 w-28 rounded-full shadow-xl ring-4 ring-cream-50"
          />
        </div>
      </div>

      {/* Conteúdo claro */}
      <div className="flex-1 bg-cream px-6 pb-10 pt-20">
        <div className="text-center">
          <h1 className="font-serif text-[26px] leading-none tracking-[0.04em] text-cocoa-900">
            {perfil.nome}
          </h1>
          <p className="mt-2.5 text-[8.5px] uppercase tracking-[0.32em] text-taupe-600">
            {perfil.subtitulo}
          </p>
          <span className="mx-auto mt-5 block h-px w-12 bg-gold-400/60" />
        </div>

        <section className="mt-7">
          <SectionTitle>Minhas Qualificações</SectionTitle>
          <ul className="mt-3.5 space-y-2.5">
            {perfil.qualificacoes.map((qualificacao) => (
              <li
                key={qualificacao}
                className="flex items-start gap-2.5 text-[12.5px] leading-snug text-cocoa-800"
              >
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                {qualificacao}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <SectionTitle>Antes e Depois</SectionTitle>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => moveGallery(-1)}
                aria-label="Fotos anteriores"
                className="grid h-7 w-7 place-items-center rounded-full border border-cream-300 bg-cream-50 text-taupe-600 transition hover:border-taupe-300"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => moveGallery(1)}
                aria-label="Próximas fotos"
                className="grid h-7 w-7 place-items-center rounded-full border border-cream-300 bg-cream-50 text-taupe-600 transition hover:border-taupe-300"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <ScrollCarousel ref={carouselRef} className="-mx-6 mt-3.5 px-6">
            {galeria.length === 0
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square w-[64%] shrink-0 animate-pulse rounded-2xl bg-cream-200/80"
                  />
                ))
              : galeria.map((item) => (
                  <BeforeAfterCard key={item.id} {...item} className="w-[64%]" />
                ))}
          </ScrollCarousel>
        </section>

        {/* Contato e localização */}
        <section className="mt-8">
          <SectionTitle>Contato &amp; Localização</SectionTitle>

          <ContactActions className="mt-3.5" />

          <div className="mt-3 space-y-2.5 rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3.5">
            <a
              href={`tel:${CONTATO.telefoneE164}`}
              className="flex items-center gap-2.5 text-[11.5px] text-cocoa-800 transition hover:text-gold-700"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={1.7} />
              {CONTATO.telefoneExibicao}
            </a>

            <a
              href={CONTATO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-[11px] leading-snug text-cocoa-800 transition hover:text-gold-700"
            >
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={1.7} />
              {CONTATO.endereco}
            </a>

            <a
              href={CONTATO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-[11.5px] text-cocoa-800 transition hover:text-gold-700"
            >
              <Instagram className="h-3.5 w-3.5 shrink-0 text-gold-600" strokeWidth={1.7} />
              {CONTATO.instagramUsuario}
            </a>
          </div>

          <button
            type="button"
            onClick={() => navigate('/agendar')}
            className="mt-4 flex w-full items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-taupe-500 transition hover:text-cocoa-800"
          >
            <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.7} />
            Agendar pelo app
          </button>
        </section>
      </div>
    </div>
  );
}
