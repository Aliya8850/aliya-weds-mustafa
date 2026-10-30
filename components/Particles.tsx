"use client";

import { useEffect, useRef } from "react";

type Particle = {
  kind: "dust" | "confetti" | "petal" | "spark";
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  angle: number;
  spin: number;
  phase: number;
  life: number;
  color: string;
};

const GOLDS = ["#f4e1ae", "#d6b26a", "#fff4cf", "#e6c06a"];
// soft, pale tones: the hearts should read as delicate and faded, never bold
const HEARTS = ["#e8a6a1", "#f4c6c0", "#f0b8c4", "#d6b26a", "#fbf3e4"];

/**
 * Ambient gold dust; a confetti/petal burst when the invite is opened; and
 * gold sparkles wherever the guest taps (plus a faint trail behind the mouse).
 */
export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // small heart centred on the origin; s is roughly the half-width
    const heart = (s: number) => {
      ctx.beginPath();
      ctx.moveTo(0, s * 0.9);
      ctx.bezierCurveTo(-s * 1.3, s * 0.1, -s * 0.9, -s * 0.9, 0, -s * 0.35);
      ctx.bezierCurveTo(s * 0.9, -s * 0.9, s * 1.3, s * 0.1, 0, s * 0.9);
      ctx.closePath();
    };

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const dust = (anywhere: boolean): Particle => ({
      kind: "dust",
      x: rnd(0, w),
      y: anywhere ? rnd(0, h) : h + 10,
      vx: rnd(-0.12, 0.12),
      vy: rnd(-0.45, -0.1),
      r: rnd(0.6, 2),
      angle: 0,
      spin: 0,
      phase: rnd(0, Math.PI * 2),
      life: Infinity,
      color: pick(GOLDS),
    });

    const sparkle = (x: number, y: number, n: number) => {
      if (reduce) return;
      for (let i = 0; i < n; i++) {
        const a = rnd(0, Math.PI * 2);
        const s = rnd(1, 3.8);
        particles.push({
          kind: "spark",
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 0.6,
          r: rnd(1.2, 2.8),
          angle: 0,
          spin: 0,
          phase: 0,
          life: rnd(26, 48),
          color: pick(HEARTS),
        });
      }
    };

    const burst = () => {
      if (reduce) return;
      for (let i = 0; i < 70; i++) {
        const a = rnd(-Math.PI, 0);
        const s = rnd(6, 17);
        particles.push({
          kind: "confetti",
          x: w / 2,
          y: h * 0.55,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          r: rnd(3.5, 7),
          angle: rnd(-0.4, 0.4),
          spin: rnd(-0.03, 0.03),
          phase: rnd(0, 6),
          life: rnd(110, 200),
          color: pick(HEARTS),
        });
      }
      for (let i = 0; i < 28; i++) {
        particles.push({
          kind: "petal",
          x: rnd(0, w),
          y: rnd(-h * 0.6, -10),
          vx: rnd(-0.4, 0.4),
          vy: rnd(0.8, 1.8),
          r: rnd(4, 8),
          angle: rnd(-0.4, 0.4),
          spin: rnd(-0.015, 0.015),
          phase: rnd(0, 6),
          life: 700,
          color: pick(HEARTS),
        });
      }
    };

    const count = Math.min(40, Math.round(window.innerWidth / 30));
    resize();
    if (!reduce) for (let i = 0; i < count; i++) particles.push(dust(true));

    let lastTrail = 0;
    const onDown = (e: PointerEvent) => sparkle(e.clientX, e.clientY, 16);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - lastTrail < 45) return;
      lastTrail = now;
      sparkle(e.clientX, e.clientY, 1);
    };

    let t = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      t += 1;
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.kind === "dust") {
          if (p.y < -10) Object.assign(p, dust(false));
          ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.02 + p.phase));
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          continue;
        }

        if (p.kind === "spark") {
          p.life -= 1;
          p.vy += 0.04;
          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }
          ctx.globalAlpha = Math.min(0.55, p.life / 50);
          ctx.fillStyle = p.color;
          ctx.save();
          ctx.translate(p.x, p.y);
          heart(p.r * 1.7);
          ctx.fill();
          ctx.restore();
          continue;
        }

        p.life -= 1;
        p.angle += p.spin;
        if (p.kind === "confetti") {
          p.vy += 0.16;
          p.vx *= 0.975;
          p.vy *= 0.975;
        } else {
          p.x += Math.sin(t * 0.03 + p.phase) * 0.7;
        }
        if (p.life <= 0 || p.y > h + 20) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.min(0.55, p.life / 60);
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle + Math.sin(t * 0.04 + p.phase) * 0.25);
        heart(p.r);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("invite:burst", burst);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("invite:burst", burst);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] h-full w-full"
    />
  );
}
