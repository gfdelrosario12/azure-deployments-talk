import { SlideData } from './types';

export const functionsSwaSlides: SlideData[] = [
  // ── 3. AZURE FUNCTIONS ────────────────────────────────────────────────────

  {
    id: 'functions-statement',
    title: 'Azure Functions',
    section: 'Azure Functions (Serverless)',
    type: 'statement',
    statement: 'Deploy individual functions. Run them only when triggered.',
    subtitle: 'Serverless — no server management, no 24/7 idle cost.',
    motifBadge: 'Serverless // Event-Driven',
    logos: [{ src: '/assets/icons/azure-functions.svg', alt: 'Azure Functions' }],
    speakerNotes: [
      'Now, we go one step further with Azure Functions.',
      'Azure Functions moves us into a serverless approach. Serverless does not mean there are no servers — there are still servers running our code. We just do not have to manage them ourselves.',
      'Instead of deploying an entire application and keeping it running 24/7, we deploy individual functions that run when something triggers them.',
    ],
  },

  {
    id: 'functions-architecture',
    title: 'Azure Functions: Event-Driven Execution',
    section: 'Azure Functions (Serverless)',
    type: 'architecture',
    motifBadge: 'Architecture: Functions',
    summary:
      'A function wakes up when triggered — HTTP request, queue message, file upload, or scheduled timer — executes, and shuts down. Azure handles scaling automatically.',
    diagram: {
      nodes: [
        { id: 'triggers', label: 'Triggers', sublabel: 'HTTP / Queue / File / Timer', type: 'user' },
        { id: 'fn', label: 'Azure Function', sublabel: 'On-Demand Execution', type: 'compute' },
        { id: 'output', label: 'Output / Response', sublabel: 'DB / Queue / HTTP', type: 'storage' },
      ],
      edges: [
        { from: 'triggers', to: 'fn', label: 'invokes' },
        { from: 'fn', to: 'output', label: 'returns / persists' },
      ],
    },
    highlights: [
      'Runs only when triggered — zero idle cost',
      'Triggers: HTTP request, queue message, file upload, scheduled timer',
      'Azure auto-scales from 0 to thousands of executions',
      'Example: a calculation API endpoint — no full backend needed',
    ],
    speakerNotes: [
      'Kanina sa VM, kailangan nating patakbuhin yung buong server 24/7.',
      'Sa App Service, we deploy our application and Azure manages the infrastructure.',
      'Dito naman, we deploy a specific piece of code and let Azure execute it whenever it is needed.',
      'For example: an API endpoint that calculates something. Instead of running an entire backend just for that one operation, we create an Azure Function that handles that specific request.',
      'Because it is event-driven, Azure can automatically scale the function depending on workload.',
    ],
  },

  // ── 4. STATIC WEB APPS + APP SERVICE ─────────────────────────────────────

  {
    id: 'swa-appservice-statement',
    title: 'Static Web Apps + App Service',
    section: 'Static Web Apps + App Service',
    type: 'statement',
    statement: 'Separate the frontend and the backend.',
    subtitle: 'Host your UI on Static Web Apps. Host your API on App Service. Deploy them independently.',
    motifBadge: 'Hybrid // Decoupled Architecture',
    logos: [
      { src: '/assets/icons/azure-static-web-apps.svg', alt: 'Azure Static Web Apps' },
      { src: '/assets/icons/azure-app-service.svg', alt: 'Azure App Service' },
    ],
    speakerNotes: [
      'Now, we can combine Azure Static Web Apps and Azure App Service to build a full-stack application.',
      'The idea is simple: instead of hosting our frontend and backend together in one service, we separate them.',
      'Kung kanina sa App Service, sinabi natin na pwede nating ilagay doon yung buong application, ngayon hinihiwalay natin yung frontend at backend.',
    ],
  },

  {
    id: 'swa-appservice-architecture',
    title: 'Static Web Apps + App Service Architecture',
    section: 'Static Web Apps + App Service',
    type: 'architecture',
    motifBadge: 'Architecture: SWA + App Service',
    summary:
      'User opens the site — Static Web Apps serves the frontend. When the frontend needs data, it calls the REST API hosted on App Service.',
    diagram: {
      nodes: [
        { id: 'user', label: 'End User', sublabel: 'Browser', type: 'user' },
        { id: 'swa', label: 'Static Web Apps', sublabel: 'React / Vue / Angular', type: 'network' },
        { id: 'appservice', label: 'App Service', sublabel: 'Node / Java / Python API', type: 'compute' },
        { id: 'db', label: 'Database', sublabel: 'Azure SQL / Cosmos', type: 'storage' },
      ],
      edges: [
        { from: 'user', to: 'swa', label: '1. Load frontend' },
        { from: 'user', to: 'appservice', label: '2. API calls for data' },
        { from: 'appservice', to: 'db', label: '3. Query / persist' },
      ],
    },
    highlights: [
      'Frontend and backend deploy via independent CI/CD pipelines',
      'Static Web Apps: global CDN, free SSL, GitHub Actions built in',
      'App Service: continuously running REST API (Node, Java, Python, .NET)',
      'Frontend calls the App Service API when it needs data',
    ],
    speakerNotes: [
      'Kung may user na nag-open ng website natin, Static Web Apps ang magsi-serve ng frontend.',
      'Then kapag kailangan ng data, tatawag yung frontend sa API na naka-host sa App Service.',
      'This allows frontend and backend teams to deploy independently on different schedules.',
    ],
  },

  // ── 5. STATIC WEB APPS + AZURE FUNCTIONS ─────────────────────────────────

  {
    id: 'swa-functions-statement',
    title: 'Static Web Apps + Azure Functions',
    section: 'Static Web Apps + Azure Functions',
    type: 'statement',
    statement: 'Same frontend. Serverless backend.',
    subtitle: 'Swap the always-running App Service API for on-demand Azure Functions.',
    motifBadge: 'Serverless // Modern Mix',
    logos: [
      { src: '/assets/icons/azure-static-web-apps.svg', alt: 'Azure Static Web Apps' },
      { src: '/assets/icons/azure-functions.svg', alt: 'Azure Functions' },
    ],
    speakerNotes: [
      'Now, we take the same idea of separating frontend and backend, but instead of using Azure App Service for the backend, we use Azure Functions.',
      'Azure Static Web Apps handles global content delivery for modern frontend frameworks.',
      'Meanwhile, serverless backend logic runs via managed Azure Functions — only when needed.',
    ],
  },

  {
    id: 'swa-functions-architecture',
    title: 'Static Web Apps + Azure Functions Architecture',
    section: 'Static Web Apps + Azure Functions',
    type: 'architecture',
    motifBadge: 'Architecture: SWA + Functions',
    summary:
      'Frontend loads from Static Web Apps. When the frontend needs data, it calls an Azure Function — which validates the request, runs business logic, queries the database, and returns the response.',
    diagram: {
      nodes: [
        { id: 'user', label: 'End User', sublabel: 'Browser', type: 'user' },
        { id: 'swa', label: 'Static Web Apps', sublabel: 'React / Vue / Angular', type: 'network' },
        { id: 'fn', label: 'Azure Functions', sublabel: 'Serverless API', type: 'compute' },
        { id: 'db', label: 'Database', sublabel: 'Cosmos DB / Azure SQL', type: 'storage' },
      ],
      edges: [
        { from: 'user', to: 'swa', label: '1. Load frontend' },
        { from: 'user', to: 'fn', label: '2. HTTP request to function' },
        { from: 'fn', to: 'db', label: '3. Query / persist' },
      ],
    },
    highlights: [
      'Frontend communicates with functions that only run when needed',
      'Function: validate → business logic → query DB → return response',
      'Zero idle backend cost — scales automatically with traffic',
      'Fully serverless stack from edge CDN to compute',
    ],
    speakerNotes: [
      'Kung kanina, our frontend was communicating with an API hosted on App Service.',
      'Dito naman, our frontend communicates with functions that only run when they are needed.',
      'Our frontend sends an HTTP request to an Azure Function. That function validates the request, performs business logic, queries a database, and returns the response back to the frontend.',
    ],
  },

  {
    id: 'swa-backend-comparison',
    title: 'App Service vs Azure Functions as Backend',
    section: 'Static Web Apps + Azure Functions',
    type: 'comparison',
    motifBadge: 'Backend Model Comparison',
    left: {
      title: 'SWA + App Service',
      subtitle: 'Continuously Running API',
      tag: 'ALWAYS ON',
      points: [
        'Backend server runs 24/7',
        'Predictable billing based on plan tier',
        'Best for steady traffic & long-running processes',
        'Traditional REST API model',
      ],
    },
    right: {
      title: 'SWA + Azure Functions',
      subtitle: 'On-Demand Serverless API',
      tag: 'EVENT-DRIVEN',
      isPrimary: true,
      points: [
        'Backend runs only when triggered by a request',
        'Scales from 0 to thousands automatically',
        'Zero cost when idle',
        'Best for bursty, lightweight, or variable traffic',
      ],
    },
    takeaway:
      'Choose App Service when your API runs continuously; choose Functions when your backend is event-driven or traffic is unpredictable.',
    speakerNotes: [
      'The fundamental difference: App Service is always running. Functions execute only on demand.',
      'Static Web Apps even has built-in support to link Azure Functions directly as integrated backend APIs.',
    ],
  },
];
