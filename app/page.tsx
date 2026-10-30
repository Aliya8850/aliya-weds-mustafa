import Link from "next/link";
import { variants } from "@/lib/invite";

// Link hub for the family: pick the invitation that matches each guest list.
export default function Home() {
  return (
    <main className="sec sec-dark mx-auto flex min-h-dvh max-w-none flex-col items-center justify-center px-5 py-16 text-center">
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="font-arabic gold-text text-4xl" dir="rtl" lang="ar">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
        <h1 className="font-script gold-text mt-4 text-6xl sm:text-7xl">Aliya &amp; Mustafa</h1>
        <p className="mt-3 text-lg italic text-ivory/75">
          Choose the invitation to share with your guests
        </p>

        <ul className="mt-10 grid gap-4 text-left sm:grid-cols-2">
          {Object.values(variants).map((v) => (
            <li key={v.slug}>
              <Link href={`/${v.slug}`} className="hub-card">
                <h2 className="font-display gold-text text-lg uppercase tracking-[0.15em]">
                  {v.label}
                </h2>
                <p className="mt-2 text-ivory/75">{v.description}</p>
                <p className="font-display mt-4 text-xs tracking-[0.2em] text-gold">/{v.slug}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-md text-base italic text-ivory/60">
          Tip: add <span className="text-gold-light">?to=Guest Name</span> to any link to greet the
          guest personally, e.g. <span className="text-gold-light">/nikah?to=Rahim Uncle</span>
        </p>
      </div>
    </main>
  );
}
