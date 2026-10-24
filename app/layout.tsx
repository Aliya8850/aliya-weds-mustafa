import type { Metadata, Viewport } from "next";
import { Amiri, Cinzel, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const script = Playfair_Display({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic"],
});
const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aliya & Mustafa | Wedding Invitation",
  description:
    "With the blessings of Allah (SWT), you are cordially invited to the wedding of Aliya Khan and Mustafa Shaikh.",
  openGraph: {
    title: "Aliya Khan weds Mustafa Shaikh",
    description: "You are cordially invited to celebrate with us, insha'Allah.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#02150f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${script.variable} ${amiri.variable}`}
    >
      <body>
        <noscript>
          <style>{`.gate{display:none!important}.reveal{opacity:1!important;transform:none!important}.hero-anim{animation:none!important;opacity:1!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
