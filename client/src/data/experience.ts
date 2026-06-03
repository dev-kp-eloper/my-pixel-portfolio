export interface QuestItem {
  id: string;
  type: 'MAIN' | 'SIDE';
  guildName: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  objectives: string[];
}

export const quests: QuestItem[] = [
  {
    id: 'tcs-bancs',
    type: 'MAIN',
    guildName: 'Tata Consultancy Services (TCS)',
    role: 'Software Developer (TCS BaNCS)',
    location: 'Indore, India',
    duration: '2024 - PRESENT',
    description: 'Leading frontend engineering on the enterprise TCS BaNCS banking platform, building high-reliability payment networks, and integrating cross-border financial standard formats.',
    objectives: [
      'Built 15+ React.js/TypeScript screens for ISO 20022 across 5 cross-border payment modules, serving 3 global banking clients.',
      'Eliminated 12+ race conditions via async/await + custom React Hooks → UI responsiveness +25%.',
      'Reduced API calls 30% via refined useEffect + useMemo/useCallback → saved ~200ms/render.',
      'Implemented React.memo, lazy loading (React.lazy + Suspense), code splitting → bundle size -35%, TTI 4.2s→2.7s.',
      'Integrated BFF middleware via RESTful APIs (JSON/JOLT) across 50+ endpoints → errors -50%.',
      'Jenkins CI/CD via TCS Cloud Vistara for deployment automation.',
      'Led code reviews for team of 5, mentored 3 junior developers.'
    ]
  },
  {
    id: 'persistent-systems',
    type: 'SIDE',
    guildName: 'Persistent Systems',
    role: 'Software Engineer - Engineering Program',
    location: 'Indore, India',
    duration: '2023',
    description: 'Worked on database scripting, SQL queries and backend reporting interfaces for data processing.',
    objectives: [
      'Optimized SQL queries and backend data scripts → query time -20%, improved production reporting reliability.',
      'Assisted in regression tests for reporting tables, ensuring schema compatibility.'
    ]
  }
];
