export interface Skill {
  name: string;
  /** Years of experience or "first used" text */
  firstUsed: string;
  /** Proficiency label shown on the right */
  proficiency: 'Expert' | 'Advanced' | 'Proficient' | 'Learning';
  /** 0–100 for the progress bar */
  level: number;
}

export interface SocialLink {
  label: string;
  url: string;
}

export const profile = {
  name: 'Jzon Livingston',
  tagline: 'Full-Stack Developer',
  status: 'Available' as const,
  bio: 'Passionate software engineer with a love for building performant, user-centric applications. I specialize in full-stack development with modern JavaScript frameworks, cloud infrastructure, and developer tooling.',
  skills: [
    { name: 'React', firstUsed: 'First used 5 years ago', proficiency: 'Expert', level: 95 },
    { name: 'TypeScript', firstUsed: 'First used 4 years ago', proficiency: 'Expert', level: 90 },
    { name: 'Node.js', firstUsed: 'First used 6 years ago', proficiency: 'Expert', level: 92 },
    { name: 'Python', firstUsed: 'First used 4 years ago', proficiency: 'Advanced', level: 80 },
    { name: 'Next.js', firstUsed: 'First used 3 years ago', proficiency: 'Advanced', level: 85 },
    { name: 'AWS', firstUsed: 'First used 3 years ago', proficiency: 'Proficient', level: 70 },
  ] satisfies Skill[],
  socials: [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'Email', url: 'mailto:hello@example.com' },
  ] satisfies SocialLink[],
} as const;
