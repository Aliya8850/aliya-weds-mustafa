import type { CSSProperties } from "react";

/** Shared SVG gradient — render once per page, referenced as url(#goldGrad) */
export function SvgDefs() {
  return (
    <svg width="1" height="1" className="pointer-events-none absolute opacity-0" aria-hidden focusable="false">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4e1ae" />
          <stop offset="0.5" stopColor="#d6b26a" />
          <stop offset="1" stopColor="#97702a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="divider-line h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-28" />
      <svg viewBox="0 0 24 24" className="h-4 w-4">
        <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" fill="url(#goldGrad) #d6b26a" />
      </svg>
      <span className="divider-line h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-28" />
    </div>
  );
}

/** Staggered, gold-shimmering letters (start when the gate opens). Each letter hovers on its own. */
export function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span aria-label={text} className="inline-block">
      {[...text].map((c, i) => (
        <span key={i} className="hl" aria-hidden>
          <span className="letter hero-anim" style={{ "--i": offset + i } as CSSProperties}>
            {c}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Letters that rise out of a blur when their parent <Reveal> scrolls into view. */
export function RiseText({ text, offset = 0 }: { text: string; offset?: number }) {
  let n = offset;
  return (
    <span aria-label={text} className="inline-block">
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {[...word].map((c, i) => (
            <span key={i} aria-hidden className="rise" style={{ "--i": n++ } as CSSProperties}>
              {c}
            </span>
          ))}
          {" "}
        </span>
      ))}
    </span>
  );
}

/** Gold line-art floral sprig for envelope corners (draws from the top-left; rotate to place). */
export function Sprig({ className = "" }: { className?: string }) {
  const leaf = (x: number, y: number, r: number, k: number) => (
    <path
      key={`${x}-${y}`}
      d="M0 0q9-15 22-7q-6 14-22 7z"
      transform={`translate(${x} ${y}) rotate(${r}) scale(${k})`}
      fill="rgba(214,178,106,0.18)"
    />
  );
  const flower = (x: number, y: number, k: number) => (
    <g key={`f${x}`} transform={`translate(${x} ${y}) scale(${k})`}>
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-7" rx="3.6" ry="7" transform={`rotate(${i * 60})`} fill="rgba(214,178,106,0.16)" />
      ))}
      <circle r="2.6" fill="url(#goldGrad) #d6b26a" stroke="none" />
    </g>
  );
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="url(#goldGrad) #d6b26a"
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
