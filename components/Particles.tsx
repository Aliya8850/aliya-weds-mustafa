"use client";

import { useEffect, useRef } from "react";

type Particle = {
  kind: "dust" | "confetti" | "petal";
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

const GOLDS = ["#f0d98a", "#c9a24b", "#fff3c4", "#e0b84f"];
const CONFETTI = [...GOLDS, "#fbf2dc", "#e8a6a1", "#3b4fa8"];
const PETALS = ["#e8a6a1", "#f4c6c0", "#d9b45b", "#fbf2dc"];

/** Ambient gold dust, plus a confetti/petal burst when the invite is opened. */
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

    const burst = () => {
      if (reduce) return;
      for (let i = 0; i < 170; i++) {
        const a = rnd(-Math.PI, 0);
        const s = rnd(6, 17);
        particles.push({
          kind: "confetti",
          x: w / 2,
          y: h * 0.55,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          r: rnd(3, 7),
          angle: rnd(0, 6),
          spin: rnd(-0.3, 0.3),
          phase: rnd(0, 6),
          life: rnd(110, 200),
          color: pick(CONFETTI),
        });
      }
      for (let i = 0; i < 45; i++) {
        particles.push({
          kind: "petal",
          x: rnd(0, w),
          y: rnd(-h * 0.6, -10),
          vx: rnd(-0.4, 0.4),
          vy: rnd(0.8, 1.8),
          r: rnd(5, 10),
          angle: rnd(0, 6),
          spin: rnd(-0.03, 0.03),
          phase: rnd(0, 6),
          life: 700,
          color: pick(PETALS),
        });
      }
    };

    const count = Math.min(40, Math.round(window.innerWidth / 30));
    resize();
    if (!reduce) for (let i = 0; i < count; i++) particles.push(dust(true));

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

        p.life -= 1;
        p.angle += p.spin;
        if (p.kind === "confetti") {
          p.vy += 0.28;
          p.vx *= 0.985;
          p.vy *= 0.985;
        } else {
          p.x += Math.sin(t * 0.03 + p.phase) * 0.7;
        }
        if (p.life <= 0 || p.y > h + 20) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.min(1, p.life / 40);
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        if (p.kind === "confetti") {
          ctx.scale(1, Math.abs(Math.cos(p.phase + t * 0.15)) + 0.15);
          ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
        } else {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("invite:burst", burst);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("invite:burst", burst);
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
