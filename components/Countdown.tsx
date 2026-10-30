"use client";

import { useSyncExternalStore } from "react";

type Target = { id: string; title: string; start: string; when: string };

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 1000);
  return () => window.clearInterval(id);
};
const getNow = () => Math.floor(Date.now() / 1000);
// `null` on the server and during hydration: no time-dependent markup is prerendered.
const getServerNow = () => null;

const pad = (n: number) => String(n).padStart(2, "0");

const R = 52;
const C = 2 * Math.PI * R;

function Ring({
  label,
  value,
  max,
  smooth = false,
}: {
  label: string;
  value: number | null;
  max: number;
  smooth?: boolean;
}) {
  const frac = value === null ? 0 : Math.min(value / max, 1);
  return (
    <div className="flex flex-col items-center">
      <div className="cd-ring">
        <svg viewBox="0 0 120 120" aria-hidden>
          <circle className="cd-track" cx="60" cy="60" r={R} />
          <circle
            className={`cd-bar ${smooth ? "smooth" : ""}`}
            cx="60"
            cy="60"
            r={R}
            strokeDasharray={C}
            strokeDashoffset={C * (1 - frac)}
          />
        </svg>
        <span className="cd-num">
          <span key={value ?? "x"} className="flip-in gold-text">
            {value === null ? "--" : pad(value)}
          </span>
        </span>
      </div>
      <p className="font-display mt-4 text-[0.65rem] uppercase tracking-[0.35em] text-ivory/75 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export default function Countdown({ targets }: { targets: Target[] }) {
  const now = useSyncExternalStore<number | null>(subscribe, getNow, getServerNow);

  const next =
    now === null ? targets[0] : targets.find((t) => Date.parse(t.start) / 1000 > now);

  if (now !== null && !next) {
    return (
      <p className="font-script gold-text py-6 text-center text-4xl sm:text-6xl">
        Alhamdulillah — thank you for your duas &amp; presence
      </p>
    );
  }

  const left = now === null || !next ? null : Math.max(0, Date.parse(next.start) / 1000 - now);
  const d = left === null ? null : Math.floor(left / 86400);
  const h = left === null ? null : Math.floor((left % 86400) / 3600);
  const m = left === null ? null : Math.floor((left % 3600) / 60);
  const s = left === null ? null : Math.floor(left % 60);

  return (
    <div>
      <p className="font-display text-center text-xs uppercase tracking-[0.4em] text-gold sm:text-sm">
        Counting down to the
      </p>
      <h2 className="font-script gold-text mt-3 text-center text-5xl sm:text-7xl">{next?.title}</h2>

      <div
        className="mx-auto mt-12 grid max-w-3xl grid-cols-2 justify-items-center gap-x-4 gap-y-10 sm:grid-cols-4"
        role="timer"
        aria-label={`Time remaining until the ${next?.title}`}
      >
        <Ring label="Days" value={d} max={90} />
        <Ring label="Hours" value={h} max={24} />
        <Ring label="Minutes" value={m} max={60} />
        <Ring label="Seconds" value={s} max={60} smooth />
      </div>

      <p className="mt-12 text-center text-lg italic text-ivory/75">{next?.when}</p>
    </div>
  );
}
