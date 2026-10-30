import type { CSSProperties } from "react";
import { couple, events, mapsUrl, type EventId, type Variant } from "@/lib/invite";
import AddToCalendar from "./AddToCalendar";
import Chrome from "./Chrome";
import Countdown from "./Countdown";
import GuestName from "./GuestName";
import HeroStage from "./HeroStage";
import { Divider, Letters, RiseText, SvgDefs } from "./Ornaments";
import Reveal from "./Reveal";
import ScrollText from "./ScrollText";
import Shell from "./Shell";

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

const themeClass: Record<EventId, string> = {
  haldi: "ev-haldi",
  nikah: "ev-nikah",
  reception: "ev-reception",
};

/** "2026-12-02T19:00:00+05:30" -> ["02", "12", "2026"] */
const dmy = (iso: string) => [iso.slice(8, 10), iso.slice(5, 7), iso.slice(0, 4)];

export default function Invitation({ variant }: { variant: Variant }) {
  const list = variant.events.map((id) => events[id]);
  const first = list[0];
  const last = list[list.length - 1];

  const dateLine =
    list.length > 1
      ? first.month === last.month
        ? `${Number(first.day)} – ${Number(last.day)} ${last.month} ${last.year}`
        : `${Number(first.day)} ${first.month.slice(0, 3)} – ${Number(last.day)} ${last.month.slice(0, 3)} ${last.year}`
      : `${first.weekday}, ${Number(first.day)} ${first.month} ${first.year}`;

  const [d1, m1, y1] = dmy(first.start);
  const [d2, m2] = dmy(last.start);
  const shortDate = list.length > 1 ? `${d1}.${m1} — ${d2}.${m2}.${y1}` : `${d1}.${m1}.${y1}`;


  const countdownTargets = list
    .filter((e) => !e.tentative)
    .map((e) => ({
      id: e.id,
      title: e.title,
      start: e.start,
      when: `${e.weekday}, ${Number(e.day)} ${e.month} ${e.year} · ${e.timeLabel}`,
    }));

  return (
    <Shell>
      <SvgDefs />
      <Chrome />

      {/* ───────── Hero ───────── */}
      <HeroStage>
        <div className="hero-lit" aria-hidden />
        <div className="hero-torch" aria-hidden />

        <div className="hero-inner">
          <header
            className="hero-anim fade-up flex items-start justify-between gap-4 text-[0.62rem] uppercase tracking-[0.35em] text-gold-light sm:text-xs"
            style={delay(0.2)}
          >
            <span className="font-display">The wedding of</span>
            <span className="font-display">{shortDate}</span>
          </header>

          <div className="mx-auto w-full max-w-6xl">
            <GuestName className="hero-anim fade-up font-script mb-5 text-2xl text-gold-light sm:text-3xl" />

            <div className="flex items-start gap-6 sm:gap-14">
              <div className="depth-a">
                <span className="name">
                  <Letters text="Aliya" />
                </span>
                <span className="sur hero-anim fade-up" style={delay(1.4)}>
                  Khan
                </span>
              </div>
              <div
                className="with-aside hero-anim fade-up flex min-w-0 flex-1 items-center gap-3 text-gold sm:gap-5"
                style={delay(1.6)}
              >
                <span className="font-script text-2xl leading-none sm:text-5xl">with</span>
                <span className="h-px max-w-[16rem] flex-1 bg-linear-to-r from-gold/80 to-transparent" />
              </div>
            </div>

            <div className="depth-b mt-4 text-right sm:mt-0">
              <span className="name">
                <Letters text="Mustafa" offset={8} />
              </span>
              <span className="sur hero-anim fade-up" style={delay(2.5)}>
                Shaikh
              </span>
            </div>
          </div>

          <footer className="hero-anim fade-up flex items-end justify-between gap-4" style={delay(2.9)}>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.25em] text-gold-light sm:text-sm">
                {dateLine}
              </p>
              <p className="mt-1 text-base italic text-ivory/75 sm:text-lg">Mumbai, India · Inshallah</p>
            </div>
            <a href="#invite" className="flex flex-col items-center gap-2 text-gold" aria-label="Scroll down">
              <span className="font-display text-[0.6rem] uppercase tracking-[0.4em] [writing-mode:vertical-rl]">
                Scroll
              </span>
              <span className="cue" />
            </a>
          </footer>
        </div>
      </HeroStage>

      {/* ───────── Invitation message (ivory) ───────── */}
      <section id="invite" className="sec sec-light curve overflow-hidden px-4 pb-32 pt-28 text-center">
        <div className="orb left-[-8rem] top-[8%]" aria-hidden />
        <div className="orb blush right-[-10rem] top-[48%]" aria-hidden />

        <div className="mx-auto max-w-4xl px-2 sm:px-8">
          <Reveal from="zoom">
            <p
              className="font-arabic glow-pulse text-5xl leading-[1.9] text-gold-deep sm:text-6xl"
              dir="rtl"
              lang="ar"
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
          </Reveal>

          <ScrollText
            text={couple.blessing}
            className="font-script mx-auto mt-8 max-w-3xl text-balance text-[1.8rem] leading-snug text-wine sm:text-[2.6rem] sm:leading-snug"
          />

          <Divider className="my-16" />

          <Reveal from="none">
            <p className="font-display text-xs uppercase tracking-[0.45em] text-gold-deep">
              With the blessings of Allah
            </p>
          </Reveal>

          <div className="mt-8 space-y-3">
            <Reveal from="left">
              <p className="font-display text-base font-bold uppercase leading-snug tracking-[0.1em] text-wine sm:text-xl sm:tracking-[0.14em]">
                Mr. Late Salim Khalil Khan
              </p>
            </Reveal>
            <Reveal from="zoom" delay={150}>
              <p className="font-script text-4xl leading-none text-gold-deep">&amp;</p>
            </Reveal>
            <Reveal from="right" delay={250}>
              <p className="font-display text-base font-bold uppercase leading-snug tracking-[0.1em] text-wine sm:text-xl sm:tracking-[0.14em]">
                Mrs. Zohra Bi Salim Khan
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <p className="mx-auto mt-10 max-w-2xl text-balance text-xl leading-relaxed text-ink/90 sm:text-2xl">
              solicit your blessing and request your gracious presence on the auspicious occasion of{" "}
              <strong className="font-bold text-wine">{variant.occasion}</strong> of their Daughter
            </p>
          </Reveal>

          <div className="mt-20">
            <Reveal from="none">
              <p className="font-script text-[clamp(2.4rem,10.5vw,6rem)] leading-[1.15] text-wine">
                <RiseText text={couple.bride.full} />
              </p>

              <div className="my-5 flex items-center justify-center gap-5" aria-hidden>
                <span className="grow-line h-px w-20 origin-right bg-linear-to-r from-transparent to-gold sm:w-36" />
                <span className="font-display text-xs uppercase tracking-[0.55em] text-gold-deep">with</span>
                <span className="grow-line h-px w-20 origin-left bg-linear-to-l from-transparent to-gold sm:w-36" />
              </div>

              <p className="font-script text-[clamp(2.4rem,10.5vw,6rem)] leading-[1.15] text-wine">
                <RiseText text={couple.groom.full} offset={12} />
              </p>
            </Reveal>

            <Reveal delay={400} className="mt-8">
              <p className="mx-auto max-w-xl text-balance text-xl italic text-ink/85 sm:text-2xl">S/o {couple.groomParents}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Countdown (maroon) ───────── */}
      {countdownTargets.length > 0 && (
        <section id="countdown" className="sec sec-dark curve px-5 pb-24 pt-24">
          <Reveal>
            <Countdown targets={countdownTargets} />
          </Reveal>
        </section>
      )}

      {/* ───────── Events (ivory, stacking cards) ───────── */}
      <section id="events" className="sec sec-light curve px-4 pb-24 pt-24">
        <Reveal className="mb-14 text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-gold-deep">Save the date</p>
          <h2 className="font-script mt-3 text-5xl text-wine sm:text-7xl">
            {list.length > 1 ? "The Celebrations" : `The ${first.title}`}
          </h2>
          <Divider className="mt-6" />
        </Reveal>

        <div className="mx-auto max-w-5xl">
          {list.map((e, i) => {
            const map = mapsUrl(e);
            return (
              <article
                key={e.id}
                className={`ev ${themeClass[e.id]}`}
                style={{ "--i": i } as CSSProperties}
              >
                <div className="ev-grid">
                  <div className="ev-date">
                    <p className="ev-day">{e.day}</p>
                    <div className="ev-meta">
                      <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] sm:text-base">
                        {e.month} {e.year}
                      </p>
                      <p className="font-display mt-1 text-xs uppercase tracking-[0.35em] opacity-80">
                        {e.weekday}
                      </p>
                      <p className="ev-text mt-2 text-sm italic opacity-90 sm:text-base">{e.hijri}</p>
                    </div>
                  </div>

                  <Reveal delay={100}>
                    <h3 className="ev-title">{e.title}</h3>
                    <p className="ev-text mt-2 text-base italic opacity-90 sm:text-lg">{e.tagline}</p>

                    <div className="ev-rule my-5" />

                    <p className="font-display text-lg font-semibold tracking-[0.1em]">{e.timeLabel}</p>
                    {e.venue && (
                      <p className="mt-3">
                        <span className="font-display block text-lg font-bold tracking-[0.08em]">
                          {e.venue.name}
                        </span>
                        <span className="ev-text mt-2 block text-base sm:text-lg">
                          {e.venue.address}
                        </span>
                      </p>
                    )}
                    {e.note && <p className="ev-text mt-3 text-base italic sm:text-lg">{e.note}</p>}

                    {map && e.venue && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <a href={map} target="_blank" rel="noopener noreferrer" className="btn btn-fill">
                          View on map
                        </a>
                        <AddToCalendar
                          id={e.id}
                          title={e.title}
                          start={e.start}
                          end={e.end}
                          location={`${e.venue.name}, ${e.venue.address}`}
                          className="btn btn-outline"
                        />
                      </div>
                    )}
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ───────── RSVP + footer (maroon) ───────── */}
      <section id="rsvp" className="sec sec-dark curve px-5 pb-16 pt-24 text-center">
        <Reveal from="zoom" className="mx-auto max-w-2xl">
          <h2 className="font-script gold-text text-5xl sm:text-7xl">We look forward to you</h2>
          <p className="mx-auto mt-5 max-w-md text-lg italic text-ivory/80">
            Your presence and duas will make our celebration complete.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {couple.phones.map((p) => (
              <a key={p} href={`tel:+91${p}`} className="btn btn-outline">
                Call {p}
              </a>
            ))}
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
