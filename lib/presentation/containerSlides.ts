import { SlideData } from './types';

export const containerSlides: SlideData[] = [
  // ── 6. AZURE CONTAINER APPS ───────────────────────────────────────────────

  {
    id: 'container-apps-statement',
    title: 'Azure Container Apps',
    section: 'Azure Container Apps',
    type: 'statement',
    statement: 'Heavily invested in Docker, but Kubernetes feels like a rocket launcher to a knife fight?',
    subtitle: 'The modern container sweet spot — managed microservices without cluster complexity.',
    motifBadge: 'Containers // Middle Ground',
    logos: [{ src: '/assets/icons/azure-container-apps.svg', alt: 'Azure Container Apps' }],
    speakerNotes: [
      'Now, what if you are heavily invested in Docker, but Kubernetes feels like bringing a rocket launcher to a knife fight? Enter Azure Container Apps.',
      'This is one of the more modern approaches in Azure.',
      "It's a middle ground between App Service and AKS.",
    ],
  },

  {
    id: 'container-apps-architecture',
    title: 'Azure Container Apps Architecture',
    section: 'Azure Container Apps',
    type: 'architecture',
    motifBadge: 'Architecture: Container Apps',
    summary:
      'Containerize your components — Nginx + React frontend, Spring Boot backend, Python background worker. Container Apps manages ingress, scaling, traffic splitting, and lifecycles without a Kubernetes cluster.',
    diagram: {
      nodes: [
        { id: 'users', label: 'End Users', sublabel: 'HTTPS Traffic', type: 'user' },
        { id: 'aca', label: 'Container Apps Env', sublabel: 'Managed Ingress & Scaling', type: 'network' },
        { id: 'fe', label: 'Frontend Container', sublabel: 'Nginx + React', type: 'compute' },
        { id: 'api', label: 'API Container', sublabel: 'Spring Boot REST', type: 'compute' },
        { id: 'worker', label: 'Worker Container', sublabel: 'Python Background', type: 'compute' },
      ],
      edges: [
        { from: 'users', to: 'aca', label: 'HTTPS request' },
        { from: 'aca', to: 'fe', label: 'routes UI traffic' },
        { from: 'aca', to: 'api', label: 'routes API calls' },
        { from: 'api', to: 'worker', label: 'dispatches tasks' },
      ],
    },
    highlights: [
      'Middle ground between App Service and AKS',
      'Manages ingress, auto-scaling, traffic splitting, and lifecycles',
      'No Kubernetes cluster to configure or maintain',
      'Each container scales independently — including scale-to-zero',
    ],
    speakerNotes: [
      'You containerize your components: an Nginx + React frontend container, a Spring Boot backend container, and a Python background worker container.',
      'Container Apps manages the heavy lifting: ingress traffic, automatic scaling, traffic splitting, and application lifecycles.',
      'Without requiring you to manually configure or manage a complex Kubernetes cluster.',
    ],
  },

  // ── 7. AZURE APP SERVICE FOR CONTAINERS ──────────────────────────────────

  {
    id: 'app-service-containers-statement',
    title: 'Azure App Service for Containers',
    section: 'App Service for Containers',
    type: 'statement',
    statement: "I want to use Docker, but I don't want to deal with Kubernetes.",
    subtitle: 'Define your runtime in a Dockerfile. Let Azure handle the rest.',
    motifBadge: 'Docker // Without Kubernetes',
    logos: [
      { src: '/assets/icons/azure-container-registry.svg', alt: 'Azure Container Registry' },
      { src: '/assets/icons/azure-app-service.svg', alt: 'Azure App Service' },
    ],
    speakerNotes: [
      'Now, kanina namention ko ang Docker.',
      'Bare basics ng Docker: gagawa ka ng Dockerfile. Diyan pwede mo i-define kung anong runtime, dependencies, and configurations ang kailangan ng application.',
      'Para hindi na kailangan gawin ng ibang developers na pagpapasahan mo nito.',
      'Which is also helpful for deployment — App Service for Containers does not need to figure out how to set up the application environment.',
    ],
  },

  {
    id: 'app-service-containers-pipeline',
    title: 'App Service for Containers: CI/CD Pipeline',
    section: 'App Service for Containers',
    type: 'architecture',
    motifBadge: 'Pipeline: GitHub → ACR → App Service',
    summary:
      'Code is pushed to GitHub, built via GitHub Actions into a Docker image, stored in Azure Container Registry (ACR), then deployed directly to App Service for Containers.',
    diagram: {
      nodes: [
        { id: 'github', label: 'GitHub', sublabel: 'Source Code', type: 'source' },
        { id: 'actions', label: 'GitHub Actions', sublabel: 'CI/CD Runner', type: 'compute' },
        { id: 'acr', label: 'Azure Container Registry', sublabel: 'Private Image Store (ACR)', type: 'storage' },
        { id: 'appservice', label: 'App Service', sublabel: 'for Containers', type: 'compute' },
        { id: 'users', label: 'End Users', sublabel: 'Live Traffic', type: 'user' },
      ],
      edges: [
        { from: 'github', to: 'actions', label: '1. git push' },
        { from: 'actions', to: 'acr', label: '2. docker build & push' },
        { from: 'acr', to: 'appservice', label: '3. pull image & deploy' },
        { from: 'appservice', to: 'users', label: '4. serve traffic' },
      ],
    },
    highlights: [
      'Dockerfile defines runtime, dependencies, and startup — no ambiguity',
      'ACR: private, secure Docker image storage in Azure',
      'GitHub Actions builds and pushes the image on every commit',
      'App Service pulls the latest image and restarts automatically',
    ],
    speakerNotes: [
      'Your pipeline looks like this:',
      'Meron tayong tinatawag na Azure Container Registry, or ACR. This is where we store our Docker images.',
      'Code is pushed to GitHub, built via GitHub Actions into a Docker image, stored in ACR, and then deployed directly to App Service.',
      "You get to say: I want to use Docker, but I don't want to deal with Kubernetes.",
    ],
  },
];
