"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Fade-up zodra het element in beeld komt. CSS-transities plus een
 * IntersectionObserver, geen animatielibrary. Zonder JavaScript of onder
 * prefers-reduced-motion staat de inhoud er direct (zie globals.css).
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
    /* Vangnet: vuurt de observer om wat voor reden dan ook niet, dan blijft
       dit blok onzichtbaar en leest de pagina als kapot. Alleen wat nu in
       beeld hangt wordt geforceerd. */
    const vangnet = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-visible");
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
