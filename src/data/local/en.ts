import { SiteSnapshotSchema, type SiteSnapshotInput } from '../../domain';
import { BLOG_POST_SLUGS, CASE_STUDY_SLUGS } from '../../i18n';

const content = {
  locale: 'en',
  settings: {
    siteName: 'Yerko Acuña',
    localeName: 'English',
    defaultTitle: 'Yerko Acuña — Senior Full-Stack Engineer & Software Consultant',
    defaultDescription:
      'Senior full-stack engineering, technical leadership, and end-to-end software delivery for teams and organizations with complex operational needs.',
    contactEmail: 'contact@yerkoacuna.dev',
    githubUrl: 'https://github.com/RainBoard01',
    cvPath: '/cv.pdf',
    navigation: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      work: 'Work',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
    },
    skipToContentLabel: 'Skip to content',
    openMenuLabel: 'Open navigation',
    closeMenuLabel: 'Close navigation',
    languageSwitchLabel: 'Cambiar a español',
    footerTagline: 'One technical practice, two ways to work together.',
    copyrightName: 'Yerko Acuña',
  },
  labels: {
    viewWork: 'Explore selected work',
    viewAllWork: 'View all work',
    readCaseStudy: 'Read case study',
    visitLiveProject: 'Visit live project',
    downloadCv: 'Download résumé',
    sendEmail: 'Send an email',
    viewGithub: 'View GitHub',
    discussProject: 'Discuss a project',
    current: 'Present',
    privateProject: 'Private engagement',
    publicProject: 'Public implementation',
    academicProject: 'Academic project',
    context: 'Context',
    challenge: 'Challenge',
    responsibility: 'Responsibility',
    approach: 'Approach',
    outcome: 'Outcome',
    technologies: 'Technology',
    relatedWork: 'Related work',
    publishedOn: 'Published',
    minuteRead: 'min read',
    topics: 'Topics',
    backToWork: 'Back to work',
    backToBlog: 'Back to blog',
    contactEmailLabel: 'Email',
    noPostsMessage: 'New notes will be published when there is something useful to share.',
  },
  pages: {
    home: {
      eyebrow: 'Senior engineer · Technical lead · Founder',
      title: 'I turn complex operations into software that teams can rely on.',
      description:
        'I work as a senior full-stack engineer inside product teams and lead complete software engagements through Desarrollo de Software Yerko Acuña EIRL.',
    },
    about: {
      eyebrow: 'About',
      title: 'Engineering depth, operational context, and clear ownership.',
      description:
        'My work connects requirements, architecture, implementation, deployment, and production learning instead of treating them as separate handoffs.',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Enterprise delivery across regulated and specialized domains.',
      description:
        'Since 2022, I have contributed to and led systems for universities, private organizations, research teams, and operational businesses.',
    },
    work: {
      eyebrow: 'Selected work',
      title: 'Systems shaped around real workflows.',
      description:
        'Six examples spanning laboratory management, marine research, legal recruitment, system modernization, fishing operations, and predictive maintenance.',
    },
    services: {
      eyebrow: 'Software consultancy',
      title: 'A direct path from operational problem to working system.',
      description:
        'Desarrollo de Software Yerko Acuña EIRL works with organizations that need thoughtful discovery, senior implementation, and continuity after launch.',
    },
    blog: {
      eyebrow: 'Field notes',
      title: 'Notes on building and operating useful software.',
      description:
        'Practical writing about architecture, full-stack ownership, modernization, traceability, delivery, and the decisions behind production systems.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Choose the collaboration model that fits the problem.',
      description:
        'For senior engineering roles, technical leadership, or a complete software engagement, share the context and the outcome you need.',
    },
  },
  profile: {
    name: 'Yerko Acuña',
    role: 'Senior Full-Stack Engineer',
    secondaryRole: 'Technical Lead & Independent Consultant',
    headline: 'End-to-end engineering for operationally complex products.',
    introduction:
      'I design, build, and operate software across the full delivery path—from understanding the workflow to running the finished system in production.',
    biography: [
      'My experience spans frontend and backend development, data modeling, cloud delivery, requirements work, and technical leadership. That range is most useful when a project crosses team or system boundaries and needs someone to maintain a coherent technical direction.',
      'I have worked across fishing and aquaculture, laboratory management, marine research, and legal recruitment. Each domain required learning its language, constraints, and operational risks before choosing the architecture.',
      'I collaborate in two ways: as a senior engineer or technical lead embedded with a team, and through my software company for focused end-to-end engagements.',
    ],
    locationLabel: 'Chile',
    remoteLabel: 'Remote collaboration across time zones',
    focusAreas: [
      'Independent project delivery',
      'Enterprise application architecture',
      'Requirements and domain modeling',
      'Cloud delivery and production operations',
    ],
    principles: [
      'Understand the operation before designing the interface.',
      'Keep architecture proportional to the system and the team.',
      'Treat deployment, observability, and support as product work.',
      'Make decisions legible to both technical and operational stakeholders.',
    ],
    domains: [
      'Fishing and aquaculture operations',
      'Laboratory management',
      'Marine research data',
      'Legal recruitment workflows',
    ],
    expertise: [
      {
        id: 'frontend',
        title: 'Frontend engineering',
        items: [
          'React 18',
          'TypeScript',
          'Next.js',
          'Redux Toolkit and RTK Query',
          'Ant Design, Mantine UI, and DevExtreme',
          'Internationalization and accessible responsive interfaces',
        ],
      },
      {
        id: 'backend-data',
        title: 'Backend and data',
        items: [
          'Strapi 4 and 5',
          'Express',
          'FastAPI and Python',
          'PostgreSQL and advanced SQL',
          'MongoDB and aggregation pipelines',
          'Custom services, controllers, and integrations',
        ],
      },
      {
        id: 'cloud-delivery',
        title: 'Cloud and delivery',
        items: [
          'Docker and Docker Compose',
          'GitHub Actions',
          'AWS EC2, DigitalOcean, Azure, and Vercel',
          'CapRover and Dokploy',
          'Linux, TLS, reverse proxies, and load balancing',
        ],
      },
      {
        id: 'integrations',
        title: 'Integrations and data exchange',
        items: [
          'OAuth with Azure AD, JWT, and role-based access',
          'Government and third-party APIs',
          'PDF, Excel, and XML processing',
          'Email services and cloud storage',
          'GraphQL fundamentals',
        ],
      },
    ],
    education: [
      {
        id: 'computer-engineering-inacap',
        institution: 'Instituto Profesional INACAP',
        qualification: 'Ingeniero en Informática',
        period: '2024',
        description:
          'Graduation project: SMPIA, a predictive-maintenance system built as a microservices architecture with a foundational machine-learning integration.',
        technologies: [
          'Strapi 5.4',
          'FastAPI',
          'React',
          'TypeScript',
          'PostgreSQL',
          'TensorFlow/Keras',
        ],
      },
      {
        id: 'self-directed-learning',
        institution: 'Independent study and practical projects',
        qualification: 'Self-directed full-stack development',
        period: '2018–2022',
        description:
          'Advanced full-stack learning through continuous study and the delivery of practical software projects.',
        technologies: [],
      },
    ],
    languages: [{ language: 'English', level: 'Professional working proficiency' }],
  },
  company: {
    displayName: 'Desarrollo de Software Yerko Acuña EIRL',
    legalName: 'Desarrollo de Software Yerko Acuña EIRL',
    shortName: 'Yerko Acuña EIRL',
    headline: 'Senior-led software delivery, from discovery through production.',
    summary: [
      'A focused software practice for organizations whose workflows have outgrown spreadsheets, disconnected tools, or an inherited system that no longer fits.',
      'Every engagement keeps discovery, architecture, implementation, deployment, and ongoing improvement connected through one accountable technical lead.',
    ],
    operatingModel:
      'Direct collaboration with the people who understand the operation, short decision loops, visible trade-offs, and delivery in useful increments.',
    bestFor: [
      'Operational platforms and internal systems',
      'Modernization of existing applications',
      'Integrations and traceability workflows',
      'Projects that need senior ownership across the stack',
    ],
    commitments: [
      'A clear technical and delivery scope',
      'Architecture matched to the real operating constraints',
      'Production-ready deployment and handover',
      'A maintainable base for continued development',
    ],
    contactEmail: 'contact@yerkoacuna.dev',
  },
  experiences: [
    {
      id: 'openlink',
      role: 'Senior Full-Stack Engineer, Project Manager & Technical Lead',
      organization: 'OpenLink SPA',
      engagement: 'employment',
      startYear: 2022,
      endYear: null,
      periodLabel: '2022–Present',
      summary:
        'Enterprise software delivery for Chilean universities, research teams, corporations, and specialized professional workflows.',
      highlights: [
        'Owned complete application areas across requirements, data modeling, backend services, frontend interfaces, and deployment.',
        'Combined engineering, project coordination, and technical leadership according to each engagement’s needs.',
        'Worked across laboratory management, marine research, legal recruitment, and enterprise-system modernization.',
        'Built integrations, reporting workflows, multilingual interfaces, and production delivery pipelines.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Strapi',
        'FastAPI',
        'PostgreSQL',
        'MongoDB',
        'Docker',
      ],
      caseStudyIds: ['farmavet', 'imar-hyops', 'recluta', 'sped-v2'],
    },
    {
      id: 'yerko-acuna-eirl',
      role: 'Founder & Lead Developer',
      organization: 'Desarrollo de Software Yerko Acuña EIRL',
      engagement: 'company',
      startYear: 2022,
      endYear: null,
      periodLabel: '2022–Present',
      summary:
        'Independent software practice delivering custom operational systems, initially focused on fishing and aquaculture workflows.',
      highlights: [
        'Led architecture, requirements discovery, implementation, deployment, and client training.',
        'Moved core workflows from disconnected manual records into a centralized operational platform.',
        'Established automated delivery through GitHub Actions and CapRover.',
        'Continues to support and evolve the production system as operational needs change.',
      ],
      technologies: ['React', 'TypeScript', 'Strapi', 'PostgreSQL', 'GitHub Actions', 'CapRover'],
      caseStudyIds: ['dipromar'],
    },
  ],
  caseStudies: [
    {
      id: 'farmavet',
      slug: CASE_STUDY_SLUGS.farmavet.en,
      title: 'FARMAVET laboratory management',
      client: 'Universidad de Chile',
      period: '2022–2024',
      category: 'Laboratory management',
      collaborationMode: 'employment',
      visibility: 'private',
      summary:
        'An enterprise laboratory platform for specialized testing workflows, regulatory traceability, and complex operational records.',
      context:
        'The laboratory needed one system to coordinate its testing workflow and maintain the structured records required in a SERNAPESCA-regulated environment.',
      challenge:
        'The domain combined complex entity relationships, automatic correlatives, multilingual use, and bulk data operations that had to remain understandable to laboratory staff.',
      responsibilities: [
        'Translate laboratory processes into application and data models.',
        'Deliver full-stack features across the React interface, Strapi services, and PostgreSQL database.',
        'Implement reporting, bulk operations, access controls, and a four-language interface.',
      ],
      approach: [
        'Modeled the domain explicitly instead of forcing the workflow into generic CRUD screens.',
        'Used database-level operations where consistency and bulk processing mattered.',
        'Kept terminology and interface behavior aligned across localized versions.',
      ],
      outcomes: [
        'Digitized critical laboratory processes in a centralized system.',
        'Created a clearer traceability path for regulated testing records.',
        'Replaced fragmented operational steps with a consistent workflow.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Strapi 4',
        'PostgreSQL',
        'DevExtreme',
        'i18next',
      ],
      externalUrl: null,
      externalLinkLabel: null,
      featured: true,
      sortOrder: 2,
    },
    {
      id: 'imar-hyops',
      slug: CASE_STUDY_SLUGS['imar-hyops'].en,
      title: 'IMAR HyOPS marine research platform',
      client: 'Universidad de Los Lagos',
      period: '2023',
      category: 'Research data and visualization',
      collaborationMode: 'employment',
      visibility: 'public',
      summary:
        'A public platform for researchers to publish, explore, and visualize marine measurement data.',
      context:
        'A marine research initiative needed to move measurement datasets from specialist files into an interface that researchers and public visitors could explore online.',
      challenge:
        'The platform had to support data upload, geographic context, charts, and public presentation without obscuring the scientific meaning of each measurement.',
      responsibilities: [
        'Develop the React application and Strapi-backed data workflows.',
        'Build chart and map views for public exploration.',
        'Package and deploy the application with Docker.',
      ],
      approach: [
        'Separated data ingestion from the public exploration experience.',
        'Combined charting and geographic visualization around the structure of the research data.',
        'Designed the public interface for direct access without requiring an account.',
      ],
      outcomes: [
        'Researchers can upload and present measurement data through one platform.',
        'The public can inspect research information through charts and maps.',
        'The implementation remains publicly accessible in production.',
      ],
      technologies: [
        'React 18',
        'Strapi 4',
        'PostgreSQL',
        'ApexCharts',
        'Mapbox GL',
        'Docker',
      ],
      externalUrl: 'https://hyops.ulagos.cl/app/inicio',
      externalLinkLabel: 'Open IMAR HyOPS',
      featured: true,
      sortOrder: 1,
    },
    {
      id: 'recluta',
      slug: CASE_STUDY_SLUGS.recluta.en,
      title: 'RECLUTA legal recruitment platform',
      client: 'Private client',
      period: '2024',
      category: 'Professional recruitment',
      collaborationMode: 'employment',
      visibility: 'private',
      summary:
        'A tailored platform for managing legal-professional recruitment workflows from requirements through implementation.',
      context:
        'A private client needed to coordinate specialized recruitment work in a system designed around its own process rather than a generic candidate database.',
      challenge:
        'The project required simultaneous requirements discovery, technical architecture, project coordination, and implementation.',
      responsibilities: [
        'Lead requirements conversations and translate them into a delivery plan.',
        'Define the application architecture and data model.',
        'Implement the React frontend and Strapi/PostgreSQL backend.',
      ],
      approach: [
        'Worked in a hybrid project-manager and developer role to shorten the path between decisions and implementation.',
        'Modeled the recruitment workflow around the client’s terminology and responsibilities.',
        'Used typed frontend boundaries to keep complex workflow state explicit.',
      ],
      outcomes: [
        'Created one workflow for managing specialized recruitment activity.',
        'Turned discovered requirements into a complete private implementation.',
        'Provided a foundation that can evolve with the client’s process.',
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Mantine UI', 'Strapi 4', 'PostgreSQL'],
      externalUrl: null,
      externalLinkLabel: null,
      featured: false,
      sortOrder: 4,
    },
    {
      id: 'sped-v2',
      slug: CASE_STUDY_SLUGS['sped-v2'].en,
      title: 'SPED v2 system modernization',
      client: 'OpenLink SPA',
      period: '2024',
      category: 'Enterprise modernization',
      collaborationMode: 'employment',
      visibility: 'private',
      summary:
        'A migration from a Django application toward a FastAPI, React, and MongoDB architecture.',
      context:
        'An established enterprise system was moving to a new application architecture while its existing behavior still had to be understood and preserved.',
      challenge:
        'Migration work exposed difficult boundaries between legacy behavior, new APIs, shared Python utilities, and frontend requirements.',
      responsibilities: [
        'Resolve complex API and frontend implementation issues during the transition.',
        'Contribute reusable Python utilities through the oplnk-python-utils package.',
        'Connect React and TypeScript interfaces to the new FastAPI services.',
      ],
      approach: [
        'Traced behavior across the legacy and target systems before changing implementation details.',
        'Extracted reusable Python concerns instead of duplicating migration logic.',
        'Handled migration as an incremental compatibility problem rather than a clean-slate rewrite.',
      ],
      outcomes: [
        'Unblocked difficult parts of the modernization effort.',
        'Established reusable utilities for the Python service layer.',
        'Advanced the transition toward the new application architecture.',
      ],
      technologies: ['FastAPI', 'Python 3.12', 'MongoDB', 'React', 'TypeScript', 'Mantine UI'],
      externalUrl: null,
      externalLinkLabel: null,
      featured: true,
      sortOrder: 3,
    },
    {
      id: 'dipromar',
      slug: CASE_STUDY_SLUGS.dipromar.en,
      title: 'Dipromar operations and traceability system',
      client: 'Dipromar Seafood Company',
      period: '2022–Present',
      category: 'Fishing operations',
      collaborationMode: 'company',
      visibility: 'private',
      summary:
        'A custom operational platform that centralizes fishing-plant workflows and creates a continuous traceability record.',
      context:
        'Core plant operations depended on manual, spreadsheet-based processes distributed across different parts of the business.',
      challenge:
        'The system had to reflect real production operations, preserve traceability, and be introduced without disrupting day-to-day work.',
      responsibilities: [
        'Lead discovery, architecture, full-stack development, deployment, and client training.',
        'Translate SERNAPESCA-related operational requirements into system behavior.',
        'Maintain and extend the production application as workflows evolve.',
      ],
      approach: [
        'Built the platform incrementally around the highest-value operational paths.',
        'Centralized records and relationships in PostgreSQL behind a Strapi service layer.',
        'Automated deployments with GitHub Actions and CapRover.',
      ],
      outcomes: [
        'Moved core workflows out of disconnected spreadsheets.',
        'Established digital traceability across plant operations.',
        'Created a production platform that continues to evolve with the business.',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Strapi 4',
        'PostgreSQL',
        'GitHub Actions',
        'CapRover',
      ],
      externalUrl: null,
      externalLinkLabel: null,
      featured: true,
      sortOrder: 0,
    },
    {
      id: 'smpia',
      slug: CASE_STUDY_SLUGS.smpia.en,
      title: 'SMPIA predictive-maintenance architecture',
      client: 'Instituto Profesional INACAP',
      period: '2024',
      category: 'Predictive maintenance',
      collaborationMode: 'academic',
      visibility: 'academic',
      summary:
        'A graduation project exploring a microservices-based maintenance platform with a foundational machine-learning integration.',
      context:
        'The project examined how operational maintenance data, application services, and a prediction component could coexist behind a coherent product interface.',
      challenge:
        'It required adopting a multi-service architecture and connecting a basic TensorFlow/Keras workflow without losing clarity in the broader application design.',
      responsibilities: [
        'Design the service boundaries and shared data flow.',
        'Build the React interface, Strapi service, FastAPI component, and PostgreSQL layer.',
        'Integrate a foundational predictive model into the application workflow.',
      ],
      approach: [
        'Separated application content, prediction concerns, and the user-facing workflow into explicit services.',
        'Used the project to evaluate integration boundaries rather than presenting machine learning as a standalone feature.',
        'Kept the predictive component intentionally foundational and proportional to the academic scope.',
      ],
      outcomes: [
        'Delivered a complete microservices architecture for the graduation project.',
        'Demonstrated a working path between the application and a basic ML component.',
        'Established a system design that could support deeper experimentation later.',
      ],
      technologies: [
        'Strapi 5.4',
        'FastAPI',
        'React',
        'TypeScript',
        'PostgreSQL',
        'TensorFlow/Keras',
      ],
      externalUrl: null,
      externalLinkLabel: null,
      featured: false,
      sortOrder: 5,
    },
  ],
  services: [
    {
      id: 'discovery-architecture',
      title: 'Discovery and software architecture',
      summary:
        'Turn an operational problem into a shared domain model, a realistic scope, and an architecture the future team can maintain.',
      suitableFor: [
        'New internal or customer-facing platforms',
        'Processes still coordinated through spreadsheets and manual handoffs',
        'Teams that need to de-risk a build before committing to implementation',
      ],
      deliverables: [
        'Workflow and requirements mapping',
        'Domain and data model',
        'Architecture and integration plan',
        'Prioritized delivery roadmap',
      ],
      technologies: [],
      sortOrder: 0,
    },
    {
      id: 'full-stack-delivery',
      title: 'End-to-end full-stack delivery',
      summary:
        'Design and build a complete web application with one technical line of responsibility from interface to production.',
      suitableFor: [
        'Organizations that need a focused senior delivery partner',
        'Operational software with complex roles and workflows',
        'Projects where frontend, backend, data, and deployment must move together',
      ],
      deliverables: [
        'Responsive web interface',
        'Backend services and access controls',
        'Database design and migrations',
        'Automated production deployment',
      ],
      technologies: ['React', 'TypeScript', 'Strapi', 'FastAPI', 'PostgreSQL', 'Docker'],
      sortOrder: 1,
    },
    {
      id: 'modernization-integrations',
      title: 'Modernization and integrations',
      summary:
        'Move an existing system forward without discarding the operational knowledge encoded in it.',
      suitableFor: [
        'Legacy application migrations',
        'New APIs around existing workflows',
        'Government, identity, document, or cloud-service integrations',
      ],
      deliverables: [
        'Legacy behavior and dependency assessment',
        'Incremental migration strategy',
        'API and integration implementation',
        'Compatibility and rollout plan',
      ],
      technologies: ['FastAPI', 'Python', 'React', 'PostgreSQL', 'MongoDB', 'OAuth'],
      sortOrder: 2,
    },
    {
      id: 'production-continuity',
      title: 'Production delivery and continuity',
      summary:
        'Make deployment, operational feedback, and continued improvement part of the product rather than an afterthought.',
      suitableFor: [
        'Applications approaching their first production release',
        'Teams replacing manual deployments',
        'Systems that need a practical ongoing improvement path',
      ],
      deliverables: [
        'Containerized deployment',
        'CI/CD workflow',
        'Environment and release strategy',
        'Technical handover or continued development plan',
      ],
      technologies: ['Docker', 'GitHub Actions', 'CapRover', 'Linux', 'TLS'],
      sortOrder: 3,
    },
  ],
  blogPosts: [
    {
      id: 'end-to-end-ownership',
      slug: BLOG_POST_SLUGS['end-to-end-ownership'].en,
      title: 'End-to-end ownership is more than shipping code',
      excerpt:
        'A useful definition of ownership connects the operational problem, system boundaries, delivery, and production feedback—without turning one engineer into a permanent bottleneck.',
      publishedAt: '2026-08-07',
      readingMinutes: 6,
      topics: ['Engineering leadership', 'Architecture', 'Delivery'],
      featured: true,
      body: [
        {
          type: 'paragraph',
          text: '“End-to-end ownership” is often interpreted as one person doing every task. That is neither sustainable nor the point. The useful version is a continuous line of responsibility: somebody can explain how the original operational need became a system decision, how that decision reached production, and what evidence will cause it to change.',
        },
        {
          type: 'paragraph',
          text: 'This matters most in operational software. A screen, API, or database table can be locally correct while the complete workflow is still wrong. Ownership keeps the surrounding process visible.',
        },
        { type: 'heading', level: 2, text: 'Start with the operation, not the feature list' },
        {
          type: 'paragraph',
          text: 'Requirements become more reliable when they describe decisions, handoffs, exceptions, and evidence. Before choosing components, I want to know who performs the work, what they need to decide, what can fail, and which record must remain trustworthy afterward.',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'What event starts the workflow?',
            'Where does responsibility change hands?',
            'Which exceptions are normal rather than exceptional?',
            'What information must be traceable later?',
          ],
        },
        {
          type: 'paragraph',
          text: 'Those answers shape the data model and system boundaries more than a generic checklist of pages. They also make scope discussions concrete: a team can decide which operational path needs to work first and which can wait.',
        },
        { type: 'heading', level: 2, text: 'Boundaries matter more than stack preferences' },
        {
          type: 'paragraph',
          text: 'React, FastAPI, Strapi, PostgreSQL, or MongoDB can all be reasonable choices. The harder question is where knowledge belongs. A validation rule hidden only in a form, a status transition duplicated across services, or a report that silently reinterprets source data will make the system fragile regardless of the framework.',
        },
        {
          type: 'paragraph',
          text: 'Good boundaries give each decision an understandable home. They make the interface simpler, the API more predictable, and future changes less surprising. They also let specialists contribute without needing one person to hold the entire codebase in memory.',
        },
        { type: 'heading', level: 2, text: 'Delivery includes the production environment' },
        {
          type: 'paragraph',
          text: 'A feature is not complete at merge. Configuration, migrations, deployment, recovery, and feedback from real use are part of the same design. Containerization and automated delivery are useful because they turn those concerns into repeatable system behavior, not because every project needs elaborate infrastructure.',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Can the release be reproduced from a clean environment?',
            'Are configuration and secrets separated from the application?',
            'Can a data change be applied and reversed deliberately?',
            'Is there a clear signal that the deployed system is healthy?',
          ],
        },
        { type: 'heading', level: 2, text: 'Ownership should create leverage, not dependency' },
        {
          type: 'paragraph',
          text: 'The strongest outcome of end-to-end ownership is shared clarity. Decisions are documented in the shape of the system, delivery becomes repeatable, and the next engineer can understand why a boundary exists. If only one person can operate the product, ownership has turned into a risk.',
        },
        {
          type: 'quote',
          text: 'Own the path from problem to production, then make that path understandable to others.',
          attribution: null,
        },
        {
          type: 'paragraph',
          text: 'That is the standard I use for both embedded engineering work and consultancy engagements: maintain the full context long enough to make coherent decisions, then leave behind a system and a delivery process that do not depend on hidden knowledge.',
        },
      ],
    },
  ],
} satisfies SiteSnapshotInput;

export const englishSnapshot = SiteSnapshotSchema.parse(content);
