/*
 * Single source of truth for the Projects page.
 * Add an object per project.
 *
 * Fields:
 * title       - project name
 * description - a sentence or two on what it is / does
 * tags        - array of short strings, e.g. ["Swift", "iOS"]
 * link        - optional URL (repo, demo, etc.)
 * date        - optional, e.g. "2026"
 */
window.projectsData = [
  {
    title: "Desmos Planetary Precession Simulator",
    description: "An interactive mathematical simulation built in Desmos to model and visualize orbital mechanics, perihelion precession, and gravitational perturbations.",
    tags: ["Desmos", "Astrophysics", "Simulation", "Mathematics"],
    link: "", // Paste your Desmos share link here if you want a "View →" button
    date: "2026"
  }
];
