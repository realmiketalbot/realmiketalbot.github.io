// Site-wide settings and homepage copy.
// Records that grow over time (publications, talks, awards, etc.) live in
// src/content/*.yaml instead.

export const siteConfig = {
  name: "Mike Talbot",
  fullName: "Michael T. Talbot",
  title: "Engineer & Hydrologist",
  description:
    "Mike Talbot is an engineer, hydrologist, and PhD candidate at Colorado State University studying machine learning prediction of streamflow extremes.",
  url: "https://miketalbot.io",
  location: "Fort Collins, CO",
  headshot: "/images/mike-talbot-bw.png",
  cvPdf:
    "https://drive.google.com/file/d/1xxAZDTg61NM_-SZndC9Omd1DPyO4MZcV/view?usp=sharing",

  hero: {
    greeting: "Hi, I'm",
    tagline:
      "PhD candidate at Colorado State University, using machine learning to better predict floods and other streamflow extremes.",
  },

  social: {
    email: "", // leave blank to hide
    github: "https://github.com/realmiketalbot",
    linkedin: "https://www.linkedin.com/in/realmiketalbot",
    scholar: "https://scholar.google.com/citations?user=OrD79wlC97wC&hl=en",
    orcid: "https://orcid.org/0000-0002-1145-8207",
    bluesky: "https://bsky.app/profile/miketalbot.io",
  },

  // Each string is one paragraph. Simple inline links: [text](url)
  about: [
    "I'm an engineer and hydrologist working toward a PhD in Civil & Environmental Engineering at [Colorado State University](https://www.engr.colostate.edu/ce/graduate/hydrologic-science-and-engineering/), advised by [Dr. Frances Davenport](https://fdavenport.github.io). Before returning to school in 2024, I spent a decade as a water resources engineer at [Emmons & Olivier Resources](https://www.eorinc.com/), building hydrologic and hydraulic models for everything from engineering design to regional watershed planning.",
    "I've always worked at the crossroads of hydrology, civil engineering, GIS, and data science, and I'm at my best carrying ideas from one field into another. The PhD is my chance to pair that breadth with depth: a real understanding of hydrology and its history as a scientific discipline.",
  ],

  researchIntro:
    "Within the framework of large-sample hydrology, I use statistical methods, deep learning, and explainability techniques to study hydrologic extremes. The questions driving my work:",
  researchQuestions: [
    "How good are machine learning models at predicting streamflow extremes?",
    "What methods can improve their skill in the tails of the streamflow distribution?",
    "What can they teach us about the principles of hydrologic science?",
  ],

  skills: [
    "Hydrologic & hydraulic modeling",
    "Deep learning (LSTMs)",
    "Explainable AI",
    "Statistical hydrology",
    "Python",
    "R",
    "GIS",
    "HPC / SLURM",
    "SWMM / PCSWMM",
    "DRAINMOD",
    "Web development",
  ],

  projects: [
    {
      name: "LSTM predictions of extreme streamflow",
      period: "2024 – present",
      description:
        "PhD research on how training distribution and input fidelity affect the skill of LSTM streamflow models at the extremes, and how to improve flood predictions without sacrificing overall skill.",
      link: "https://essopenarchive.org/users/857720/articles/1370403-no-free-lunch-improving-lstm-flood-predictions-with-minimal-loss-in-overall-skill",
      tags: ["Deep learning", "Large-sample hydrology", "Floods"],
    },
    {
      name: "Rochester Comprehensive Surface Water Management Plan",
      period: "~2025",
      description:
        "Comprehensive surface water management plan for Rochester, Minnesota.",
      link: "https://cswmp-rpu.hub.arcgis.com/",
      tags: ["Watershed planning", "Flood hazard"],
    },
    {
      name: "Middle Cedar Watershed Management Plan",
      period: "2020",
      description:
        "Watershed management plan for the Middle Cedar River watershed in Iowa.",
      link: "https://web.archive.org/web/20240516190825/https://www.iowadnr.gov/Portals/idnr/uploads/water/watershed/files/WMA_Files/MiddleCedar_Watershed_Management_Plan%20OptforWeb.pdf",
      tags: ["Watershed planning"],
    },
    {
      name: "Edmonton LID Study",
      period: "2019",
      description:
        "Study of low impact development (LID) stormwater practices for the City of Edmonton, Alberta.",
      link: "https://www.eorinc.com/projects/edmonton-lid-study.html",
      tags: ["Stormwater", "LID"],
    },
    {
      name: "Grand Marais Stormwater Management Plan",
      period: "2018",
      description:
        "Stormwater management plan for the City of Grand Marais, Minnesota.",
      link: "https://www.ci.grand-marais.mn.us/vertical/sites/%7B33D7F42E-203A-42E0-8979-44AF7108C86C%7D/uploads/FINAL_Plan_Grand_Marais_SWP.pdf",
      tags: ["Stormwater"],
    },
    {
      name: "Thunder Bay Stormwater Management Plan",
      period: "2016",
      description:
        "Stormwater management plan for the City of Thunder Bay, Ontario.",
      link: "https://www.thunderbay.ca/en/city-services/resources/Documents/Stormwater-Management-Plan-for-web---Vol1-Accessible.pdf",
      tags: ["Stormwater"],
    },
    {
      name: "Rural Stormwater Management Model",
      period: "2014",
      description:
        "A rural stormwater management model for managing water quality in the Lake Huron watersheds of Ontario.",
      link: "https://www.researchgate.net/publication/311948366_Development_of_a_Rural_Stormwater_Management_Model_to_Manage_Water_Quality_in_the_Lake_Huron_Watersheds",
      tags: ["PCSWMM", "Water quality"],
    },
  ],
};
