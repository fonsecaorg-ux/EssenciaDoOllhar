// Assinatura da marca: serifada para o nome e sans com tracking amplo
// para o nome da profissional e o descritivo.
export default function BrandWordmark({ className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      <p className="whitespace-nowrap font-serif text-[clamp(20px,6.1vw,26px)] leading-none tracking-[0.13em] text-cocoa-900">
        ESSÊNCIA DO OLHAR
      </p>
      <p className="mt-3 text-[9.5px] font-medium uppercase tracking-[0.42em] text-cocoa-800">
        Kezia Fonseca
      </p>
      <p className="mt-1.5 text-[8px] uppercase tracking-[0.3em] text-taupe-600">
        Sobrancelhas &amp; Estética
      </p>
    </div>
  );
}
