import type { CSSProperties } from "react";

/** Shared SVG gradients — render once per page, referenced as url(#goldGrad) etc. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7e6a8" />
          <stop offset="0.5" stopColor="#d9b45b" />
          <stop offset="1" stopColor="#a37c2c" />
        </linearGradient>
        <radialGradient id="lanternGlow" cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor="#fff6cf" />
          <stop offset="0.55" stopColor="#f2b84b" />
          <stop offset="1" stopColor="#b8691a" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Lantern({
  className = "",
  delay = 0,
  length = 40,
}: {
  className?: string;
  delay?: number;
  /** length of the hanging rope in px */
  length?: number;
}) {
  return (
    <div
      className={`swing pointer-events-none absolute top-0 ${className}`}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden
    >
      <div
        className="mx-auto w-px"
        style={{ height: length, background: "linear-gradient(var(--gold-deep), var(--gold))" }}
      />
      <svg viewBox="0 0 60 130" className="lantern-glow w-10 sm:w-14" style={{ animationDelay: `${delay}s` }}>
        <circle cx="30" cy="6" r="4" fill="none" stroke="url(#goldGrad)" strokeWidth="2" />
        <path d="M23 12h14l3 8H20z" fill="url(#goldGrad)" />
        <path d="M17 20h26l7 44c-19 15-41 15-40 0z" fill="url(#lanternGlow)" stroke="url(#goldGrad)" strokeWidth="2" />
        <path d="M24 21l-3 50M36 21l3 50M30 20v56" stroke="#7a5314" strokeOpacity="0.55" strokeWidth="1.4" fill="none" />
        <path d="M15 70h30l-5 9H20z" fill="url(#goldGrad)" />
        <path d="M30 79v14" stroke="url(#goldGrad)" strokeWidth="2" />
        <path d="M30 92l-5 18h10z" fill="url(#goldGrad)" />
      </svg>
    </div>
  );
}

export function Crescent({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`float ${className}`} aria-hidden>
      <defs>
        <mask id="crescentMask">
          <rect width="100" height="100" fill="#fff" />
          <circle cx="64" cy="40" r="34" fill="#000" />
        </mask>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#goldGrad)" mask="url(#crescentMask)" />
      <path
        className="twinkle"
        d="M78 22l2.6 6.4 6.4 2.6-6.4 2.6L78 40l-2.6-6.4-6.4-2.6 6.4-2.6z"
        fill="url(#goldGrad)"
        style={{ transformOrigin: "78px 31px" }}
      />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="divider-line h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-28" />
      <svg viewBox="0 0 24 24" className="twinkle h-5 w-5">
        <path d="M12 1l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="url(#goldGrad)" />
      </svg>
      <span className="divider-line h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-28" />
    </div>
  );
}

/** Staggered, gold-shimmering letters (start when the gate opens). */
export function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span aria-label={text} className="inline-block">
      {[...text].map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="letter hero-anim"
          style={{ "--i": offset + i } as CSSProperties}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "url(#goldGrad)",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-12 w-12",
  "aria-hidden": true,
} as const;

export function EventIcon({ id }: { id: string }) {
  if (id === "haldi") {
    // marigold flower
    return (
      <svg {...iconProps}>
        <circle cx="24" cy="24" r="4" />
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx="24" cy="12" rx="4" ry="8" transform={`rotate(${i * 45} 24 24)`} />
        ))}
      </svg>
    );
  }
  if (id === "nikah") {
    // two interlocked rings
    return (
      <svg {...iconProps}>
        <circle cx="18" cy="28" r="10" />
        <circle cx="30" cy="28" r="10" />
        <path d="M24 10l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" />
      </svg>
    );
  }
  // reception: chandelier / celebration
  return (
    <svg {...iconProps}>
      <path d="M24 4v8M14 12h20l-4 12H18z" />
      <path d="M18 24c0 6 3 8 6 8s6-2 6-8M24 32v8M18 44h12" />
      <path d="M8 18l3 3M40 18l-3 3M6 28h5M37 28h5" />
    </svg>
  );
}

/** Gold line-art floral sprig for envelope corners (draws from the top-left; rotate to place). */
export function Sprig({ className = "" }: { className?: string }) {
  const leaf = (x: number, y: number, r: number, k: number) => (
    <path
      key={`${x}-${y}`}
      d="M0 0q9-15 22-7q-6 14-22 7z"
      transform={`translate(${x} ${y}) rotate(${r}) scale(${k})`}
      fill="rgba(201,162,75,0.18)"
    />
  );
  const flower = (x: number, y: number, k: number) => (
    <g key={`f${x}`} transform={`translate(${x} ${y}) scale(${k})`}>
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-7" rx="3.6" ry="7" transform={`rotate(${i * 60})`} fill="rgba(201,162,75,0.16)" />
      ))}
      <circle r="2.6" fill="url(#goldGrad)" stroke="none" />
    </g>
  );
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="url(#goldGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M4 4C8 40 30 62 62 72S108 96 116 116" />
      <path d="M4 4C34 8 60 24 70 54S90 100 116 116" strokeWidth="0.7" opacity="0.7" />
      {leaf(14, 30, 70, 1)}
      {leaf(22, 54, 40, 1)}
      {leaf(44, 66, 15, 1)}
      {leaf(36, 14, -10, 0.9)}
      {leaf(62, 26, 20, 0.9)}
      {leaf(78, 86, 30, 0.9)}
      {flower(22, 22, 1.3)}
      {flower(70, 54, 0.9)}
      {flower(100, 100, 0.75)}
    </svg>
  );
}

const STARS: [number, number, number, number][] = [
  [8, 12, 10, 0],
  [22, 6, 7, 1.2],
  [36, 15, 9, 0.6],
  [64, 9, 8, 1.8],
  [78, 16, 11, 0.3],
  [92, 8, 7, 2.2],
  [5, 38, 8, 1.5],
  [95, 42, 9, 0.9],
  [10, 66, 7, 2.4],
  [90, 70, 10, 1.1],
  [28, 82, 8, 0.4],
  [72, 86, 7, 1.7],
];

/** Twinkling four-point stars scattered across the night sky of the hero. */
export function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {STARS.map(([x, y, size, d], i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="twinkle absolute"
          style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, animationDelay: `${d}s` }}
        >
          <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="url(#goldGrad)" />
        </svg>
      ))}
    </div>
  );
}
