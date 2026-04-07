/** Project data configuration. Add your projects here as game tiles. */

export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Display title shown below the game tile */
  title: string;
  /** Path to the cover art image (optional — falls back to generated cover) */
  coverArt?: string;
  /** Short description shown on the project page */
  description: string;
  /** Technologies used */
  techStack: string[];
  /** External links (GitHub, live demo, etc.) */
  links: { label: string; url: string }[];
  /** Theme for generated tile cover art */
  theme?: {
    gradient: string;
    icon: string;
    accentColor: string;
  };
  /** Screenshot image paths for the detail page */
  screenshots?: string[];
  /** GitHub repository URL */
  repoUrl?: string;
  /** Your role on this project */
  role?: string;
}

export const projects: Project[] = [
  {
    id: 'builders-log',
    title: "Builder's Log",
    coverArt: '/builders-log.png',
    description: 'A living document of the design decisions, iterations, and lessons learned while building this portfolio.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    links: [],
  },
  {
    id: 'duendi',
    title: 'Duendi',
    coverArt: '/Duendi.png',
    description: 'Duendi — a creative project exploring expressive design and interactive experiences.',
    techStack: ['React', 'TypeScript', 'Node.js'],
    links: [],
  },
];
