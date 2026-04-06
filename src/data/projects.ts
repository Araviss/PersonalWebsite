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
}

export const projects: Project[] = [
  {
    id: 'switch-portfolio',
    title: 'Switch Portfolio',
    description: 'This very site — a Nintendo Switch-inspired portfolio built with Next.js, Framer Motion, and Tailwind CSS.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    links: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Live Demo', url: 'https://example.com' },
    ],
    theme: {
      gradient: 'linear-gradient(135deg, #e60012 0%, #ff4d4d 50%, #ff8080 100%)',
      icon: 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
      accentColor: '#ffffff',
    },
  },
  {
    id: 'realtime-dashboard',
    title: 'Realtime Dashboard',
    description: 'A real-time analytics dashboard processing 2M+ events/day with WebSocket streaming and interactive D3 visualizations.',
    techStack: ['React', 'D3.js', 'WebSockets', 'FastAPI', 'Redis'],
    links: [
      { label: 'GitHub', url: 'https://github.com' },
    ],
    theme: {
      gradient: 'linear-gradient(135deg, #0AB9E6 0%, #0077b6 50%, #023e8a 100%)',
      icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
      accentColor: '#80e5ff',
    },
  },
  {
    id: 'api-gateway',
    title: 'API Gateway',
    description: 'A high-throughput API gateway with rate limiting, OAuth2 auth, circuit breakers, and comprehensive observability.',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
    links: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Docs', url: 'https://example.com' },
    ],
    theme: {
      gradient: 'linear-gradient(135deg, #306998 0%, #4B8BBE 50%, #FFD43B 100%)',
      icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
      accentColor: '#FFD43B',
    },
  },
  {
    id: 'design-system',
    title: 'Component Library',
    description: 'A production design system with 40+ accessible components, theme tokens, and Storybook documentation.',
    techStack: ['TypeScript', 'React', 'Storybook', 'Radix UI', 'CSS Modules'],
    links: [
      { label: 'Storybook', url: 'https://example.com' },
      { label: 'npm', url: 'https://npmjs.com' },
    ],
    theme: {
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 50%, #c4b5fd 100%)',
      icon: 'M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 010-5 2.5 2.5 0 010 5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z',
      accentColor: '#e0d4ff',
    },
  },
  {
    id: 'ml-pipeline',
    title: 'ML Pipeline',
    description: 'An end-to-end ML pipeline for anomaly detection in streaming data with automated retraining and model versioning.',
    techStack: ['Python', 'scikit-learn', 'Apache Kafka', 'MLflow', 'Docker'],
    links: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Paper', url: 'https://example.com' },
    ],
    theme: {
      gradient: 'linear-gradient(135deg, #059669 0%, #34d399 50%, #a7f3d0 100%)',
      icon: 'M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z',
      accentColor: '#6ee7b7',
    },
  },
];
