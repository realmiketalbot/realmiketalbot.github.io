// Site-wide settings and homepage copy.
// Records that grow over time (publications, talks, awards, etc.) live in
// src/content/*.yaml instead.

export const siteConfig = {
  name: "Mike Talbot",
  fullName: "Michael T. Talbot",
  title: "Engineer & Hydrologist",
  description:
    "Mike Talbot is an engineer, hydrologist, and PhD candidate at Colorado State University studying flood frequency and deep learning streamflow prediction at the extremes.",
  url: "https://miketalbot.io",
  location: "Fort Collins, CO",
  headshot: "/images/mike-talbot-bw.png",
  cvPdf:
    "https://drive.google.com/file/d/1xxAZDTg61NM_-SZndC9Omd1DPyO4MZcV/view?usp=sharing",

  hero: {
    greeting: "Hi, I'm",
    tagline:
      "PhD candidate at Colorado State University studying why hydrologic models struggle at the extremes (floods and dry years) and what we can do about it.",
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

  dissertationTitle:
    "Advancing Streamflow Estimation in Colorado Using Mixture Distributions and Deep Learning",
  researchIntro:
    "Hydrologic models are fit to records that mix hydrologically distinct conditions: floods with different causes, catchments governed by different processes, years unlike the ones before them. The result describes the bulk of the data well and the extremes poorly, which is exactly where the stakes are highest. Using large-sample hydrology, my dissertation asks whether that loss of skill can be measured, mitigated, and explained:",
  researchQuestions: [
    {
      label: "Measure",
      text: "How do flood frequency estimates in Colorado change when snowmelt, rainfall, and rain-on-snow floods are treated as separate populations?",
    },
    {
      label: "Mitigate",
      text: "Can data-centric interventions reduce peak-flow underestimation in LSTM streamflow models, and at what cost elsewhere in the flow distribution?",
    },
    {
      label: "Explain",
      text: "How reliably can LSTMs predict seasonal water supply in Colorado's driest years, and which inputs do they rely on?",
    },
  ],

  skills: [
    "Hydrologic & hydraulic modeling",
    "Deep learning (LSTMs)",
    "Explainable AI",
    "Flood frequency analysis",
    "Extreme value statistics",
    "Python / PyTorch",
    "R / Shiny",
    "GIS",
    "HPC / SLURM",
    "SWMM / PCSWMM",
    "DRAINMOD",
    "Web development",
  ],

  projects: [
    {
      name: "Mixed-population flood frequency in Colorado",
      group: "research",
      period: "2026 – present",
      description:
        "How much do flood quantile estimates change when snowmelt, rainfall, and rain-on-snow floods are modeled as separate populations? Peaks-over-threshold analysis across 206 USGS gages in Colorado, with an interactive dashboard for exploring site-level results.",
      tags: ["Flood frequency", "Extreme value statistics", "R Shiny"],
    },
    {
      name: "Closing the peak-flow gap in LSTM streamflow models",
      group: "research",
      period: "2024 – present",
      description:
        "Testing whether oversampling rare flows and richer precipitation inputs reduce LSTM peak-flow underprediction across 494 CAMELS catchments, and what each costs in overall skill. Manuscript in preparation.",
      link: "https://essopenarchive.org/users/857720/articles/1370403-no-free-lunch-improving-lstm-flood-predictions-with-minimal-loss-in-overall-skill",
      tags: ["Deep learning", "PyTorch", "Large-sample hydrology"],
    },
    {
      name: "LSTM water supply predictions in dry years",
      group: "research",
      period: "Planned, 2027",
      description:
        "Benchmarking April–August runoff predictions for Colorado catchments in dry versus normal years, and using expected gradients to see which inputs (including high-resolution snow water equivalent) the model relies on.",
      tags: ["Water supply", "Explainable AI", "Snow"],
    },
    {
      name: "Rochester Comprehensive Surface Water Management Plan",
      group: "consulting",
      period: "~2025",
      description:
        "Comprehensive surface water management plan for Rochester, Minnesota.",
      link: "https://cswmp-rpu.hub.arcgis.com/",
      tags: ["Watershed planning", "Flood hazard"],
    },
    {
      name: "Middle Cedar Watershed Management Plan",
      group: "consulting",
      period: "2020",
      description:
        "Watershed management plan for the Middle Cedar River watershed in Iowa.",
      link: "https://web.archive.org/web/20240516190825/https://www.iowadnr.gov/Portals/idnr/uploads/water/watershed/files/WMA_Files/MiddleCedar_Watershed_Management_Plan%20OptforWeb.pdf",
      tags: ["Watershed planning"],
    },
    {
      name: "Edmonton LID Study",
      group: "consulting",
      period: "2019",
      description:
        "Study of low impact development (LID) stormwater practices for the City of Edmonton, Alberta.",
      link: "https://www.eorinc.com/projects/edmonton-lid-study.html",
      tags: ["Stormwater", "LID"],
    },
    {
      name: "Grand Marais Stormwater Management Plan",
      group: "consulting",
      period: "2018",
      description:
        "Stormwater management plan for the City of Grand Marais, Minnesota.",
      link: "https://www.ci.grand-marais.mn.us/vertical/sites/%7B33D7F42E-203A-42E0-8979-44AF7108C86C%7D/uploads/FINAL_Plan_Grand_Marais_SWP.pdf",
      tags: ["Stormwater"],
    },
    {
      name: "Thunder Bay Stormwater Management Plan",
      group: "consulting",
      period: "2016",
      description:
        "Stormwater management plan for the City of Thunder Bay, Ontario.",
      link: "https://www.thunderbay.ca/en/city-services/resources/Documents/Stormwater-Management-Plan-for-web---Vol1-Accessible.pdf",
      tags: ["Stormwater"],
    },
    {
      name: "Rural Stormwater Management Model",
      group: "consulting",
      period: "2014",
      description:
        "A rural stormwater management model for managing water quality in the Lake Huron watersheds of Ontario.",
      link: "https://www.researchgate.net/publication/311948366_Development_of_a_Rural_Stormwater_Management_Model_to_Manage_Water_Quality_in_the_Lake_Huron_Watersheds",
      tags: ["PCSWMM", "Water quality"],
    },
  ],
};
