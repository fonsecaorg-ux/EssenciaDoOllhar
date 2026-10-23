import { useId } from 'react';

// Traço dourado do olho/sobrancelha, inspirado no logo da marca.
// O blush suave ao fundo é opcional para não pesar em tamanhos pequenos.
export default function BrandMark({ className = '', withBlush = true }) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const goldId = `gold-${id}`;
  const blushId = `blush-${id}`;

  return (
    <svg
      viewBox="0 0 260 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Essência do Olhar"
    >
      <defs>
        <linearGradient id={goldId} x1="40" y1="30" x2="210" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e7cf9b" />
          <stop offset="0.5" stopColor="#c5a15c" />
          <stop offset="1" stopColor="#a9873f" />
        </linearGradient>
        <radialGradient id={blushId} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#e9c7c0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e9c7c0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {withBlush && <ellipse cx="138" cy="98" rx="72" ry="42" fill={`url(#${blushId})`} />}

      <g stroke={`url(#${goldId})`} strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 68c34-38 92-48 142-33 22 7 38 19 48 33" strokeWidth="2.1" />
        <path d="M46 61c34-29 88-37 134-24 16 5 28 12 37 21" strokeWidth="1.7" opacity="0.85" />
        <path d="M66 55c28-21 71-27 108-17" strokeWidth="1.4" opacity="0.62" />

        <path d="M62 97c28-25 104-25 132 0-28 25-104 25-132 0Z" strokeWidth="2.2" />
        <circle cx="128" cy="97" r="16" strokeWidth="1.9" />
        <path
          d="M128 88c9 0 13 8 9 13-4 5-12 2-12-3 0-3 3-5 6-5"
          strokeWidth="1.6"
          opacity="0.9"
        />

        <path
          d="M74 86l-5-7M91 78l-3-8M110 73l-1-8M128 71v-8M147 73l2-8M165 79l4-8M182 87l6-6"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <path
          d="M84 108l-4 6M104 115l-2 7M128 117v7M152 115l2 7M172 108l5 6"
          strokeWidth="1.2"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}
