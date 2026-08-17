"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // 0..1 diepte: klein/vaag achteraan, groot/helder vooraan
};

type Pulse = {
  a: number;
  b: number;
  t: number;
  speed: number;
  gold: boolean;
};

/**
 * Neuraal netwerk in canvas, versie 2. Nodes op dieptelagen, edges tussen
 * buren, signaalpulsen die langs edges reizen en de cursor die zelf een
 * node wordt: dichtbijzijnde nodes verbinden zich met het aanwijspunt.
 * Pauzeert buiten beeld en bij verborgen tab; statische frame onder
 * prefers-reduced-motion; faalt stil terug op de CSS-gradient erachter.
 */
export default function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let ripples: { x: number; y: number; r: number }[] = [];
    let raf = 0;
    let running = false;
    let frame = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const NODE_DENSITY = 1 / 13000;
    const LINK_DIST = 150;
    const CURSOR_DIST = 230;
    const MAX_PULSES = 7;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const target = Math.min(Math.round(width * height * NODE_DENSITY), 110);
      while (nodes.length < target) {
        const z = Math.random();
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (0.12 + z * 0.3),
          vy: (Math.random() - 0.5) * (0.12 + z * 0.3),
          z,
        });
      }
      nodes = nodes.slice(0, target);
    }

    function spawnPulse() {
      if (pulses.length >= MAX_PULSES) return;
      const a = Math.floor(Math.random() * nodes.length);
      let best = -1;
      let bestD = Infinity;
      for (let j = 0; j < nodes.length; j++) {
        if (j === a) continue;
        const dx = nodes[a].x - nodes[j].x;
        const dy = nodes[a].y - nodes[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD && d2 < LINK_DIST * LINK_DIST * 1.6) {
          bestD = d2;
          best = j;
        }
      }
      if (best >= 0) {
        pulses.push({
          a,
          b: best,
          t: 0,
          speed: 0.012 + Math.random() * 0.02,
          gold: Math.random() < 0.12,
        });
      }
    }

    function step() {
      frame++;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_DIST * CURSOR_DIST && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = ((CURSOR_DIST - d) / CURSOR_DIST) * 0.018 * (0.4 + n.z);
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }
        n.vx = Math.max(-0.55, Math.min(0.55, n.vx * 0.996));
        n.vy = Math.max(-0.55, Math.min(0.55, n.vy * 0.996));
      }
      if (frame % 30 === 0) spawnPulse();
      pulses = pulses.filter((p) => (p.t += p.speed) < 1);
      ripples = ripples.filter((r) => (r.r += 3.2) < 220);
    }

    /** Klik of tik: kettingreactie vanaf de dichtstbijzijnde nodes. */
    function cascade(cx: number, cy: number) {
      ripples.push({ x: cx, y: cy, r: 8 });
      const near = nodes
        .map((n, i) => ({ i, d: (n.x - cx) ** 2 + (n.y - cy) ** 2 }))
        .filter((n) => n.d < 220 * 220)
        .sort((a, b) => a.d - b.d)
        .slice(0, 8);
      for (const { i } of near) {
        let best = -1;
        let bestD = Infinity;
        for (let j = 0; j < nodes.length; j++) {
          if (j === i) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < bestD) {
            bestD = d2;
            best = j;
          }
        }
        if (best >= 0) {
          pulses.push({
            a: i,
            b: best,
            t: 0,
            speed: 0.02 + Math.random() * 0.025,
            gold: Math.random() < 0.25,
          });
        }
      }
      if (pulses.length > 40) pulses = pulses.slice(-40);
    }

    function draw() {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Edges tussen buren, helderheid stijgt met diepte en cursornabijheid
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const d = Math.sqrt(d2);
          const depth = (a.z + b.z) / 2;
          let alpha = (1 - d / LINK_DIST) * (0.08 + depth * 0.22);
          if (pointer.active) {
            const mx = (a.x + b.x) / 2 - pointer.x;
            const my = (a.y + b.y) / 2 - pointer.y;
            const md = Math.sqrt(mx * mx + my * my);
            if (md < CURSOR_DIST) alpha += (1 - md / CURSOR_DIST) * 0.3;
          }
          ctx.strokeStyle = `rgba(12, 14, 24, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.5 + depth;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Cursor als node: verbindingen naar dichtbijzijnde nodes
      if (pointer.active) {
        for (const n of nodes) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > CURSOR_DIST * CURSOR_DIST) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / CURSOR_DIST) * 0.5;
          ctx.strokeStyle = `rgba(176, 101, 58, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
        const g = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          70
        );
        g.addColorStop(0, "rgba(176, 101, 58, 0.28)");
        g.addColorStop(1, "rgba(176, 101, 58, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 70, 0, Math.PI * 2);
        ctx.fill();
      }

      // Klik-rimpels
      for (const r of ripples) {
        const alpha = (1 - r.r / 220) * 0.35;
        ctx.strokeStyle = `rgba(176, 101, 58, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Signaalpulsen langs edges
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(p.t * Math.PI);
        const color = p.gold ? "232, 150, 62" : "191, 128, 255";
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, `rgba(${color}, ${(0.9 * fade).toFixed(3)})`);
        g.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(12, 14, 24, ${(0.9 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes met dieptegloed
      for (const n of nodes) {
        const r = 0.8 + n.z * 2.2;
        ctx.fillStyle = `rgba(176, 101, 58, ${(0.35 + n.z * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      if (!running) return;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reducedMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onPointerDown(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      cascade(x, y);
    }

    resize();
    if (reducedMotion) {
      draw();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Op window zodat de gloed ook werkt wanneer content boven de canvas ligt
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}
