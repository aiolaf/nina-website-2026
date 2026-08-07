"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Fade-up zodra het element in beeld komt. Puur CSS-transities plus een
 * IntersectionObserver, geen animatielibrary. Zonder JavaScript of onder
 * prefers-reduced-motion is de content direct zichtbaar (zie globals.css).
 */
export default function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    /**
     * Vangnet voor wat al in beeld staat. Vuurt de observer niet, dan blijft
     * dit blok op opacity 0 met een blur van 8px staan, en dat leest als een
     * kapotte pagina. Alleen elementen die nu in de viewport hangen worden
     * geforceerd; wat eronder staat houdt zijn scroll-entree.
     */
    const vangnet = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("is-visible");
      }
    }, 1200);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
          clearTimeout(vangnet);
        }
      },
      { rootMargin: "-60px 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(vangnet);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={
        {
          transitionDelay: delay ? `${delay}s` : undefined,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
