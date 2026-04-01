/** Project data configuration. Add your projects here as game tiles. */

export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Display title shown below the game tile */
  title: string;
  /** Path to the cover art image */
  coverArt: string;
  /** Short description shown on the project page */
  description: string;
  /** Technologies used */
  techStack: string[];
  /** External links (GitHub, live demo, etc.) */
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project 1',
    coverArt: '/images/covers/project-1.png',
    description: 'Your first project description goes here.',
    techStack: ['TypeScript', 'React', 'Next.js'],
    links: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Live Demo', url: 'https://example.com' },
    ],
  },
];
