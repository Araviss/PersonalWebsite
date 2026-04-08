export interface TechIcon {
  name: string;
  color: string;
  icon: 'react' | 'python' | 'java' | 'typescript' | 'nextjs' | 'nodejs' | 'aws' | 'kubernetes' | 'docker' | 'git' | 'linux' | 'spring' | 'tailwind' | 'jenkins' | 'sql' | 'bash' | 'cpp' | 'datadog' | 'splunk';
}

export interface SocialLink {
  label: string;
  url: string;
}

export const profile = {
  name: 'Jzon Livingston',
  tagline: 'Software Engineer',
  status: 'Open to opportunities' as const,
  bio: "Software engineer focused on cloud infrastructure and backend systems. I build things that scale.",
  technologies: [
    { name: 'Python',     color: '#3776AB', icon: 'python'     },
    { name: 'TypeScript', color: '#3178C6', icon: 'typescript' },
    { name: 'React',      color: '#61DAFB', icon: 'react'      },
    { name: 'AWS',        color: '#FF9900', icon: 'aws'        },
    { name: 'Kubernetes', color: '#326CE5', icon: 'kubernetes' },
    { name: 'Docker',     color: '#2496ED', icon: 'docker'     },
  ] satisfies TechIcon[],
  socials: [
    { label: 'GitHub',   url: 'https://github.com/Araviss' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/jzonlivingston' },
    { label: 'Email',    url: 'mailto:jzonlivingston@gmail.com' },
  ] satisfies SocialLink[],
} as const;
