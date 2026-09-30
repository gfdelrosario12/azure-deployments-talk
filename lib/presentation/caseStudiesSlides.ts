import { SlideData } from './types';

export const caseStudiesSlides: SlideData[] = [
  {
    id: 'case-study-1',
    title: 'Case Study 1 — Simple Web Application',
    section: 'Interactive Case Studies',
    type: 'question-reveal',
    motifBadge: 'Case Study 01',
    question: 'A student built a React frontend and Java Spring Boot REST API for their thesis. Small user base, needs 24/7 availability. The student does NOT want to manage Linux servers, Nginx, or OS patches. Which Azure deployment is most appropriate?',
    options: [
      { id: 'a', label: 'A. Azure Virtual Machine' },
      { id: 'b', label: 'B. Azure App Service' },
      { id: 'c', label: 'C. Azure Kubernetes Service' },
      { id: 'd', label: 'D. Azure Functions' },
    ],
    revealedAnswer: 'Answer: B — Azure App Service',
    explanation:
      'The application is a conventional web app and REST API. The student wants Azure to manage the underlying infrastructure — no SSH, no Nginx config, no OS patching. App Service is the simplest full-stack PaaS option.',
    speakerNotes: [
      'This is the classic thesis deployment scenario.',
      'The student has a React frontend and a Java Spring Boot API.',
      'They do not want to manage servers — so VM is out.',
      'The backend runs continuously, so Functions is not the right fit.',
      'AKS is overkill for a small application.',
      'App Service is the answer: connect GitHub, Azure builds and deploys, done.',
    ],
  },

  {
    id: 'case-study-2',
    title: 'Case Study 2 — Full OS Control',
    section: 'Interactive Case Studies',
    type: 'question-reveal',
    motifBadge: 'Case Study 02',
    question: 'A company needs to deploy a custom application requiring a specific Linux distribution, custom system-level packages, custom networking, full SSH access, and a manually configured Nginx reverse proxy. The team is comfortable managing Linux servers. Which deployment fits?',
    options: [
      { id: 'a', label: 'A. Azure Static Web Apps' },
      { id: 'b', label: 'B. Azure Functions' },
      { id: 'c', label: 'C. Azure Virtual Machine' },
      { id: 'd', label: 'D. Azure Container Apps' },
    ],
    revealedAnswer: 'Answer: C — Azure Virtual Machine',
    explanation:
      'The team needs OS-level control and customization — specific Linux distro, custom packages, SSH access, and manual Nginx configuration. Only a VM provides this level of control. Azure manages the hardware; the team manages everything inside.',
    speakerNotes: [
      'This is the opposite of Case Study 1.',
      'The team explicitly needs OS-level control: specific Linux distro, custom packages, SSH, manual Nginx.',
      'No managed PaaS can satisfy these requirements.',
      'Azure Virtual Machine is the only option that gives full control from the OS up.',
    ],
  },

  {
    id: 'case-study-3',
    title: 'Case Study 3 — Event-Driven API',
    section: 'Interactive Case Studies',
    type: 'question-reveal',
    motifBadge: 'Case Study 03',
    question: 'A university has an API endpoint that performs a calculation on each HTTP request. It may receive 10 requests today and 100,000 requests tomorrow. The developers do not want to maintain a continuously running backend server. Which Azure service is the best fit?',
    options: [
      { id: 'a', label: 'A. Azure Virtual Machine' },
      { id: 'b', label: 'B. Azure App Service' },
      { id: 'c', label: 'C. Azure Functions' },
      { id: 'd', label: 'D. Azure Kubernetes Service' },
    ],
    revealedAnswer: 'Answer: C — Azure Functions',
    explanation:
      'The workload is event-driven and highly variable. Azure Functions executes only when triggered by an HTTP request, scales automatically from 10 to 100,000 requests, and the team pays only for actual executions — no idle server costs.',
    speakerNotes: [
      'Key signals: event-driven, unpredictable traffic, no desire to maintain a running server.',
      'A VM or App Service would sit idle most of the time, wasting resources.',
      'Azure Functions is triggered per request, scales automatically, and costs nothing when idle.',
      'This is the textbook serverless use case.',
    ],
  },

  {
    id: 'case-study-4',
    title: 'Case Study 4 — Static Frontend + Serverless Backend',
    section: 'Interactive Case Studies',
    type: 'question-reveal',
    motifBadge: 'Case Study 04',
    question: 'A team has a React frontend, small HTTP-based backend operations, no requirement for a continuously running backend, variable traffic, and a preference for serverless architecture. Which architecture should they use?',
    options: [
      { id: 'a', label: 'A. VM + Nginx' },
      { id: 'b', label: 'B. Static Web Apps + Azure Functions' },
      { id: 'c', label: 'C. App Service + VM' },
      { id: 'd', label: 'D. AKS + multiple containers' },
    ],
    revealedAnswer: 'Answer: B — Static Web Apps + Azure Functions',
    explanation:
      'Static Web Apps handles global delivery of the React frontend. Azure Functions handles the event-driven backend logic — only running when called. No continuously running server, scales with traffic, and the team stays fully serverless.',
    speakerNotes: [
      'The team explicitly wants serverless and has no need for a continuously running backend.',
      'Static Web Apps is purpose-built for React, Vue, Angular — global CDN delivery out of the box.',
      'Functions handles the backend HTTP operations on demand.',
      'This is the modern serverless full-stack pattern.',
    ],
  },

  {
    id: 'case-study-5',
    title: 'Case Study 5 — Independent Frontend and Backend Teams',
    section: 'Interactive Case Studies',
    type: 'question-reveal',
    motifBadge: 'Case Study 05',
    question: 'A company has a Vue frontend and a Java Spring Boot REST API. The frontend and backend teams release on different schedules and need to deploy independently. The backend is a conventional API that runs continuously. Which architecture fits?',
    options: [
      { id: 'a', label: 'A. Static Web Apps + App Service' },
      { id: 'b', label: 'B. Static Web Apps + Functions' },
      { id: 'c', label: 'C. Azure Functions only' },
      { id: 'd', label: 'D. Azure VM only' },
    ],
    revealedAnswer: 'Answer: A — Static Web Apps + App Service',
    explanation:
      'The frontend deploys independently to Static Web Apps. The continuously running Java REST API deploys to App Service. Both teams release on their own schedules without coupling. Functions would not suit a continuously running traditional API.',
    speakerNotes: [
      'The key constraint here is independent deployment schedules.',
      'Static Web Apps for the Vue frontend — the frontend team deploys whenever they want.',
      'App Service for the Java API — the backend team deploys on their own schedule.',
      'The backend runs continuously, so Functions is not the right fit here.',
    ],
  },

  {
    id: 'case-study-10',
    title: 'Case Study 6 — The Dockerized Thesis',
    section: 'Interactive Case Studies',
    type: 'question-reveal',
    motifBadge: 'Case Study 06',
    question: 'Same thesis application — but the Spring Boot backend has a custom Dockerfile, custom Java runtime configuration, and container-specific dependencies. The team wants to keep it containerized but does NOT need Kubernetes. Which deployment should they use?',
    options: [
      { id: 'a', label: 'A. Azure App Service for Containers' },
      { id: 'b', label: 'B. Azure Kubernetes Service' },
      { id: 'c', label: 'C. Azure Functions' },
      { id: 'd', label: 'D. Static Web Apps only' },
    ],
    revealedAnswer: 'Answer: A — Azure App Service for Containers',
    explanation:
      'The team has a custom Dockerfile and wants Docker without Kubernetes complexity. App Service for Containers pulls the image from ACR and runs it — no cluster to manage, no Kubernetes manifests. Full Docker control, managed PaaS simplicity.',
    speakerNotes: [
      'This is the thesis scenario revisited — but now with Docker.',
      'The team has a custom Dockerfile and container-specific dependencies.',
      'They want Docker but explicitly do not need Kubernetes.',
      'App Service for Containers is the answer: bring your own image, Azure handles the rest.',
      'AKS would be massive overkill for a thesis application.',
    ],
  },
];
