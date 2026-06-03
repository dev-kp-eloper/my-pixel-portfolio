export interface RPGStat {
  label: string;
  skillName: string;
  value: number;
}

export const rpgStats: RPGStat[] = [
  { label: 'STRENGTH', skillName: 'React.js', value: 90 },
  { label: 'AGILITY', skillName: 'TypeScript', value: 88 },
  { label: 'MAGIC', skillName: 'Node.js', value: 80 },
  { label: 'DEFENSE', skillName: 'MongoDB/SQL', value: 75 },
  { label: 'SPEED', skillName: 'Docker/K8s', value: 70 },
  { label: 'WISDOM', skillName: 'ISO 20022', value: 90 },
  { label: 'LUCK', skillName: 'CI/CD', value: 72 }
];

export const skillCategories = [
  {
    title: 'WEAPONS (Frameworks)',
    skills: ['React.js', 'Redux', 'Zustand', 'ReactFlow', 'TailwindCSS']
  },
  {
    title: 'SPELLS (Languages)',
    skills: ['JavaScript', 'TypeScript', 'C++', 'Java', 'SQL', 'Python']
  },
  {
    title: 'EQUIPMENT (Tools)',
    skills: ['Git', 'Docker', 'Kubernetes', 'Jenkins', 'Postman', 'MongoDB', 'MySQL']
  },
  {
    title: 'PASSIVE SKILLS (Domain)',
    skills: ['ISO 20022', 'Cross-Border Payments', 'Microservices', 'SOLID', 'System Design']
  },
  {
    title: 'PARTY BUFFS (Soft Skills)',
    skills: ['Mentoring', 'Code Reviews', 'Agile/Scrum', 'Stakeholder Communication']
  }
];
