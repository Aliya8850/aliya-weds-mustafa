"use client";

import { useSyncExternalStore } from "react";

type Target = { id: string; title: string; start: string };

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 1000);
  return () => window.clearInterval(id);
};
const getNow = () => Math.floor(Date.now() / 1000);
// `null` on the server and during hydration: no time-dependent markup is prerendered.
const getServerNow = () => null;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ targets }: { targets: Target[] }) {
  const now = useSyncExternalStore<number | null>(subscribe, getNow, getServerNow);

  const next =
    now === null ? targets[0] : targets.find((t) => Date.parse(t.start) / 1000 > now);

  if (now !== null && !next) {
    return (
      <p className="font-script gold-text py-6 text-center text-4xl sm:text-5xl">
        Alhamdulillah — thank you for your duas &amp; presence
      </p>
    );
  }

  const left = now === null || !next ? null : Math.max(0, Date.parse(next.start) / 1000 - now);
  const parts: [string, string][] = [
    ["Days", left === null ? "--" : pad(Math.floor(left / 86400))],
    ["Hours", left === null ? "--" : pad(Math.floor((left % 86400) / 3600))],
    ["Minutes", left === null ? "--" : pad(Math.floor((left % 3600) / 60))],
    ["Seconds", left === null ? "--" : pad(Math.floor(left % 60))],
  ];

  return (
    <div>
      <p className="font-display mb-8 text-center text-xs uppercase tracking-[0.4em] text-gold sm:text-sm">
        Counting down to the {next?.title}
      </p>
      <div
        className="flex flex-wrap justify-center gap-3 sm:gap-6"
        role="timer"
        aria-label={`Time remaining until the ${next?.title}`}
      >
        {parts.map(([label, value]) => (
          <div key={label} className="cd-box gold-border sm:min-w-28" style={{ perspective: 600 }}>
            <span
              key={value}
              className="flip-in font-display gold-text text-4xl font-semibold sm:text-6xl"
            >
              {value}
            </span>
            <p className="font-display mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-ivory/70 sm:text-xs">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
