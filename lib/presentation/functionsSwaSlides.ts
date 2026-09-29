import { SlideData } from './types';

export const functionsSwaSlides: SlideData[] = [
  // SECTION HEADER: Functions & Static Web Apps
  {
    id: 'functions-swa-section-header',
    title: 'Azure Functions & Static Web Apps',
    section: 'Serverless & Modern Web',
    type: 'section-header',
    sectionNumber: '04',
    description: 'Event-driven compute, decoupled frontends, and serverless hosting architectures.',
    motifBadge: 'Serverless & Static Web',
    speakerNotes: [
      'Now, we go one step further into serverless architecture with Azure Functions and Static Web Apps.',
      'In this section, we transition away from continuously running server instances to event-driven compute and decoupled frontend architectures.',
    ],
  },

  // PART 1: AZURE FUNCTIONS
  {
    id: 'functions-statement-intro',
    title: 'Azure Functions: Going One Step Further',
    section: 'Azure Functions (Serverless)',
    type: 'statement',
    statement: 'Now, we go one step further with Azure Functions.',
    subtitle: 'From continuously running compute to on-demand, event-driven execution.',
    motifBadge: 'Event-Driven Compute',
    speakerNotes: [
      'Now, we go one step further with Azure Functions.',
      'Up until now, whether using a VM or App Service, we assumed a server is constantly running and waiting for traffic.',
      'Azure Functions turns this on its head: your code only runs when something triggers it.',
    ],
  },
  {
    id: 'functions-event-driven-model',
    title: 'The Event-Driven Model',
    section: 'Azure Functions (Serverless)',
    type: 'text-visual',
    motifBadge: 'Trigger → Compute → Output',
    contentBlocks: [
      {
        heading: 'Traditional vs Event-Driven Compute',
        body: [
          'Traditional applications run 24/7, continuously listening on a port and consuming compute resources even when idle.',
          'Azure Functions executes code in response to specific system events, scaling instantly to zero when idle and rapidly expanding during peak load.',
        ],
        highlight: 'Pay and compute only for the milliseconds your function is actively executing.',
      },
      {
        heading: 'Diverse Trigger Ecosystem',
        body: [
          'Built-in bindings handle HTTP requests, message queues, blob uploads, database changes, timers, and webhooks without boilerplate connection logic.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'SUPPORTED TRIGGERS',
        tag: 'BINDINGS',
        items: [
          'HTTP Request (REST / Webhook)',
          'Timer / Scheduled Cron',
          'Azure Queue / Service Bus',
          'Blob Storage Upload',
          'Cosmos DB Change Feed',
          'Event Grid & Event Hubs',
        ],
      },
      {
        title: 'EXECUTION CONTRAST',
        tag: 'PARADIGM',
        items: [
          'App Service: Always-running server',
          'Functions: Event → Execute → Sleep',
          'Scaling: 0 to thousands of instances',
          'Billing: Sub-second execution time',
        ],
      },
    ],
    speakerNotes: [
      'Let us contrast the traditional model with the event-driven model.',
      'In a traditional application, you have an always-running backend server. It sits there, listening for requests, consuming CPU and memory whether you have 10,000 visitors or zero.',
      'With Azure Functions, your code wakes up on an event: an HTTP request, a message in a queue, a file uploaded to Blob storage, or a scheduled timer. It executes, produces a response or action, and shuts down. Depending on your hosting plan, it scales automatically from zero to thousands of concurrent executions.',
    ],
  },
  {
    id: 'functions-execution-flow-diagram',
    title: 'Event-Driven Execution Flow',
    section: 'Azure Functions (Serverless)',
    type: 'architecture',
    motifBadge: 'Architecture: Event-Driven',
    summary:
      'Contrasting the always-running backend server against the on-demand event-triggered execution model of Azure Functions using a lightweight calculation API.',
    diagram: {
      nodes: [
        { id: 'client', label: 'User / Event', sublabel: 'HTTP / Queue / File', type: 'user' },
        { id: 'trigger', label: 'Azure Trigger', sublabel: 'Event Router', type: 'network' },
        { id: 'fn', label: 'Azure Function', sublabel: 'On-Demand Compute', type: 'compute' },
        { id: 'db', label: 'Database / Queue', sublabel: 'Output Binding', type: 'storage' },
      ],
      edges: [
        { from: 'client', to: 'trigger', label: 'triggers event' },
        { from: 'trigger', to: 'fn', label: 'invokes execution' },
        { from: 'fn', to: 'db', label: 'persists / outputs' },
      ],
    },
    highlights: [
      'Traditional App: User → Always-Running Backend Instance',
      'Azure Functions: Event → Function Execution → Response / Action',
      'Ideal for lightweight API calculations, asynchronous background workers, and webhook handlers',
    ],
    speakerNotes: [
      'Here is the architectural comparison.',
      'Instead of maintaining a continuous web server process for a small API calculation—like calculating a discount or generating an invoice PDF—Azure Functions receives the HTTP request, executes the calculation function within milliseconds, returns the response, and releases the compute resources.',
    ],
  },

  // PART 2: STATIC WEB APPS + APP SERVICE
  {
    id: 'swa-app-service-concept',
    title: 'Decoupling Frontend & Backend',
    section: 'Static Web Apps + App Service',
    type: 'text-visual',
    motifBadge: 'Architecture: Decoupled',
    contentBlocks: [
      {
        heading: 'Why Separate the UI from the API?',
        body: [
          'Modern web applications decouple single-page applications (React, Vue, Angular, Svelte) from backend APIs (.NET, Node.js, Python, Java).',
          'Static assets are served globally via edge CDNs, while compute-heavy business logic runs in specialized application hosting environments.',
        ],
        highlight: 'Independent CI/CD pipelines, independent scaling, and zero compute load on the backend for static files.',
      },
    ],
    visualCards: [
      {
        title: 'FRONTEND: STATIC WEB APPS',
        tag: 'GLOBAL EDGE',
        items: [
          'React / Next.js / Vue / Angular',
          'Global CDN distribution',
          'Free SSL & custom domains',
          'GitHub Actions CI/CD integrated',
          'Staging preview environments',
        ],
      },
      {
        title: 'BACKEND: APP SERVICE',
        tag: 'DEDICATED API',
        items: [
          'Node.js / Express / NestJS',
          '.NET Core Web API',
          'Python FastAPI / Django',
          'Java Spring Boot',
          'VNet integration & enterprise auth',
        ],
      },
    ],
    speakerNotes: [
      'Next, let us look at the modern architecture of separating frontend and backend hosting.',
      'Instead of bundling our React or Angular single-page application inside our Spring Boot or Express server, we host our frontend on Azure Static Web Apps and our backend on Azure App Service.',
      'This allows both the frontend and backend teams to deploy independently without risking downtime on the other tier.',
    ],
  },
  {
    id: 'swa-app-service-architecture',
    title: 'Static Web Apps + App Service Architecture',
    section: 'Static Web Apps + App Service',
    type: 'architecture',
    motifBadge: 'Architecture: SWA + App Service',
    summary:
      'User requests static frontend assets from global edge nodes (SWA), and the browser communicates directly with the App Service backend API for dynamic data.',
    diagram: {
      nodes: [
        { id: 'user', label: 'End User', sublabel: 'Browser Client', type: 'user' },
        { id: 'swa', label: 'Static Web Apps', sublabel: 'React / Angular CDN', type: 'network' },
        { id: 'appservice', label: 'App Service', sublabel: '.NET / Node / Python API', type: 'compute' },
        { id: 'db', label: 'Azure SQL / Cosmos', sublabel: 'Managed Database', type: 'storage' },
      ],
      edges: [
        { from: 'user', to: 'swa', label: '1. Load HTML/JS/CSS' },
        { from: 'user', to: 'appservice', label: '2. REST / GraphQL API Calls' },
        { from: 'appservice', to: 'db', label: '3. Query / Persist' },
      ],
    },
    highlights: [
      'Frontend and backend deploy via independent CI/CD pipelines',
      'Static assets served with sub-millisecond edge latency',
      'App Service backend dedicated purely to business logic and data processing',
    ],
    speakerNotes: [
      'Let us trace the request path in this architecture.',
      'The user browser first loads static HTML, JavaScript, and CSS from Azure Static Web Apps, served from edge nodes worldwide.',
      'Once the single-page application is running in the client browser, it makes REST or GraphQL API calls directly to the Azure App Service backend, which handles authentication, business logic, and database operations.',
    ],
  },

  // PART 3: STATIC WEB APPS + AZURE FUNCTIONS
  {
    id: 'swa-functions-statement',
    title: 'Same Frontend. Different Backend Model.',
    section: 'Static Web Apps + Azure Functions',
    type: 'statement',
    statement: 'Same frontend. Different backend model.',
    subtitle: 'Swapping a continuously running App Service backend for on-demand serverless functions.',
    motifBadge: 'SWA + Serverless',
    speakerNotes: [
      'Same frontend. Different backend model.',
      'We keep the exact same Static Web Apps frontend, but now we replace the continuously running App Service backend with Azure Functions.',
    ],
  },
  {
    id: 'swa-functions-comparison',
    title: 'App Service vs Azure Functions Backend',
    section: 'Static Web Apps + Azure Functions',
    type: 'comparison',
    motifBadge: 'Backend Comparison',
    left: {
      title: 'SWA + App Service',
      subtitle: 'Continuously Running API',
      points: [
        'Backend server runs 24/7 on dedicated App Service Plan',
        'Predictable monthly billing based on VM tier',
        'Best for long-running processes, WebSockets, & steady traffic',
        'Requires capacity planning and autoscaling rules',
      ],
      tag: 'CONVENTIONAL PAAS',
    },
    right: {
      title: 'SWA + Azure Functions',
      subtitle: 'Event-Driven Serverless API',
      points: [
        'Backend code runs purely on-demand per API request',
        'Scales automatically from 0 to thousands of executions',
        'Zero cost when no requests are being processed',
        'Directly integrated managed backend option in Static Web Apps',
      ],
      tag: 'SERVERLESS PAAS',
      isPrimary: true,
    },
    takeaway:
      'Choose App Service when you need continuous runtime or persistent connections; choose Azure Functions when your API workload is bursty, lightweight, or event-driven.',
    speakerNotes: [
      'Here is the fundamental difference: With App Service, you have a conventional continuously running web and API application server. With Azure Functions, you have an event-driven serverless backend that executes only when an API call arrives.',
      'Static Web Apps even has built-in support to link Azure Functions directly as integrated backend APIs with unified authentication and routing.',
    ],
  },
  {
    id: 'swa-functions-architecture',
    title: 'Static Web Apps + Azure Functions Architecture',
    section: 'Static Web Apps + Azure Functions',
    type: 'architecture',
    motifBadge: 'Architecture: SWA + Functions',
    summary:
      'Full serverless web architecture combining global edge static delivery with on-demand function execution and managed serverless database persistence.',
    diagram: {
      nodes: [
        { id: 'user', label: 'End User', sublabel: 'Browser Client', type: 'user' },
        { id: 'swa', label: 'Static Web Apps', sublabel: 'React / Vue / Angular', type: 'network' },
        { id: 'fn', label: 'Azure Functions', sublabel: 'Serverless API Endpoints', type: 'compute' },
        { id: 'db', label: 'Cosmos DB / Azure SQL', sublabel: 'Managed Data Store', type: 'storage' },
      ],
      edges: [
        { from: 'user', to: 'swa', label: '1. Fetch UI Assets' },
        { from: 'user', to: 'fn', label: '2. Invoke Serverless API' },
        { from: 'fn', to: 'db', label: '3. Read / Write Data' },
      ],
    },
    highlights: [
      'Completely serverless architecture from frontend edge to backend compute',
      'Zero idle compute cost across the entire application stack',
      'Automatic scaling handles traffic spikes without manual provisioning',
    ],
    speakerNotes: [
      'This architecture diagram illustrates the fully serverless stack.',
      'The user browser fetches UI bundles from Static Web Apps, and every API action triggers an Azure Function that queries the database and immediately terminates after responding.',
      'This delivers exceptional cost efficiency and effortless scalability for applications with variable or spiky traffic patterns.',
    ],
  },
];
