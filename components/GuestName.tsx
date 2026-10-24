"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getName = () =>
  (new URLSearchParams(window.location.search).get("to") ?? "").trim().slice(0, 60);
const getServerName = () => "";

/** Personalises the invite from `?to=Guest Name` (React escapes the value). */
export default function GuestName({ className = "" }: { className?: string }) {
  const name = useSyncExternalStore(subscribe, getName, getServerName);
  if (!name) return null;
  return <p className={className}>Dear {name},</p>;
}
