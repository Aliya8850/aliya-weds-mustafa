"use client";

import { useRef, useState, type ReactNode } from "react";
import GuestName from "./GuestName";
import { Sprig } from "./Ornaments";
import Particles from "./Particles";

/** Slightly irregular, hand-pressed wax outline (deterministic, so SSR matches the client) */
const WAX_PATH = (() => {
  const n = 28;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const r = 44 + 2.4 * Math.sin(i * 2.3) + 1.6 * Math.sin(i * 5.1);
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)] as const;
  });
  const mid = (a: readonly number[], b: readonly number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mid(pts[n - 1], pts[0]);
  let d = `M${start[0].toFixed(2)} ${start[1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    d += `Q${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)} ${m[0].toFixed(2)} ${m[1].toFixed(2)}`;
  }
  return d + "Z";
})();

function WaxSeal() {
  const text = { x: 50, y: 56, textAnchor: "middle" as const, fontSize: 15.5, fontWeight: 700, letterSpacing: 1 };
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id="waxGrad" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#f9e7a8" />
          <stop offset="0.45" stopColor="#d4ac52" />
          <stop offset="1" stopColor="#8f6b22" />
        </radialGradient>
        <radialGradient id="waxInner" cx="0.65" cy="0.7" r="0.9">
          <stop offset="0" stopColor="#f2d584" />
          <stop offset="1" stopColor="#b88a30" />
        </radialGradient>
      </defs>
      <path d={WAX_PATH} fill="url(#waxGrad)" />
      <path d={WAX_PATH} fill="none" stroke="#fff0b8" strokeOpacity="0.5" strokeWidth="0.8" transform="translate(-0.6 -0.6)" />
      <circle cx="50" cy="50" r="31" fill="url(#waxInner)" stroke="#8f6b22" strokeOpacity="0.75" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="27.5" fill="none" stroke="#fff0b8" strokeOpacity="0.55" strokeWidth="0.8" strokeDasharray="1.2 2.4" />
      <g fontFamily="var(--font-cinzel), serif" {...text}>
        <text {...text} fill="#fff0b8" transform="translate(-0.7 -0.8)" opacity="0.9">A&amp;M</text>
        <text {...text} fill="#6b4a0c" transform="translate(0.8 0.9)" opacity="0.85">A&amp;M</text>
        <text {...text} fill="#b88a30">A&amp;M</text>
      </g>
    </svg>
  );
}

/**
 * Wraps the invitation. Shows a sealed envelope: tapping the wax seal lifts
 * the flap, fires a burst of gold confetti, slides the envelope away and
 * starts the hero animations (they wait on `data-open="true"`).
 */
export default function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.play()
      .then(() => {
        setPlaying(true);
        // fade in (iOS ignores volume and simply plays at device volume)
        const id = window.setInterval(() => {
          a.volume = Math.min(0.7, a.volume + 0.05);
          if (a.volume >= 0.7) window.clearInterval(id);
        }, 120);
      })
      .catch(() => {
        // autoplay blocked or file unavailable — the toggle button stays available
      });
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.volume = 0.7;
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const openGate = () => {
    if (open) return;
    setOpen(true);
    startMusic();
    window.setTimeout(() => window.dispatchEvent(new Event("invite:burst")), 700);
    window.setTimeout(() => setGone(true), 2700);
  };

  return (
    <div data-open={open}>
      {!gone && (
        <div className={`gate ${open ? "open" : ""}`}>
          <div className="env">
            <Sprig className="env-corner left-3 top-3" />
            <Sprig className="env-corner right-3 top-3 -scale-x-100" />
            <Sprig className="env-corner bottom-3 left-3 -scale-y-100" />
            <Sprig className="env-corner bottom-3 right-3 rotate-180" />

            <div className="flap" aria-hidden>
              <svg viewBox="0 0 100 60" preserveAspectRatio="none">
                <polygon
                  points="0,0 100,0 50,60"
                  fill="#3d0c1e"
                  stroke="#d6b26a"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <polygon
                  points="6,0 94,0 50,53"
                  fill="none"
                  stroke="#d6b26a"
                  strokeOpacity="0.4"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <button
              type="button"
              onClick={openGate}
              className="wax"
              aria-label="Break the seal and open the invitation"
            >
              <WaxSeal />
            </button>

            <div className="env-text">
              <p className="font-display text-[0.65rem] uppercase tracking-[0.4em] text-gold-light">
                The wedding of
              </p>
              <p className="font-script gold-text mt-3 text-[clamp(2.4rem,10vw,3.6rem)] leading-tight lg:text-6xl">
                Aliya &amp; Mustafa
              </p>
              <p className="env-tag font-display mx-auto mt-4 max-w-[18rem] text-[0.6rem] uppercase leading-relaxed tracking-[0.3em] text-ivory/80 lg:max-w-none">
                Two souls. One journey. A lifetime together.
              </p>
              <GuestName className="font-script mt-5 text-2xl text-gold-light" />
              <p className="mt-6 animate-pulse text-lg italic text-gold">
                Tap the seal to open your invitation
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
      <audio ref={audioRef} src="/audio-music.mp3" loop preload="none" />
      {open && (
        <button
          type="button"
          onClick={toggleMusic}
          className="music-btn"
          aria-label={playing ? "Mute music" : "Play music"}
          title={playing ? "Mute music" : "Play music"}
          aria-pressed={playing}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" fillOpacity="0.2" />
            {playing ? (
              <>
                <path d="M15.5 9a4 4 0 0 1 0 6" />
                <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
              </>
            ) : (
              <path d="M16 9.5l5 5M21 9.5l-5 5" />
            )}
          </svg>
        </button>
      )}
      <Particles />
    </div>
  );
}
