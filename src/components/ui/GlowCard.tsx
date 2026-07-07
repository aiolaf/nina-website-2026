"use client";

import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
};

/**
 * Kaart met pointer-gevolgde radiale gloed en optionele 3D-tilt. Alles via
 * CSS-variabelen, geen re-renders. Op touch en onder reduced motion is het
 * een gewone kaart.
 */
export default function GlowCard({ children, className = "", tilt = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: ReactPointerEvent) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.setProperty("--glow", "1");
    if (tilt) {
      el.style.setProperty("--ry", `${(px - 0.5) * 5}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * 5}deg`);
    }
  }

  function onPointerLeave() {
    const el = ref.current!;
    el.style.setProperty("--glow", "0");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`glow-card ${className}`}
    >
      {children}
    </div>
  );
}
