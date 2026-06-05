export interface Project {
  id: string;
  name: string;
  rarity: 'LEGENDARY' | 'EPIC' | 'RARE' | 'UNCOMMON' | 'COMMON';
  icon: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  xp: number;
  shortSummary: string;
  detailedDescription: string;
  impactMetrics: string[];
}

export const primaryProjects: Project[] = [
  {
    id: 'system-design-studio',
    name: 'System Design Studio',
    rarity: 'LEGENDARY',
    icon: '📐',
    stack: ['React', 'TypeScript', 'ReactFlow', 'Zustand', 'Spring Boot', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'GitHub Actions'],
    liveUrl: 'https://systemdesign-studio.vercel.app/',
    githubUrl: 'https://github.com/dev-kp-eloper/System-Design-Studio',
    xp: 9999,
    shortSummary: 'An interactive system design canvas featuring drag-and-drop components, GraphQL state serialization, and a Java Spring Boot rule engine.',
    detailedDescription: `System Design Studio is an advanced visual modeling suite designed to build, review, and validate software architecture diagrams. 
    
    The frontend features an interactive system design canvas built using ReactFlow and Zustand, supporting 12+ architectural component types. It integrates GraphQL for canvas state serialization, reducing payload sizes by 35% and dropping load latency under 50ms.
    
    The backend is built with a Spring Boot Java review engine implementing 15+ deterministic rules to validate system architectural compliance. It also includes asynchronous AI analysis pipelines to parse raw LLM responses, extracting structural bottlenecks under 50ms.
    
    The application includes 25+ tests written using JUnit 5, MockMvc, and React Testing Library, achieving 90%+ code coverage across the API and user interface. It is fully containerized and orchestrated using Docker and Kubernetes, with automated CI/CD builds verified via GitHub Actions.`,
    impactMetrics: [
      'Architected interactive system design canvas using ReactFlow + Zustand for 12+ component types.',
      'Integrated GraphQL for canvas state serialization, reducing payload sizes by 35% and load latency under 50ms.',
      'Developed Spring Boot review engine implementing 15+ deterministic rules to validate system architectural compliance.',
      'Engineered asynchronous AI analysis pipelines to parse raw LLM responses, extracting structural bottlenecks under 50ms.',
      'Wrote 25+ tests using JUnit 5, MockMvc, and React Testing Library, achieving 90%+ coverage across API and UI.',
      'Orchestrated microservices using Docker and Kubernetes, automating testing and build verification via GitHub Actions.'
    ]
  },
  {
    id: 'pipeline-builder',
    name: 'Pipeline Builder',
    rarity: 'LEGENDARY',
    icon: '⚔️',
    stack: ['React', 'TypeScript', 'Node.js', 'ReactFlow', 'Zustand', 'Jest', 'Docker', 'Kubernetes', 'GitHub Actions'],
    liveUrl: 'https://github.com/dev-kp-eloper/PipelineBuilder',
    githubUrl: 'https://github.com/dev-kp-eloper/PipelineBuilder',
    xp: 9999,
    shortSummary: 'A visual drag-and-drop DAG pipeline editor featuring variable parsing, cyclical checks, and full containerized deployments.',
    detailedDescription: `Pipeline Builder is an advanced visual workflow manager designed to model, check, and run Directed Acyclic Graph (DAG) pipelines in real-time. 
    
    The frontend features a drag-and-drop editor powered by ReactFlow and Zustand for efficient state propagation. It features an inline regex variable parser that extracts variables (like {{my_variable}}) dynamically to generate handle connections across six unique node classes.
    
    The backend is built using Node.js and Express and implements Kahn's Topological Sort Algorithm for real-time cycle detection, validating configuration graphs containing over 50+ nodes in milliseconds. It provides robust error messages explaining cycle boundaries.
    
    The codebase is covered by over 45+ unit and integration tests using Jest (achieving 85% coverage). Containerized using multi-stage Docker builds and orchestrated using Kubernetes, the pipeline uses GitHub Actions to automate CI/CD deployments.`,
    impactMetrics: [
      'Eliminated 100% of cycle-based runtime failures via Kahn\'s algorithm validation.',
      'Achieved 85%+ code coverage across visual state hooks and API routes.',
      'Containerized with a multi-stage Docker build, cutting image footprint by 40%.'
    ]
  },
  {
    id: 'mini-os-simulator',
    name: 'Mini OS Simulator',
    rarity: 'EPIC',
    icon: '🛡️',
    stack: ['MERN Stack', 'CPU Scheduling', 'Memory Allocation', 'First-Fit', 'React Hooks', 'Node.js API'],
    liveUrl: 'https://mini-os-simulator-ui.vercel.app/',
    githubUrl: 'https://github.com/dev-kp-eloper/Mini-Operating-System-Simulator',
    xp: 7500,
    shortSummary: 'Full-stack MERN Operating System simulator demonstrating real-time CPU scheduling algorithms and memory partition allocation.',
    detailedDescription: `An interactive computer science education portal simulating foundational Operating System principles. 
    
    The application models 3 CPU scheduling policies: Round Robin (with adjustable time quantum), First-Come First-Served (FCFS), and Priority Scheduling (preemptive and non-preemptive), processing up to 10+ concurrent simulated processes.
    
    The memory allocation module implements the First-Fit algorithm, managing 50+ memory blocks dynamically. It handles memory fragmentation, compacts memory processes, and visualizes partition maps.
    
    The React-based dashboard polls a Node.js Express REST API every 2 seconds to synchronize CPU registers, process execution logs, and partition maps. The Express backend processes 100+ process state transitions per simulation loop.`,
    impactMetrics: [
      'Reduced memory fragmentation by 30% via real-time First-Fit memory allocation calculations.',
      'Rendered fluid process switching timelines on React frontend with 2-second backend polling.',
      'Used by computer science students to visualize context switching and priority inversion.'
    ]
  },
  {
    id: 'pathfinding-visualizer',
    name: 'Pathfinding Visualizer',
    rarity: 'RARE',
    icon: '🗺️',
    stack: ['C++', 'SFML Library', 'A* Search', 'BFS', 'Greedy BFS', 'Data Structures'],
    githubUrl: 'https://github.com/dev-kp-eloper/Path_Finding_Visualizer',
    liveUrl: 'https://github.com/dev-kp-eloper/A-Star-Search-Path_finding-Game',
    xp: 6000,
    shortSummary: 'Interactive C++/SFML 2D grid visualizer displaying pathfinding searches and obstacle avoidance at 60 frames per second.',
    detailedDescription: `A high-performance C++ visualizer mapping search patterns across a 500+ node matrix. 
    
    Implemented pathfinding algorithms include A* Search (using Manhattan and Euclidean distance heuristics), Breadth-First Search (BFS), and Greedy Best-First Search. 
    
    The grid-rendering subsystem uses the SFML graphics library, rendering at 60 FPS. It supports interactive grid drawing, allowing users to paint obstacle walls, set start/end nodes, and weight cells.
    
    The project includes a game-like mode where the user guides a character through randomly generated mazes while avoiding traps.`,
    impactMetrics: [
      'Maintained stable 60 FPS rendering under heavy grid updates and queue calculations.',
      'Visualizes search node expansion (closed/open lists) dynamically.',
      'Includes procedurally generated mazes via Recursive Division algorithms.'
    ]
  }
];

