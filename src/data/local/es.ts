import { SiteSnapshotSchema, type SiteSnapshotInput } from '../../domain';
import { BLOG_POST_SLUGS, CASE_STUDY_SLUGS } from '../../i18n';

const content = {
  locale: 'es',
  settings: {
    siteName: 'Yerko Acuña',
    localeName: 'Español',
    defaultTitle: 'Yerko Acuña — Ingeniero Full-Stack Senior y Consultor de Software',
    defaultDescription:
      'Ingeniería full-stack senior, liderazgo técnico y desarrollo de software end-to-end para equipos y organizaciones con necesidades operacionales complejas.',
    contactEmail: 'contact@yerkoacuna.dev',
    githubUrl: 'https://github.com/RainBoard01',
    cvPath: '/cv.pdf',
    navigation: {
      home: 'Inicio',
      about: 'Sobre mí',
      experience: 'Experiencia',
      work: 'Trabajo',
      services: 'Servicios',
      blog: 'Blog',
      contact: 'Contacto',
    },
    skipToContentLabel: 'Saltar al contenido',
    openMenuLabel: 'Abrir navegación',
    closeMenuLabel: 'Cerrar navegación',
    languageSwitchLabel: 'Switch to English',
    footerTagline: 'Una práctica técnica, dos formas de trabajar en conjunto.',
    copyrightName: 'Yerko Acuña',
  },
  labels: {
    viewWork: 'Explorar trabajo seleccionado',
    viewAllWork: 'Ver todo el trabajo',
    readCaseStudy: 'Leer caso de estudio',
    visitLiveProject: 'Visitar proyecto en línea',
    downloadCv: 'Descargar CV',
    sendEmail: 'Enviar un correo',
    viewGithub: 'Ver GitHub',
    discussProject: 'Conversemos sobre un proyecto',
    current: 'Actualidad',
    privateProject: 'Proyecto privado',
    publicProject: 'Implementación pública',
    academicProject: 'Proyecto académico',
    context: 'Contexto',
    challenge: 'Desafío',
    responsibility: 'Responsabilidad',
    approach: 'Enfoque',
    outcome: 'Resultado',
    technologies: 'Tecnología',
    relatedWork: 'Trabajo relacionado',
    publishedOn: 'Publicado',
    minuteRead: 'min de lectura',
    topics: 'Temas',
    backToWork: 'Volver a trabajo',
    backToBlog: 'Volver al blog',
    contactEmailLabel: 'Correo',
    noPostsMessage: 'Publicaré nuevas notas cuando exista algo útil que compartir.',
  },
  pages: {
    home: {
      eyebrow: 'Ingeniero senior · Líder técnico · Fundador',
      title: 'Convierto operaciones complejas en software en el que los equipos pueden confiar.',
      description:
        'Trabajo como ingeniero full-stack senior dentro de equipos de producto y lidero proyectos completos de software a través de Desarrollo de Software Yerko Acuña EIRL.',
    },
    about: {
      eyebrow: 'Sobre mí',
      title: 'Profundidad técnica, contexto operacional y responsabilidad clara.',
      description:
        'Mi trabajo conecta requerimientos, arquitectura, implementación, despliegue y aprendizaje en producción, en lugar de tratarlos como entregas aisladas.',
    },
    experience: {
      eyebrow: 'Experiencia',
      title: 'Desarrollo empresarial en dominios regulados y especializados.',
      description:
        'Desde 2022 he contribuido y liderado sistemas para universidades, organizaciones privadas, equipos de investigación y empresas operacionales.',
    },
    work: {
      eyebrow: 'Trabajo seleccionado',
      title: 'Sistemas diseñados alrededor de flujos de trabajo reales.',
      description:
        'Seis ejemplos en gestión de laboratorios, investigación marina, reclutamiento legal, modernización de sistemas, operaciones pesqueras y mantenimiento predictivo.',
    },
    services: {
      eyebrow: 'Consultoría de software',
      title: 'Un camino directo desde el problema operacional hasta un sistema funcionando.',
      description:
        'Desarrollo de Software Yerko Acuña EIRL trabaja con organizaciones que necesitan descubrimiento cuidadoso, implementación senior y continuidad después del lanzamiento.',
    },
    blog: {
      eyebrow: 'Notas de campo',
      title: 'Notas sobre construir y operar software útil.',
      description:
        'Escritura práctica sobre arquitectura, ownership full-stack, modernización, trazabilidad, entrega y las decisiones detrás de sistemas en producción.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Elige el modelo de colaboración que mejor se ajuste al problema.',
      description:
        'Para roles de ingeniería senior, liderazgo técnico o un proyecto completo de software, comparte el contexto y el resultado que necesitas.',
    },
  },
  profile: {
    name: 'Yerko Acuña',
    role: 'Ingeniero Full-Stack Senior',
    secondaryRole: 'Líder Técnico y Consultor Independiente',
    headline: 'Ingeniería end-to-end para productos con operaciones complejas.',
    introduction:
      'Diseño, construyo y opero software a lo largo de todo el proceso: desde comprender el flujo de trabajo hasta mantener el sistema terminado en producción.',
    biography: [
      'Mi experiencia abarca frontend, backend, modelado de datos, entrega en la nube, levantamiento de requerimientos y liderazgo técnico. Ese rango resulta especialmente útil cuando un proyecto cruza límites entre equipos o sistemas y necesita una dirección técnica coherente.',
      'He trabajado en pesca y acuicultura, gestión de laboratorios, investigación marina y reclutamiento legal. Cada dominio exigió aprender su lenguaje, restricciones y riesgos operacionales antes de elegir una arquitectura.',
      'Colaboro de dos maneras: como ingeniero senior o líder técnico integrado a un equipo, y a través de mi empresa de software para proyectos end-to-end con un alcance definido.',
    ],
    locationLabel: 'Chile',
    remoteLabel: 'Colaboración remota entre zonas horarias',
    focusAreas: [
      'Entrega independiente de proyectos',
      'Arquitectura de aplicaciones empresariales',
      'Requerimientos y modelado de dominio',
      'Despliegue en la nube y operación en producción',
    ],
    principles: [
      'Comprender la operación antes de diseñar la interfaz.',
      'Mantener la arquitectura proporcional al sistema y al equipo.',
      'Tratar despliegue, observabilidad y soporte como trabajo de producto.',
      'Hacer que las decisiones sean comprensibles para actores técnicos y operacionales.',
    ],
    domains: [
      'Operaciones pesqueras y acuícolas',
      'Gestión de laboratorios',
      'Datos de investigación marina',
      'Flujos de reclutamiento legal',
    ],
    expertise: [
      {
        id: 'frontend',
        title: 'Ingeniería frontend',
        items: [
          'React 18',
          'TypeScript',
          'Next.js',
          'Redux Toolkit y RTK Query',
          'Ant Design, Mantine UI y DevExtreme',
          'Internacionalización e interfaces accesibles y responsivas',
        ],
      },
      {
        id: 'backend-data',
        title: 'Backend y datos',
        items: [
          'Strapi 4 y 5',
          'Express',
          'FastAPI y Python',
          'PostgreSQL y SQL avanzado',
          'MongoDB y pipelines de agregación',
          'Servicios, controladores e integraciones a medida',
        ],
      },
      {
        id: 'cloud-delivery',
        title: 'Nube y entrega',
        items: [
          'Docker y Docker Compose',
          'GitHub Actions',
          'AWS EC2, DigitalOcean, Azure y Vercel',
          'CapRover y Dokploy',
          'Linux, TLS, reverse proxies y balanceo de carga',
        ],
      },
      {
        id: 'integrations',
        title: 'Integraciones e intercambio de datos',
        items: [
          'OAuth con Azure AD, JWT y acceso basado en roles',
          'APIs gubernamentales y de terceros',
          'Procesamiento de PDF, Excel y XML',
          'Servicios de correo y almacenamiento en la nube',
          'Fundamentos de GraphQL',
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
          'Proyecto de título: SMPIA, un sistema de mantenimiento predictivo construido como arquitectura de microservicios con una integración inicial de machine learning.',
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
        institution: 'Estudio independiente y proyectos prácticos',
        qualification: 'Formación autodidacta en desarrollo full-stack',
        period: '2018–2022',
        description:
          'Formación avanzada en desarrollo full-stack mediante estudio continuo y la entrega de proyectos de software prácticos.',
        technologies: [],
      },
    ],
    languages: [{ language: 'Inglés', level: 'Competencia profesional de trabajo' }],
  },
  company: {
    displayName: 'Desarrollo de Software Yerko Acuña EIRL',
    legalName: 'Desarrollo de Software Yerko Acuña EIRL',
    shortName: 'Yerko Acuña EIRL',
    headline: 'Desarrollo de software liderado por un perfil senior, desde el descubrimiento hasta producción.',
    summary: [
      'Una práctica de software enfocada en organizaciones cuyos flujos ya superaron las planillas, herramientas desconectadas o un sistema heredado que dejó de ajustarse a la operación.',
      'Cada proyecto mantiene descubrimiento, arquitectura, implementación, despliegue y mejora continua conectados a través de un responsable técnico directo.',
    ],
    operatingModel:
      'Colaboración directa con quienes conocen la operación, ciclos cortos de decisión, trade-offs visibles y entregas en incrementos útiles.',
    bestFor: [
      'Plataformas operacionales y sistemas internos',
      'Modernización de aplicaciones existentes',
      'Integraciones y flujos de trazabilidad',
      'Proyectos que necesitan ownership senior a través de todo el stack',
    ],
    commitments: [
      'Un alcance técnico y de entrega claro',
      'Arquitectura ajustada a las restricciones reales de la operación',
      'Despliegue listo para producción y transferencia técnica',
      'Una base mantenible para el desarrollo continuo',
    ],
    contactEmail: 'contact@yerkoacuna.dev',
  },
  experiences: [
    {
      id: 'openlink',
      role: 'Ingeniero Full-Stack Senior, Project Manager y Líder Técnico',
      organization: 'OpenLink SPA',
      engagement: 'employment',
      startYear: 2022,
      endYear: null,
      periodLabel: '2022–Actualidad',
      summary:
        'Desarrollo de software empresarial para universidades chilenas, equipos de investigación, corporaciones y flujos profesionales especializados.',
      highlights: [
        'Responsabilidad sobre áreas completas de aplicaciones: requerimientos, modelado de datos, servicios backend, interfaces frontend y despliegue.',
        'Combinación de ingeniería, coordinación de proyecto y liderazgo técnico según las necesidades de cada iniciativa.',
        'Trabajo en gestión de laboratorios, investigación marina, reclutamiento legal y modernización de sistemas empresariales.',
        'Desarrollo de integraciones, reportes, interfaces multilingües y pipelines de despliegue a producción.',
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
      role: 'Fundador y Lead Developer',
      organization: 'Desarrollo de Software Yerko Acuña EIRL',
      engagement: 'company',
      startYear: 2022,
      endYear: null,
      periodLabel: '2022–Actualidad',
      summary:
        'Práctica independiente de software para sistemas operacionales a medida, inicialmente enfocada en flujos pesqueros y acuícolas.',
      highlights: [
        'Liderazgo de arquitectura, descubrimiento de requerimientos, implementación, despliegue y capacitación del cliente.',
        'Traslado de flujos centrales desde registros manuales desconectados hacia una plataforma operacional centralizada.',
        'Automatización de despliegues con GitHub Actions y CapRover.',
        'Soporte y evolución continua del sistema en producción a medida que cambia la operación.',
      ],
      technologies: ['React', 'TypeScript', 'Strapi', 'PostgreSQL', 'GitHub Actions', 'CapRover'],
      caseStudyIds: ['dipromar'],
    },
  ],
  caseStudies: [
    {
      id: 'farmavet',
      slug: CASE_STUDY_SLUGS.farmavet.es,
      title: 'FARMAVET: gestión de laboratorio',
      client: 'Universidad de Chile',
      period: '2022–2024',
      category: 'Gestión de laboratorios',
      collaborationMode: 'employment',
      visibility: 'private',
      summary:
        'Una plataforma empresarial de laboratorio para flujos de ensayo especializados, trazabilidad regulatoria y registros operacionales complejos.',
      context:
        'El laboratorio necesitaba un sistema único para coordinar su flujo de ensayos y mantener los registros estructurados requeridos en un entorno regulado por SERNAPESCA.',
      challenge:
        'El dominio combinaba relaciones complejas, correlativos automáticos, uso multilingüe y operaciones masivas que debían seguir siendo comprensibles para el personal del laboratorio.',
      responsibilities: [
        'Traducir los procesos de laboratorio a modelos de aplicación y datos.',
        'Entregar funcionalidades full-stack en la interfaz React, servicios Strapi y base de datos PostgreSQL.',
        'Implementar reportes, operaciones masivas, controles de acceso y una interfaz en cuatro idiomas.',
      ],
      approach: [
        'Modelar el dominio explícitamente en lugar de forzar el flujo dentro de pantallas CRUD genéricas.',
        'Usar operaciones a nivel de base de datos cuando importaban la consistencia y el procesamiento masivo.',
        'Mantener alineados la terminología y el comportamiento de la interfaz entre idiomas.',
      ],
      outcomes: [
        'Digitalización de procesos críticos de laboratorio en un sistema centralizado.',
        'Creación de una ruta de trazabilidad más clara para registros de ensayos regulados.',
        'Reemplazo de pasos operacionales fragmentados por un flujo consistente.',
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
      slug: CASE_STUDY_SLUGS['imar-hyops'].es,
      title: 'IMAR HyOPS: plataforma de investigación marina',
      client: 'Universidad de Los Lagos',
      period: '2023',
      category: 'Datos y visualización científica',
      collaborationMode: 'employment',
      visibility: 'public',
      summary:
        'Una plataforma pública para que investigadores publiquen, exploren y visualicen datos de mediciones marinas.',
      context:
        'Una iniciativa de investigación marina necesitaba trasladar datasets de mediciones desde archivos especializados hacia una interfaz que investigadores y visitantes pudieran explorar en línea.',
      challenge:
        'La plataforma debía admitir carga de datos, contexto geográfico, gráficos y presentación pública sin ocultar el significado científico de cada medición.',
      responsibilities: [
        'Desarrollar la aplicación React y los flujos de datos respaldados por Strapi.',
        'Construir vistas de gráficos y mapas para exploración pública.',
        'Empaquetar y desplegar la aplicación con Docker.',
      ],
      approach: [
        'Separar la ingesta de datos de la experiencia pública de exploración.',
        'Combinar gráficos y visualización geográfica alrededor de la estructura de los datos de investigación.',
        'Diseñar la interfaz pública para acceso directo sin requerir una cuenta.',
      ],
      outcomes: [
        'Los investigadores pueden cargar y presentar datos de mediciones en una sola plataforma.',
        'El público puede consultar información científica mediante gráficos y mapas.',
        'La implementación permanece accesible públicamente en producción.',
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
      externalLinkLabel: 'Abrir IMAR HyOPS',
      featured: true,
      sortOrder: 1,
    },
    {
      id: 'recluta',
      slug: CASE_STUDY_SLUGS.recluta.es,
      title: 'RECLUTA: plataforma de reclutamiento legal',
      client: 'Cliente privado',
      period: '2024',
      category: 'Reclutamiento profesional',
      collaborationMode: 'employment',
      visibility: 'private',
      summary:
        'Una plataforma a medida para administrar flujos de reclutamiento legal desde el levantamiento de requerimientos hasta la implementación.',
      context:
        'Un cliente privado necesitaba coordinar reclutamiento especializado en un sistema diseñado alrededor de su proceso, no de una base genérica de candidatos.',
      challenge:
        'El proyecto exigía realizar simultáneamente descubrimiento de requerimientos, arquitectura técnica, coordinación e implementación.',
      responsibilities: [
        'Liderar conversaciones de requerimientos y convertirlas en un plan de entrega.',
        'Definir la arquitectura de aplicación y el modelo de datos.',
        'Implementar el frontend React y el backend Strapi/PostgreSQL.',
      ],
      approach: [
        'Trabajar en un rol híbrido de project manager y developer para acortar la distancia entre decisiones e implementación.',
        'Modelar el flujo de reclutamiento alrededor de la terminología y responsabilidades del cliente.',
        'Usar límites tipados en frontend para mantener explícito el estado complejo del flujo.',
      ],
      outcomes: [
        'Creación de un flujo único para administrar la actividad de reclutamiento especializado.',
        'Conversión de los requerimientos descubiertos en una implementación privada completa.',
        'Entrega de una base capaz de evolucionar junto al proceso del cliente.',
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Mantine UI', 'Strapi 4', 'PostgreSQL'],
      externalUrl: null,
      externalLinkLabel: null,
      featured: false,
      sortOrder: 4,
    },
    {
      id: 'sped-v2',
      slug: CASE_STUDY_SLUGS['sped-v2'].es,
      title: 'SPED v2: modernización de sistema',
      client: 'OpenLink SPA',
      period: '2024',
      category: 'Modernización empresarial',
      collaborationMode: 'employment',
      visibility: 'private',
      summary:
        'Una migración desde una aplicación Django hacia una arquitectura con FastAPI, React y MongoDB.',
      context:
        'Un sistema empresarial existente avanzaba hacia una nueva arquitectura, mientras su comportamiento previo aún debía comprenderse y preservarse.',
      challenge:
        'La migración expuso límites difíciles entre el comportamiento legacy, las nuevas APIs, utilidades Python compartidas y los requerimientos frontend.',
      responsibilities: [
        'Resolver problemas complejos de API y frontend durante la transición.',
        'Contribuir utilidades Python reutilizables mediante el paquete oplnk-python-utils.',
        'Conectar interfaces React y TypeScript con los nuevos servicios FastAPI.',
      ],
      approach: [
        'Rastrear el comportamiento entre el sistema legacy y el sistema objetivo antes de cambiar detalles de implementación.',
        'Extraer responsabilidades Python reutilizables en lugar de duplicar lógica de migración.',
        'Tratar la migración como un problema incremental de compatibilidad, no como una reescritura desde cero.',
      ],
      outcomes: [
        'Desbloqueo de partes complejas del esfuerzo de modernización.',
        'Creación de utilidades reutilizables para la capa de servicios Python.',
        'Avance de la transición hacia la nueva arquitectura de aplicación.',
      ],
      technologies: ['FastAPI', 'Python 3.12', 'MongoDB', 'React', 'TypeScript', 'Mantine UI'],
      externalUrl: null,
      externalLinkLabel: null,
      featured: true,
      sortOrder: 3,
    },
    {
      id: 'dipromar',
      slug: CASE_STUDY_SLUGS.dipromar.es,
      title: 'Dipromar: sistema de operaciones y trazabilidad',
      client: 'Dipromar Seafood Company',
      period: '2022–Actualidad',
      category: 'Operaciones pesqueras',
      collaborationMode: 'company',
      visibility: 'private',
      summary:
        'Una plataforma operacional a medida que centraliza flujos de una planta pesquera y crea un registro continuo de trazabilidad.',
      context:
        'Operaciones centrales de la planta dependían de procesos manuales basados en planillas y distribuidos entre distintas áreas del negocio.',
      challenge:
        'El sistema debía representar la operación productiva real, preservar trazabilidad e introducirse sin interrumpir el trabajo cotidiano.',
      responsibilities: [
        'Liderar descubrimiento, arquitectura, desarrollo full-stack, despliegue y capacitación del cliente.',
        'Traducir requerimientos operacionales relacionados con SERNAPESCA a comportamiento del sistema.',
        'Mantener y extender la aplicación en producción a medida que evolucionan los flujos.',
      ],
      approach: [
        'Construir la plataforma incrementalmente alrededor de las rutas operacionales de mayor valor.',
        'Centralizar registros y relaciones en PostgreSQL detrás de una capa de servicios Strapi.',
        'Automatizar despliegues con GitHub Actions y CapRover.',
      ],
      outcomes: [
        'Traslado de flujos centrales fuera de planillas desconectadas.',
        'Establecimiento de trazabilidad digital para las operaciones de planta.',
        'Creación de una plataforma productiva que continúa evolucionando con el negocio.',
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
      slug: CASE_STUDY_SLUGS.smpia.es,
      title: 'SMPIA: arquitectura de mantenimiento predictivo',
      client: 'Instituto Profesional INACAP',
      period: '2024',
      category: 'Mantenimiento predictivo',
      collaborationMode: 'academic',
      visibility: 'academic',
      summary:
        'Un proyecto de título que explora una plataforma de mantenimiento basada en microservicios y una integración inicial de machine learning.',
      context:
        'El proyecto examinó cómo datos operacionales de mantenimiento, servicios de aplicación y un componente de predicción podían convivir detrás de una experiencia coherente.',
      challenge:
        'Requirió adoptar una arquitectura de múltiples servicios y conectar un flujo básico con TensorFlow/Keras sin perder claridad en el diseño general.',
      responsibilities: [
        'Diseñar los límites entre servicios y el flujo de datos compartido.',
        'Construir la interfaz React, el servicio Strapi, el componente FastAPI y la capa PostgreSQL.',
        'Integrar un modelo predictivo inicial al flujo de la aplicación.',
      ],
      approach: [
        'Separar contenido de aplicación, responsabilidades de predicción y experiencia de usuario en servicios explícitos.',
        'Usar el proyecto para evaluar límites de integración, no para presentar machine learning como una función aislada.',
        'Mantener el componente predictivo intencionalmente inicial y proporcional al alcance académico.',
      ],
      outcomes: [
        'Entrega de una arquitectura de microservicios completa para el proyecto de título.',
        'Demostración de una ruta funcional entre la aplicación y un componente básico de ML.',
        'Creación de un diseño capaz de admitir experimentación más profunda en el futuro.',
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
      title: 'Descubrimiento y arquitectura de software',
      summary:
        'Convertir un problema operacional en un modelo de dominio compartido, un alcance realista y una arquitectura que el equipo futuro pueda mantener.',
      suitableFor: [
        'Nuevas plataformas internas o para clientes',
        'Procesos todavía coordinados mediante planillas y traspasos manuales',
        'Equipos que necesitan reducir el riesgo antes de comprometer una implementación',
      ],
      deliverables: [
        'Mapeo de flujos y requerimientos',
        'Modelo de dominio y datos',
        'Plan de arquitectura e integraciones',
        'Hoja de ruta priorizada',
      ],
      technologies: [],
      sortOrder: 0,
    },
    {
      id: 'full-stack-delivery',
      title: 'Desarrollo full-stack end-to-end',
      summary:
        'Diseñar y construir una aplicación web completa con una sola línea de responsabilidad técnica desde la interfaz hasta producción.',
      suitableFor: [
        'Organizaciones que necesitan un partner senior enfocado en la entrega',
        'Software operacional con roles y flujos complejos',
        'Proyectos donde frontend, backend, datos y despliegue deben avanzar juntos',
      ],
      deliverables: [
        'Interfaz web responsiva',
        'Servicios backend y controles de acceso',
        'Diseño de base de datos y migraciones',
        'Despliegue automatizado a producción',
      ],
      technologies: ['React', 'TypeScript', 'Strapi', 'FastAPI', 'PostgreSQL', 'Docker'],
      sortOrder: 1,
    },
    {
      id: 'modernization-integrations',
      title: 'Modernización e integraciones',
      summary:
        'Hacer avanzar un sistema existente sin descartar el conocimiento operacional que ya contiene.',
      suitableFor: [
        'Migraciones de aplicaciones legacy',
        'Nuevas APIs alrededor de flujos existentes',
        'Integraciones gubernamentales, de identidad, documentos o servicios cloud',
      ],
      deliverables: [
        'Evaluación de comportamiento legacy y dependencias',
        'Estrategia de migración incremental',
        'Implementación de APIs e integraciones',
        'Plan de compatibilidad y puesta en marcha',
      ],
      technologies: ['FastAPI', 'Python', 'React', 'PostgreSQL', 'MongoDB', 'OAuth'],
      sortOrder: 2,
    },
    {
      id: 'production-continuity',
      title: 'Entrega y continuidad en producción',
      summary:
        'Hacer que el despliegue, el aprendizaje operacional y la mejora continua sean parte del producto y no una ocurrencia posterior.',
      suitableFor: [
        'Aplicaciones próximas a su primera salida a producción',
        'Equipos que están reemplazando despliegues manuales',
        'Sistemas que necesitan una ruta práctica de evolución continua',
      ],
      deliverables: [
        'Despliegue containerizado',
        'Flujo CI/CD',
        'Estrategia de ambientes y releases',
        'Transferencia técnica o plan de desarrollo continuo',
      ],
      technologies: ['Docker', 'GitHub Actions', 'CapRover', 'Linux', 'TLS'],
      sortOrder: 3,
    },
  ],
  blogPosts: [
    {
      id: 'end-to-end-ownership',
      slug: BLOG_POST_SLUGS['end-to-end-ownership'].es,
      title: 'Ownership end-to-end es más que entregar código',
      excerpt:
        'Una definición útil de ownership conecta el problema operacional, los límites del sistema, la entrega y el aprendizaje en producción, sin convertir a un ingeniero en un cuello de botella permanente.',
      publishedAt: '2026-08-07',
      readingMinutes: 6,
      topics: ['Liderazgo técnico', 'Arquitectura', 'Entrega'],
      featured: true,
      body: [
        {
          type: 'paragraph',
          text: '“Ownership end-to-end” suele interpretarse como una persona haciendo cada tarea. Eso no es sostenible ni es el objetivo. La versión útil es una línea continua de responsabilidad: alguien puede explicar cómo la necesidad operacional original se convirtió en una decisión de sistema, cómo esa decisión llegó a producción y qué evidencia hará que cambie.',
        },
        {
          type: 'paragraph',
          text: 'Esto importa especialmente en software operacional. Una pantalla, API o tabla puede ser correcta de forma aislada mientras el flujo completo sigue equivocado. El ownership mantiene visible el proceso que rodea al código.',
        },
        { type: 'heading', level: 2, text: 'Comenzar por la operación, no por la lista de funciones' },
        {
          type: 'paragraph',
          text: 'Los requerimientos se vuelven más confiables cuando describen decisiones, traspasos, excepciones y evidencia. Antes de elegir componentes, quiero saber quién realiza el trabajo, qué debe decidir, qué puede fallar y qué registro necesita seguir siendo confiable después.',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '¿Qué evento inicia el flujo?',
            '¿Dónde cambia de manos la responsabilidad?',
            '¿Qué excepciones son parte normal de la operación?',
            '¿Qué información debe poder rastrearse más adelante?',
          ],
        },
        {
          type: 'paragraph',
          text: 'Esas respuestas dan forma al modelo de datos y a los límites del sistema mucho más que una lista genérica de páginas. También vuelven concreta la conversación de alcance: el equipo puede decidir qué ruta operacional debe funcionar primero y cuál puede esperar.',
        },
        { type: 'heading', level: 2, text: 'Los límites importan más que las preferencias de stack' },
        {
          type: 'paragraph',
          text: 'React, FastAPI, Strapi, PostgreSQL o MongoDB pueden ser elecciones razonables. La pregunta difícil es dónde pertenece el conocimiento. Una regla de validación escondida solo en un formulario, una transición duplicada entre servicios o un reporte que reinterpreta silenciosamente el dato de origen harán frágil el sistema sin importar el framework.',
        },
        {
          type: 'paragraph',
          text: 'Buenos límites le dan a cada decisión un lugar comprensible. Simplifican la interfaz, vuelven la API más predecible y reducen sorpresas en cambios futuros. También permiten que especialistas contribuyan sin que una sola persona deba mantener todo el código en su memoria.',
        },
        { type: 'heading', level: 2, text: 'La entrega incluye el ambiente de producción' },
        {
          type: 'paragraph',
          text: 'Una función no está terminada al hacer merge. Configuración, migraciones, despliegue, recuperación y feedback del uso real son parte del mismo diseño. La containerización y la entrega automatizada son útiles porque convierten esas preocupaciones en comportamiento repetible, no porque cada proyecto necesite infraestructura elaborada.',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            '¿Puede reproducirse el release desde un ambiente limpio?',
            '¿Están la configuración y los secretos separados de la aplicación?',
            '¿Puede un cambio de datos aplicarse y revertirse deliberadamente?',
            '¿Existe una señal clara de que el sistema desplegado está sano?',
          ],
        },
        { type: 'heading', level: 2, text: 'El ownership debe crear capacidad, no dependencia' },
        {
          type: 'paragraph',
          text: 'El resultado más fuerte del ownership end-to-end es la claridad compartida. Las decisiones quedan documentadas en la forma del sistema, la entrega se vuelve repetible y el siguiente ingeniero puede entender por qué existe un límite. Si solo una persona puede operar el producto, el ownership se convirtió en riesgo.',
        },
        {
          type: 'quote',
          text: 'Hazte responsable del camino desde el problema hasta producción y luego vuelve ese camino comprensible para otros.',
          attribution: null,
        },
        {
          type: 'paragraph',
          text: 'Ese es el estándar que uso tanto en trabajo integrado con equipos como en proyectos de consultoría: mantener el contexto completo el tiempo suficiente para tomar decisiones coherentes y dejar un sistema y un proceso de entrega que no dependan de conocimiento oculto.',
        },
      ],
    },
  ],
} satisfies SiteSnapshotInput;

export const spanishSnapshot = SiteSnapshotSchema.parse(content);
