/**
 * Scroll-voortgangsbalk, volledig CSS via scroll-driven animations
 * (animation-timeline: scroll()). Geen JavaScript en geen scroll-listener.
 * Browsers zonder support tonen de balk simpelweg niet (progressive
 * enhancement, geregeld in globals.css).
 */
export default function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gradient-to-r from-ink-deep via-primary to-magenta"
    />
  );
}
