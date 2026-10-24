import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Invitation from "@/components/Invitation";
import { variants } from "@/lib/invite";

// The four variants are prerendered at build time (see generateStaticParams), so
// guests never wait on `params`. This only silences the dev-only instant-navigation
// check, which can't know that and flags `await params`.
export const instant = false;

export function generateStaticParams() {
  return Object.keys(variants).map((variant) => ({ variant }));
}

export async function generateMetadata({ params }: PageProps<"/[variant]">): Promise<Metadata> {
  const { variant } = await params;
  const v = variants[variant];
  if (!v) return {};
  return {
    title: `Aliya & Mustafa | ${v.occasion} Invitation`,
    description: `You are cordially invited to the ${v.occasion} of Aliya Khan and Mustafa Shaikh.`,
  };
}

export default async function VariantPage({ params }: PageProps<"/[variant]">) {
  const { variant } = await params;
  const v = variants[variant];
  if (!v) notFound();
  return <Invitation variant={v} />;
}
