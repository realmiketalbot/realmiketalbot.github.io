import { getList } from "./utils";
import { getPublicationGroups } from "./publications";

/** Everything the CV needs, shared by the web CV (/cv) and the print CV (/cv/print). */
export async function getCvData() {
  const [education, experience, teaching, credentials, awards, service, affiliations, talks] =
    await Promise.all([
      getList("education"),
      getList("experience"),
      getList("teaching"),
      getList("credentials"),
      getList("awards"),
      getList("service"),
      getList("affiliations"),
      getList("talks"),
    ]);
  talks.sort((a, b) => +b.date - +a.date);

  return {
    education,
    experience,
    teaching,
    training: credentials.filter((c) => c.kind === "training"),
    certifications: credentials.filter((c) => c.kind === "certification"),
    awards,
    service,
    affiliations,
    talks,
    pubGroups: await getPublicationGroups(),
  };
}

/** Section titles, in order, so the web and print CVs stay aligned. */
export const CV_SECTIONS = {
  education: "Education",
  experience: "Research & Professional Experience",
  teaching: "Teaching Experience",
  publications: "Publications",
  talks: "Presentations",
  awards: "Honors & Awards",
  service: "Service & Leadership",
  credentials: "Certifications & Training",
  affiliations: "Professional Memberships",
} as const;
