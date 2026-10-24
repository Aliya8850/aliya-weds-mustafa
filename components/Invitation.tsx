import type { CSSProperties } from "react";
import { couple, events, mapsUrl, type Variant } from "@/lib/invite";
import AddToCalendar from "./AddToCalendar";
import Countdown from "./Countdown";
import GuestName from "./GuestName";
import { Crescent, Divider, EventIcon, Lantern, Letters, Sprig, Stars, SvgDefs } from "./Ornaments";
import Reveal from "./Reveal";
import Shell from "./Shell";

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

const gridCols: Record<number, string> = {
  1: "max-w-md",
  2: "max-w-4xl md:grid-cols-2",
  3: "max-w-6xl md:grid-cols-3",
};

export default function Invitation({ variant }: { variant: Variant }) {
  const list = variant.events.map((id) => events[id]);
  const confirmed = list.filter((e) => !e.tentative);
  const countdownTargets = confirmed.map((e) => ({ id: e.id, title: e.title, start: e.start }));

  const first = list[0];
  const last = list[list.length - 1];
  const dateLine =
    list.length > 1
      ? first.month === last.month
        ? `${Number(first.day)} – ${Number(last.day)} ${last.month} ${last.year}`
        : `${Number(first.day)} ${first.month.slice(0, 3)} – ${Number(last.day)} ${last.month.slice(0, 3)} ${last.year}`
      : `${first.weekday}, ${Number(first.day)} ${first.month} ${first.year}`;

  return (
    <Shell>
      <SvgDefs />

      {/* ───────── Hero (navy) ───────── */}
      <section className="sec sec-dark flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-32 pt-20 text-center">
        <div className="hero-glow" aria-hidden />
        <Stars />
        <Sprig className="pointer-events-none absolute bottom-16 left-2 w-24 -scale-y-100 opacity-70 sm:w-40" />
        <Sprig className="pointer-events-none absolute bottom-16 right-2 w-24 rotate-180 opacity-70 sm:w-40" />

        <Lantern className="left-[5%]" length={36} />
        <Lantern className="left-[15%] hidden sm:block" delay={0.9} length={96} />
        <Lantern className="right-[5%]" delay={0.5} length={60} />
        <Lantern className="right-[15%] hidden sm:block" delay={1.4} length={120} />

        <div className="arch hero-anim fade-up relative" style={delay(0.1)}>
          <Crescent className="mx-auto h-16 w-16 sm:h-20 sm:w-20" />

          <GuestName className="hero-anim fade-up font-script mt-3 text-2xl text-gold-light" />

          <div
            className="hero-anim fade-up mt-6 flex items-center justify-center gap-3"
            style={delay(0.5)}
          >
            <span className="h-px w-8 bg-gold/70" />
            <p className="font-display text-[0.65rem] uppercase tracking-[0.4em] text-gold-light sm:text-xs">
              Wedding Invitation
            </p>
            <span className="h-px w-8 bg-gold/70" />
          </div>

          <h1 className="font-script mt-5 leading-[1.05]">
            <span className="block text-[clamp(3.6rem,15vw,6.4rem)]">
              <Letters text="Aliya" />
            </span>
            <span
              className="hero-anim fade-up font-display mt-1 block text-sm uppercase tracking-[0.55em] text-gold-light"
              style={delay(1.5)}
            >
              Khan
            </span>
            <span
              className="hero-anim fade-up font-script gold-text my-2 block text-5xl"
              style={delay(1.7)}
            >
              &amp;
            </span>
            <span className="block text-[clamp(3.6rem,15vw,6.4rem)]">
              <Letters text="Mustafa" offset={8} />
            </span>
            <span
              className="hero-anim fade-up font-display mt-1 block text-sm uppercase tracking-[0.55em] text-gold-light"
              style={delay(2.6)}
            >
              Shaikh
            </span>
          </h1>

          <div className="hero-anim fade-up mt-9" style={delay(3)}>
            <p className="date-pill font-display text-sm uppercase tracking-[0.22em] text-gold-light sm:text-base">
              {dateLine}
            </p>
          </div>
          <p className="hero-anim fade-up mt-4 text-lg italic text-ivory/80" style={delay(3.3)}>
            Mumbai, India · Inshallah
          </p>
        </div>

        <a
          href="#invite"
          className="scroll-cue absolute bottom-16 flex flex-col items-center gap-1 text-gold"
          aria-label="Scroll down"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </section>

      {/* ───────── Invitation message (cream) ───────── */}
      <section id="invite" className="sec sec-light curve px-4 pb-20 pt-20 text-center">
        <div className="mx-auto max-w-4xl px-2 sm:px-8">
          <Reveal>
            <p className="font-arabic text-4xl leading-[1.8] text-gold-deep sm:text-5xl" dir="rtl" lang="ar">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="mx-auto mt-1 max-w-2xl text-balance text-xl italic leading-relaxed text-ink/90 sm:text-2xl">
              {couple.blessing}
            </p>
          </Reveal>

          <Divider className="my-6" />

          <Reveal delay={150}>
            <p className="font-display text-xs uppercase tracking-[0.4em] text-gold-deep">
              With the blessings of Allah
            </p>
            <p className="font-display mt-3 text-lg font-bold uppercase leading-snug tracking-[0.14em] text-burgundy sm:text-xl">
              Mr. Late Salim Khalil Khan
            </p>
            <p className="font-script my-1 text-2xl text-gold-deep">&amp;</p>
            <p className="font-display text-lg font-bold uppercase leading-snug tracking-[0.14em] text-burgundy sm:text-xl">
              Mrs. Zohra Bi Salim Khan
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-lg leading-relaxed text-ink/90 sm:text-xl">
              solicit your blessing and request your gracious presence on the auspicious occasion of{" "}
              <strong className="font-bold text-burgundy">{variant.occasion}</strong> of their
              Daughter
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-7">
            <p className="font-script text-[clamp(2.8rem,10vw,4.2rem)] leading-tight text-navy">
              {couple.bride.full}
            </p>
            <div className="my-1 flex items-center justify-center gap-4" aria-hidden>
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold sm:w-24" />
              <span className="font-display text-xs uppercase tracking-[0.5em] text-gold-deep">with</span>
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold sm:w-24" />
            </div>
            <p className="font-script text-[clamp(2.8rem,10vw,4.2rem)] leading-tight text-navy">
              {couple.groom.full}
            </p>
            <p className="mt-3 text-lg italic text-ink/85 sm:text-xl">S/o {couple.groomParents}</p>
          </Reveal>
        </div>
      </section>

      {/* ───────── Countdown (navy) ───────── */}
      {countdownTargets.length > 0 && (
        <section id="countdown" className="sec sec-dark curve px-5 pb-28 pt-24">
          <Reveal>
            <Countdown targets={countdownTargets} />
          </Reveal>
        </section>
      )}

      {/* ───────── Events (cream) ───────── */}
      <section id="events" className="sec sec-light curve px-5 pb-28 pt-24">
        <Reveal className="mb-20 text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-gold-deep">
            Save the date
          </p>
          <h2 className="font-script mt-3 text-5xl text-navy sm:text-6xl">
            {list.length > 1 ? "The Celebrations" : `The ${first.title}`}
          </h2>
          <Divider className="mt-6" />
        </Reveal>

        <div className={`mx-auto grid gap-x-8 gap-y-20 ${gridCols[list.length]}`}>
          {list.map((e, i) => {
            const map = mapsUrl(e);
            return (
              <Reveal key={e.id} delay={i * 150} className="h-full">
                <article
                  className={`card-light px-6 pb-9 text-center ${e.tentative ? "tentative" : ""}`}
                >
                  <div className="badge-arch">
                    <EventIcon id={e.id} />
                  </div>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-[0.18em] text-navy">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-lg italic text-ink/85">{e.tagline}</p>

                  <p className="font-display mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-gold-deep">
                    {e.weekday}
                  </p>
                  <p className="font-script text-7xl leading-none text-burgundy">{e.day}</p>
                  <p className="font-display mt-1 text-base font-semibold uppercase tracking-[0.25em] text-navy">
                    {e.month} {e.year}
                  </p>
                  <p className="mt-2 text-lg italic text-ink/80">{e.hijri}</p>

                  <div className="mx-auto my-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />

                  <p className="font-display text-lg font-semibold tracking-[0.1em] text-navy">{e.timeLabel}</p>
                  {e.venue && (
                    <p className="mt-4">
                      <span className="font-display block text-lg font-bold tracking-[0.1em] text-burgundy">
                        {e.venue.name}
                      </span>
                      <span className="mt-1 block text-lg font-medium leading-snug text-ink/90">{e.venue.address}</span>
                    </p>
                  )}
                  {e.note && <p className="mt-4 text-lg italic text-ink/85">{e.note}</p>}

                  {map && e.venue && (
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <a href={map} target="_blank" rel="noopener noreferrer" className="btn-navy">
                        View on map
                      </a>
                      <AddToCalendar
                        id={e.id}
                        title={e.title}
                        start={e.start}
                        end={e.end}
                        location={`${e.venue.name}, ${e.venue.address}`}
                        className="btn-line"
                      />
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ───────── RSVP + footer (navy) ───────── */}
      <section className="sec sec-dark curve px-5 pb-16 pt-24 text-center">
        <Reveal from="zoom" className="mx-auto max-w-xl">
          <p className="font-script gold-text text-5xl sm:text-6xl">We look forward to you</p>
          <p className="mx-auto mt-5 max-w-md text-lg italic text-ivory/80">
            Your presence and duas will make our celebration complete.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {couple.phones.map((p) => (
              <a key={p} href={`tel:+91${p}`} className="btn-ghost">
                Call {p}
              </a>
            ))}
            <a
              href={`https://wa.me/91${couple.phones[0]}?text=${encodeURIComponent(
                "Assalamualaikum! We will, insha'Allah, attend the wedding of Aliya & Mustafa.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              RSVP on WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-24">
          <Divider className="mb-8" />
          <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
            With best compliments from
          </p>
          <p className="font-display gold-text mt-3 text-xl uppercase tracking-[0.15em] sm:text-2xl">
            {couple.compliments}
          </p>
          <p className="font-arabic mt-10 text-2xl text-gold-light" dir="rtl" lang="ar">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="mt-2 text-sm italic text-ivory/60">
            May Allah bless you both, shower His blessings upon you, and unite you in goodness.
          </p>
        </Reveal>
      </section>
    </Shell>
  );
}
