import { getList } from "./utils";

export const PUBLICATION_GROUPS = [
  { key: "peer-reviewed", label: "Peer-reviewed" },
  { key: "submitted", label: "Submitted" },
  { key: "in-prep", label: "In preparation" },
  { key: "proceedings", label: "Conference proceedings" },
  { key: "contributions", label: "Contributions & acknowledgements" },
] as const;

/** Publications grouped by category (empty groups dropped), newest first. */
export async function getPublicationGroups() {
  const pubs = await getList("publications");
  return PUBLICATION_GROUPS.map((g) => ({
    ...g,
    items: pubs.filter((p) => p.category === g.key).sort((a, b) => b.year - a.year),
  })).filter((g) => g.items.length > 0);
}
