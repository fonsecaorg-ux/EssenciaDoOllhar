import { useState } from 'react';

// Tons de placeholder em harmonia com a paleta. Usados enquanto não há
// fotos reais (ou quando a URL falha).
const TONES = [
  'from-[#eadbc9] via-[#d9c2ac] to-[#bea48c]',
  'from-[#ecd8d3] via-[#ddc0b8] to-[#c3a096]',
  'from-[#e3dccd] via-[#cebfa9] to-[#ac9481]',
];

export default function Photo({
  src,
  alt = '',
  label,
  tone = 0,
  className = '',
  placeholderText,
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`relative overflow-hidden bg-cream-200 ${className}`}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${TONES[tone % TONES.length]}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.45),transparent_58%)]" />
          <div className="absolute -left-5 bottom-0 h-20 w-20 rounded-full bg-blush/30 blur-2xl" />
          {placeholderText && (
            <span className="absolute inset-0 grid place-items-center font-serif text-2xl text-cocoa-800/40">
              {placeholderText}
            </span>
          )}
        </>
      )}

      {label && (
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-cocoa-900/35 px-2 py-[3px] text-[7.5px] uppercase tracking-[0.16em] text-cream-50 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
