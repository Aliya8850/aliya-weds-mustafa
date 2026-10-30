// Single source of truth for every word on the invitation.
// Edit this file to change dates, venues, phone numbers, etc.

export type EventId = "haldi" | "nikah" | "reception";

export type InviteEvent = {
  id: EventId;
  title: string;
  tagline: string;
  /** ISO timestamp with the IST offset, used for the countdown + calendar file */
  start: string;
  end: string;
  weekday: string;
  day: string;
  month: string;
  year: string;
  hijri: string;
  timeLabel: string;
  venue?: { name: string; address: string };
  /**
   * Tentative events are shown on the invite, but are skipped by the
   * countdown and get no "add to calendar" button.
   */
  tentative?: boolean;
  note?: string;
};

export const couple = {
  bride: { first: "Aliya", full: "Aliya Khan" },
  groom: { first: "Mustafa", full: "Mustafa Shaikh" },
  brideParents: "Mr. Late Salim Khalil Khan & Mrs. Zohra Bi Salim Khan",
  groomParents: "Umar Haroon Shaikh & Umera Umar Shaikh",
  compliments: "Salim Khan Family, Relatives & Friends",
  blessing:
    "May Allah (SWT) bless this union with love, guidance, and barakah, enriching their journey with Imaan, prosperity, and peace.",
  phones: ["9702952551", "9768291004"],
  homeAddress:
    "Malhar Hall, B-103, Municipal Rd, Municipal Colony, Sector 2, Govandi East, Mumbai, Maharashtra 400043",
} as const;

export const events: Record<EventId, InviteEvent> = {
  haldi: {
    id: "haldi",
    title: "Haldi",
    tagline: "An evening of turmeric, laughter and love",
    start: "2026-11-29T20:00:00+05:30",
    end: "2026-11-29T23:00:00+05:30",
    weekday: "Sunday",
    day: "29",
    month: "November",
    year: "2026",
    hijri: "18th Jumada al-Thani 1448 Hijri",
    timeLabel: "8:00 PM onwards",
    venue: {
      name: "Lotus Colony",
      address: "Plot No 9, Room No 518, Near Sanjari English School, Govandi, Mumbai 400043",
    },
  },
  nikah: {
    id: "nikah",
    title: "Nikah",
    tagline: "The sacred union, in the name of Allah",
    start: "2026-12-02T19:00:00+05:30",
    end: "2026-12-02T22:00:00+05:30",
    weekday: "Wednesday",
    day: "02",
    month: "December",
    year: "2026",
    hijri: "21st Jumada al-Thani 1448 Hijri",
    timeLabel: "7:00 PM onwards",
    venue: {
      name: "Malhar Hall",
      address:
        "B-103, Municipal Rd, Municipal Colony, Sector 2, Govandi East, Mumbai, Maharashtra 400043",
    },
  },
  reception: {
    id: "reception",
    title: "Wedding Reception",
    tagline: "An evening of celebration, dua and dinner",
    start: "2026-12-04T19:00:00+05:30",
    end: "2026-12-04T23:00:00+05:30",
    weekday: "Friday",
    day: "04",
    month: "December",
    year: "2026",
    hijri: "23rd Jumada al-Thani 1448 Hijri",
    timeLabel: "7:00 PM to 11:00 PM",
    venue: {
      name: "Palm Beach Banquets",
      address: "1st Floor, Vadar Bhavan, Sanpada Rd, Palm Beach, Navi Mumbai - 400705",
    },
  },
};

export type Variant = {
  slug: string;
  label: string;
  description: string;
  /** Wording used in the "solicit your presence" line */
  occasion: string;
  events: EventId[];
};

export const variants: Record<string, Variant> = {
  full: {
    slug: "full",
    label: "Haldi + Nikah + Reception",
    description: "The complete celebration — all three events.",
    occasion: "Haldi, Nikah and Reception",
    events: ["haldi", "nikah", "reception"],
  },
  nikah: {
    slug: "nikah",
    label: "Only Nikah",
    description: "For guests invited to the Nikah ceremony only.",
    occasion: "Nikah",
    events: ["nikah"],
  },
  reception: {
    slug: "reception",
    label: "Only Reception",
    description: "For guests invited to the Wedding Reception only.",
    occasion: "Wedding Reception",
    events: ["reception"],
  },
  "nikah-reception": {
    slug: "nikah-reception",
    label: "Nikah + Reception",
    description: "For guests invited to both the Nikah and the Reception.",
    occasion: "Nikah and Reception",
    events: ["nikah", "reception"],
  },
};

export const mapsUrl = (e: InviteEvent) =>
  e.venue
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${e.venue.name}, ${e.venue.address}`,
      )}`
    : undefined;
