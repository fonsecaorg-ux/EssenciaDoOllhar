export default function SectionTitle({ children, action, className = '' }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${className}`}>
      <h2 className="font-serif text-[19px] leading-none tracking-[0.02em] text-cocoa-900">
        {children}
      </h2>
      {action}
    </div>
  );
}
