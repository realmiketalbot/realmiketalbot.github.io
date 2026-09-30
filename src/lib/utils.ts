import { getCollection, type CollectionKey } from "astro:content";

/** Entries of a YAML-list collection, in the order they appear in the file. */
export async function getList<C extends CollectionKey>(name: C) {
  const entries = await getCollection(name);
  return entries.sort((a, b) => a.id.localeCompare(b.id)).map((e) => e.data);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Escape text and turn [label](url) into links. */
export function inlineLinks(text: string) {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
}

/** Escape an author list and bold my name in it. */
export function boldMe(authors: string) {
  return escapeHtml(authors).replace(
    /(Talbot M[A-Z]*)/g,
    '<strong class="text-fg font-semibold">$1</strong>',
  );
}

export const formatMonthYear = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
