"use client";

type Props = {
  id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  label?: string;
  className?: string;
};

const stamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

// RFC 5545 text escaping
const esc = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

/** Downloads an .ics file so guests can add the event to any calendar app. */
export default function AddToCalendar({ id, title, start, end, location, label, className = "btn-ghost" }: Props) {
  const download = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Aliya weds Mustafa//Invitation//EN",
      "BEGIN:VEVENT",
      `UID:${id}@aliya-weds-mustafa`,
      `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${esc(`${title} - Aliya & Mustafa`)}`,
      `LOCATION:${esc(location)}`,
      `DESCRIPTION:${esc("Aliya Khan weds Mustafa Shaikh. We would love to have your blessings and presence.")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id}-aliya-mustafa.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" onClick={download} className={className}>
      {label ?? "Add to calendar"}
    </button>
  );
}