export const secondaryProjects: Project[] = [
  {
    id: 'contact-manager-api',
    name: 'Contact Manager API',
    rarity: 'UNCOMMON',
    icon: '📜',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT Auth', 'MVC Architecture', 'Bcrypt.js'],
    githubUrl: 'https://github.com/dev-kp-eloper/Contact-manager-app',
    xp: 4000,
    shortSummary: 'Secure, production-ready RESTful API for contact management with JWT auth and validation.',
    detailedDescription: `A production-ready RESTful backend built with Express and MongoDB. 
    
    Implements secure JSON Web Token (JWT) user authentication, password hashing with bcrypt, input validation schemas, and robust global error handling. 
    
    Organized under the Model-View-Controller (MVC) directory structure, this API serves as a foundation for contact management apps, featuring secure CORS, rate limiting, and MongoDB schema definitions.`,
    impactMetrics: [
      'Secured user routes using stateless JWT headers and expiration limits.',
      'Handles database schemas with strict Mongoose middleware hooks.'
    ]
  },
  {
    id: 'hirehub-assignment',
    name: 'Recruit AI Dashboard',
    rarity: 'COMMON',
    icon: '🔧',
    stack: ['React.js', 'TypeScript', 'Node.js', 'Express', 'CSS Variables', 'API Integration'],
    githubUrl: 'https://github.com/dev-kp-eloper/TheHireHubTechAssignment',
    xp: 3000,
    shortSummary: 'A recruitment workflow dashboard built as a technical assignment for HireHub AI startup.',
    detailedDescription: `A full-stack candidate tracking dashboard built to demonstrate rapid prototyping capabilities under a tight time limit.
    
    The frontend is built with React and TypeScript, providing searchable grid filters, status updates, and interactive profiles.
    
    The backend integrates node services to handle candidate record stores and dynamic updates.`,
    impactMetrics: [
      'Created a responsive frontend in under 48 hours for HireHub AI evaluation.',
      'Integrated React state filters for sorting applicants by stage, tech, and rating.'
    ]
  }
];

export interface OssContribution {
  repo: string;
  description: string;
  link: string;
  status: 'CONTRIBUTED' | 'IN_PROGRESS';
  technologies: string[];
}

export const ossContributions: OssContribution[] = [
  {
    repo: 'Cal.com',
    description: 'Open-source scheduling infrastructure. Contributed to frontend components, type safety improvements, and calendar widget fixes.',
    link: 'https://github.com/calcom/cal.com',
    status: 'CONTRIBUTED',
    technologies: ['React', 'TypeScript', 'Next.js', 'tRPC']
  },
  {
    repo: 'Twenty CRM',
    description: 'Open-source modern CRM platform. Provided frontend UI contributions, improving field visibility and record selections.',
    link: 'https://github.com/twentyhq/twenty',
    status: 'CONTRIBUTED',
    technologies: ['React', 'TypeScript', 'GraphQL', 'NestJS']
  },
  {
    repo: 'Novu',
    description: 'Open-source notification system. Contributed to notification component library styles and layout responsiveness.',
    link: 'https://github.com/novuhq/novu',
    status: 'CONTRIBUTED',
    technologies: ['React', 'Node.js', 'TypeScript']
  }
];
