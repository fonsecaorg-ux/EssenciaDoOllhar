import { Instagram, MapPin } from 'lucide-react';
import { CONTATO, whatsappUrl } from '../../data/contato.js';
import WhatsAppIcon from '../icons/WhatsAppIcon.jsx';

const base =
  'flex h-11 items-center justify-center gap-2 rounded-xl px-3 text-[9px] font-semibold uppercase tracking-[0.14em] transition';

export default function ContactActions({ className = '' }) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} bg-cocoa-900 text-cream-50 shadow-soft hover:bg-cocoa-800`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        Agendar pelo WhatsApp
      </a>

      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={CONTATO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border border-cocoa-900/15 bg-cream-50 text-cocoa-900 hover:bg-cream-200`}
        >
          <Instagram className="h-4 w-4" strokeWidth={1.7} />
          Instagram
        </a>

        <a
          href={CONTATO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border border-cocoa-900/15 bg-cream-50 text-cocoa-900 hover:bg-cream-200`}
        >
          <MapPin className="h-4 w-4" strokeWidth={1.7} />
          Como chegar
        </a>
      </div>
    </div>
  );
}
