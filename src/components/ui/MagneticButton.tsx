"use client";

import Link from "next/link";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  /** Optioneel, bijvoorbeeld om een dataLayer-event te sturen bij een klik. */
  onClick?: () => void;
  /** Vaste machinenaam voor de klikmeting; zie KlikMeting. */
  "data-cta"?: string;
  /** Categorie voor de klikmeting, bijvoorbeeld "hero". */
  "data-cta-soort"?: string;
};

/**
 * CTA that leans toward the cursor on hover-capable devices. On touch the
 * magnet math never fires (no pointermove before tap), so it behaves as a
 * regular button with an active-state scale.
 */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  ...meting
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onPointerMove(e: ReactPointerEvent) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.25, y: y * 0.35 });
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-[background-color,color,border-color,box-shadow] duration-200 active:scale-[0.97] select-none";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-ink-deep hover:text-white shadow-[0_8px_30px_rgba(97,68,121,0.22)] hover:shadow-[0_10px_36px_rgba(97,68,121,0.3)]",
    ghost:
      "border border-border text-text hover:border-primary hover:text-primary",
  };

  const isInternal = href.startsWith("/") || href.startsWith("#");
  const shared = {
    ...meting,
    ref,
    onPointerMove,
    onClick,
    onPointerLeave: () => setOffset({ x: 0, y: 0 }),
    className: `${base} ${variants[variant]} ${className}`,
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px)`,
      transition:
        offset.x === 0 && offset.y === 0
          ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
          : "transform 0.08s linear",
    },
  };

  if (!isInternal) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...shared}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...shared}>
      {children}
    </Link>
  );
}
