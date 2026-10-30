import type { Metadata, Viewport } from "next";
import { Amiri, Bodoni_Moda, Cinzel, Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["italic", "normal"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
  themeColor: "#14040a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${bodoni.variable} ${lora.variable} ${amiri.variable}`}
    >
      <body>
        <noscript>
          <style>{`.gate{display:none!important}.reveal,.sw{opacity:1!important;transform:none!important}.hero-anim,.letter{animation:none!important;opacity:1!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
