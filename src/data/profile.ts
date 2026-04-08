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
  bio: "I'm a software engineer who thrives at the intersection of backend systems and cloud infrastructure. From migrating legacy apps to AWS microservices, to automating mainframe workloads with Python, I build things that scale — and occasionally things that look this cool.",
  technologies: [
    { name: 'Python',     color: '#3776AB', icon: 'python'     },
    { name: 'Java',       color: '#ED8B00', icon: 'java'       },
    { name: 'C++',        color: '#00599C', icon: 'cpp'        },
    { name: 'TypeScript', color: '#3178C6', icon: 'typescript' },
    { name: 'React',      color: '#61DAFB', icon: 'react'      },
    { name: 'Next.js',    color: '#1a1a1a', icon: 'nextjs'     },
    { name: 'AWS',        color: '#FF9900', icon: 'aws'        },
    { name: 'Kubernetes', color: '#326CE5', icon: 'kubernetes' },
    { name: 'Docker',     color: '#2496ED', icon: 'docker'     },
    { name: 'Git',        color: '#F05032', icon: 'git'        },
    { name: 'SQL',        color: '#336791', icon: 'sql'        },
    { name: 'Bash',       color: '#4EAA25', icon: 'bash'       },
  ] satisfies TechIcon[],
  socials: [
    { label: 'GitHub',   url: 'https://github.com/Araviss' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/jzonlivingston' },
    { label: 'Email',    url: 'mailto:jzonlivingston@gmail.com' },
  ] satisfies SocialLink[],
} as const;
