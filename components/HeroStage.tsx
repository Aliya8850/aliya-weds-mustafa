"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The hero. A "torch" glides over the carved lattice wall, following the
 * mouse or a touching finger; when nobody is interacting it drifts on its own.
 * It also writes --px/--py (-1..1) so layers can parallax.
 */
export default function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = 0.5;
    let ty = 0.42;
    let cx = tx;
    let cy = ty;
    let last = -1e9;
    let raf = 0;
    let visible = true;

    const paint = () => {
      el.style.setProperty("--mx", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(cy * 100).toFixed(2)}%`);
      el.style.setProperty("--px", ((cx - 0.5) * 2).toFixed(3));
      el.style.setProperty("--py", ((cy - 0.5) * 2).toFixed(3));
    };
    paint();
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      last = performance.now();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      if (t - last > 2200) {
        tx = 0.5 + 0.34 * Math.sin(t / 2600);
        ty = 0.45 + 0.2 * Math.sin(t / 1900 + 1);
      }
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      paint();
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={ref} id="top" className="hero">
      {children}
    </section>
  );
}
