import { Instagram, MapPin } from 'lucide-react';
import BrandMark from '../brand/BrandMark.jsx';
import WhatsAppIcon from '../icons/WhatsAppIcon.jsx';
import { CONTATO, whatsappUrl } from '../../data/contato.js';

function FooterLink({ href, icon: Icon, label, hint }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2.5 rounded-xl px-2 py-1.5 text-[11px] leading-snug text-cocoa-800 transition hover:bg-cream-200/60"
    >
      <Icon className="mt-[1px] h-3.5 w-3.5 shrink-0 text-gold-600" />
      <span className="min-w-0">
        {hint && (
          <span className="mr-1.5 text-[7.5px] uppercase tracking-[0.16em] text-taupe-500">
            {hint}
          </span>
        )}
        {label}
      </span>
    </a>
  );
}

// Rodapé institucional da Home: contato, localização e redes.
export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-cream-300/80 px-6 pb-7 pt-7">
      <div className="flex flex-col items-center text-center">
        <BrandMark withBlush={false} className="h-14 w-auto" />
        <p className="mt-1 font-serif text-[13px] tracking-[0.16em] text-cocoa-900">
          ESSÊNCIA DO OLHAR
        </p>
        <p className="mt-1 text-[7.5px] uppercase tracking-[0.26em] text-taupe-600">
          Kezia Fonseca · Sobrancelhas &amp; Estética
        </p>
      </div>

      <div className="mt-4 space-y-1">
        <FooterLink
          href={whatsappUrl()}
          icon={WhatsAppIcon}
          hint="WhatsApp"
          label={CONTATO.telefoneExibicao}
        />
        <FooterLink
          href={CONTATO.mapsUrl}
          icon={MapPin}
          hint="Endereço"
          label={CONTATO.endereco}
        />
        <FooterLink
          href={CONTATO.instagramUrl}
          icon={Instagram}
          hint="Instagram"
          label={CONTATO.instagramUsuario}
        />
      </div>

      <p className="mt-4 text-center text-[8px] tracking-[0.12em] text-taupe-500">
        © {year} Essência do Olhar · Todos os direitos reservados
      </p>
    </footer>
  );
}
