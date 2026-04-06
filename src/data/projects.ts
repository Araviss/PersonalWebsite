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
  // Add your projects here. Example:
  // {
  //   id: 'my-project',
  //   title: 'My Project',
  //   description: 'A description of my project.',
  //   techStack: ['React', 'TypeScript'],
  //   links: [{ label: 'GitHub', url: 'https://github.com' }],
  //   theme: {
  //     gradient: 'linear-gradient(135deg, #e60012 0%, #ff4d4d 100%)',
  //     icon: 'M12 2L2 7l10 5 10-5-10-5z', // SVG path
  //     accentColor: '#ffffff',
  //   },
  // },
];
