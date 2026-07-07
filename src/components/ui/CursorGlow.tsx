"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-companion voor apparaten met een muis: een zachte paarse gloed
 * plus een ring die met lerp achter de cursor aan glijdt en uitzet boven
 * interactieve elementen. Native cursor blijft zichtbaar (toegankelijk).
 * Rendert niets op touch-apparaten of onder prefers-reduced-motion.
 */
export default function CursorGlow() {
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!ring || !glow) return;
    ring.style.display = "block";
    glow.style.display = "block";

    let tx = -100;
    let ty = -100;
    let x = -100;
    let y = -100;
    let raf = 0;
    let hot = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const el = e.target as HTMLElement;
      hot = !!el.closest("a, button, [role='tab'], input, [role='button']");
    };

    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      const s = hot ? 2.1 : 1;
      ring.style.transform = `translate(${x - 16}px, ${y - 16}px) scale(${s})`;
      ring.style.borderColor = hot
        ? "rgba(194, 112, 181, 0.6)"
        : "rgba(165, 98, 161, 0.55)";
      glow.style.transform = `translate(${tx - 190}px, ${ty - 190}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-[380px] w-[380px] rounded-full opacity-60"
        style={{
          display: "none",
          background:
            "radial-gradient(circle, rgba(97,68,121,0.09) 0%, transparent 60%)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[71] hidden h-8 w-8 rounded-full border transition-[border-color] duration-200"
        style={{ display: "none" }}
      />
    </>
  );
}
