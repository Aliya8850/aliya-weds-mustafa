"use client";

import { useEffect, useRef } from "react";

/** Text that "fills in" word by word as it scrolls through the screen. */
export default function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".sw"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the text enters at 90% of the screen, 1 once its bottom reaches ~55%
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.35 + r.height)));
      const n = words.length;
      words.forEach((w, i) => {
        const t = Math.min(1, Math.max(0, p * (n + 2) - i));
        w.style.opacity = String(0.18 + 0.82 * t);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="sw">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
