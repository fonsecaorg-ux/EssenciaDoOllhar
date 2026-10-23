import { forwardRef } from 'react';

// Trilho horizontal com scroll-snap. O ref é exposto para as setas do perfil
// controlarem o deslocamento.
const ScrollCarousel = forwardRef(function ScrollCarousel({ children, className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`hide-scrollbar flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto ${className}`}
    >
      {children}
    </div>
  );
});

export default ScrollCarousel;
