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
    { name: 'Python',      color: '#3776AB', icon: 'python'     },
    { name: 'Java',        color: '#ED8B00', icon: 'java'       },
    { name: 'C++',         color: '#00599C', icon: 'cpp'        },
    { name: 'TypeScript',  color: '#3178C6', icon: 'typescript' },
    { name: 'React',       color: '#61DAFB', icon: 'react'      },
    { name: 'Next.js',     color: '#000000', icon: 'nextjs'     },
    { name: 'Node.js',     color: '#339933', icon: 'nodejs'     },
    { name: 'Tailwind',    color: '#06B6D4', icon: 'tailwind'   },
    { name: 'Spring Boot', color: '#6DB33F', icon: 'spring'     },
    { name: 'AWS',         color: '#FF9900', icon: 'aws'        },
    { name: 'Kubernetes',  color: '#326CE5', icon: 'kubernetes' },
    { name: 'Docker',      color: '#2496ED', icon: 'docker'     },
    { name: 'Git',         color: '#F05032', icon: 'git'        },
    { name: 'Linux',       color: '#FCC624', icon: 'linux'      },
    { name: 'Jenkins',     color: '#D24939', icon: 'jenkins'    },
    { name: 'SQL',         color: '#336791', icon: 'sql'        },
    { name: 'Bash',        color: '#4EAA25', icon: 'bash'       },
    { name: 'Datadog',     color: '#632CA6', icon: 'datadog'    },
    { name: 'Splunk',      color: '#65BC47', icon: 'splunk'     },
  ] satisfies TechIcon[],
  socials: [
    { label: 'GitHub',   url: 'https://github.com/Araviss' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/jzonlivingston' },
    { label: 'Email',    url: 'mailto:jzonlivingston@gmail.com' },
  ] satisfies SocialLink[],
} as const;
