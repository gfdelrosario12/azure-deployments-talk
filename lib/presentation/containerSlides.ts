import { SlideData } from './types';

export const containerSlides: SlideData[] = [
  // SECTION HEADER: Containers on Azure
  {
    id: 'containers-section-header',
    title: 'Containers on Azure',
    section: 'Containers on Azure',
    type: 'section-header',
    sectionNumber: '05',
    description: 'Azure Container Apps, App Service for Containers, ACR, and managed container deployment.',
    motifBadge: 'Docker & Container Platforms',
    speakerNotes: [
      'Now let us enter the container landscape in Azure.',
      'We will look at how Azure handles Docker containers without requiring you to jump straight into complex cluster infrastructure.',
    ],
  },

  // PART 1: AZURE CONTAINER APPS
  {
    id: 'container-apps-statement',
    title: 'Enter Azure Container Apps',
    section: 'Azure Container Apps',
    type: 'statement',
    statement: 'What if you are heavily invested in Docker, but Kubernetes feels like bringing a rocket launcher to a knife fight? Enter Azure Container Apps.',
    subtitle: 'Managed serverless container platform powered by Kubernetes, without cluster management overhead.',
    motifBadge: 'Microservices & Serverless Containers',
    speakerNotes: [
      'What if you are heavily invested in Docker, but Kubernetes feels like bringing a rocket launcher to a knife fight? Enter Azure Container Apps.',
      'Many teams have microservices packaged into Docker containers, but managing nodes, ingress controllers, Helm charts, and control planes in Kubernetes is overkill for their operational team size.',
    ],
  },
  {
    id: 'container-apps-concept',
    title: 'Managed Serverless Containers',
    section: 'Azure Container Apps',
    type: 'text-visual',
    motifBadge: 'Platform Capabilities',
    contentBlocks: [
      {
        heading: 'The Sweet Spot of Container Platforms',
        body: [
          'Azure Container Apps (ACA) provides an abstraction over Kubernetes (built on K8s, KEDA, and Envoy) that eliminates cluster administration.',
          'You deploy standard OCI / Docker images, and Azure automatically manages ingress, TLS certificates, service discovery, autoscaling (including scale-to-zero), and revision management.',
        ],
        highlight: 'Kubernetes power underneath, PaaS simplicity on top.',
      },
      {
        heading: 'Multi-Container Microservice Environment',
        body: [
          'Run coordinated microservices inside a shared Container Apps Environment with built-in private Dapr integration and zero-downtime blue/green traffic splitting.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'PLATFORM CONCERNS MANAGED',
        tag: 'BUILT-IN',
        items: [
          'Managed HTTP Ingress & TLS',
          'Automatic Scaling (KEDA / Scale-to-0)',
          'Revision Tracking & Traffic Splitting',
          'Internal Service Discovery',
          'Integrated Log Streaming & Metrics',
        ],
      },
      {
        title: 'MULTI-TIER CONTAINER ARCHITECTURE',
        tag: 'EXAMPLE COMPOSITION',
        items: [
          'Nginx + React Frontend Container',
          'Spring Boot REST API Container',
          'Python Background Worker Container',
          'Direct ACR Image Pull Integration',
        ],
      },
    ],
    speakerNotes: [
      'Azure Container Apps manages all the complex platform concerns: ingress routing, TLS certificates, application lifecycle, autoscaling based on HTTP load or queue depth with KEDA, and blue-green traffic splitting.',
      'You get the microservice agility of containers without ever managing a Kubernetes cluster.',
    ],
  },
  {
    id: 'container-apps-architecture',
    title: 'Container Apps Architecture Flow',
    section: 'Azure Container Apps',
    type: 'architecture',
    motifBadge: 'Architecture: ACA Environment',
    summary:
      'Users access the managed Ingress endpoint, which routes requests to frontend, API, and asynchronous background worker containers running inside a secure ACA Environment.',
    diagram: {
      nodes: [
        { id: 'users', label: 'End Users', sublabel: 'HTTPS Traffic', type: 'user' },
        { id: 'aca', label: 'Container Apps Env', sublabel: 'Managed Ingress & Scaling', type: 'network' },
        { id: 'fe', label: 'Frontend Container', sublabel: 'Nginx + React', type: 'compute' },
        { id: 'api', label: 'API Container', sublabel: 'Spring Boot REST', type: 'compute' },
        { id: 'worker', label: 'Worker Container', sublabel: 'Python Background', type: 'compute' },
      ],
      edges: [
        { from: 'users', to: 'aca', label: 'HTTPS Request' },
        { from: 'aca', to: 'fe', label: 'routes UI traffic' },
        { from: 'aca', to: 'api', label: 'routes API calls' },
        { from: 'api', to: 'worker', label: 'dispatches tasks' },
      ],
    },
    highlights: [
      'Independent autoscaling per container (including scale-to-zero for workers)',
      'Built-in ingress handles SSL termination and routing',
      'Unified environment sharing private networking and service discovery',
    ],
    speakerNotes: [
      'Here is our visual architecture: Users access the Container Apps environment through managed ingress.',
      'Inside the environment, we have our Nginx + React frontend container, our Spring Boot API container, and our Python background worker container.',
      'Each container scales independently based on workload demand.',
    ],
  },

  // PART 2: APP SERVICE FOR CONTAINERS & ACR
  {
    id: 'dockerfile-concept',
    title: 'The Dockerfile: Packaging the Runtime',
    section: 'App Service for Containers',
    type: 'text-visual',
    motifBadge: 'Dockerfile & Artifacts',
    contentBlocks: [
      {
        heading: 'What Does a Dockerfile Define?',
        body: [
          'A Dockerfile encapsulates the exact base OS image, runtime version, system dependencies, compiled application code, and startup execution environment.',
          'It guarantees deterministic behavior: if it runs on your development laptop, it runs identically on Azure.',
        ],
        highlight: 'Eliminates "it works on my machine" issues by packaging code + runtime together.',
      },
    ],
    visualCards: [
      {
        title: 'DOCKERFILE COMPONENTS',
        tag: 'IMAGE LAYERS',
        items: [
          'Base Image (e.g., node:20-alpine, openjdk:21)',
          'System Libraries & Native Binaries',
          'Application Source / Compiled Artifacts',
          'Environment Variables & Port Exposure',
          'Entrypoint / CMD Execution Command',
        ],
      },
      {
        title: 'AZURE CONTAINER REGISTRY (ACR)',
        tag: 'PRIVATE REPOSITORY',
        items: [
          'Secure private OCI artifact storage',
          'Geo-replication across Azure regions',
          'Managed Identity (passwordless) authentication',
          'Integrated vulnerability scanning',
        ],
      },
    ],
    speakerNotes: [
      'To deploy custom containers, we start with the Dockerfile.',
      'The Dockerfile defines the base runtime, dependencies, application packaging, and startup commands.',
      'We then build that image and push it to Azure Container Registry (ACR), our private, secure container repository in Azure.',
    ],
  },
  {
    id: 'container-pipeline-diagram',
    title: 'Docker Deployment Pipeline',
    section: 'App Service for Containers',
    type: 'architecture',
    motifBadge: 'CI/CD Pipeline',
    summary:
      'Continuous deployment pipeline from source code push in GitHub to automated build, storage in Azure Container Registry (ACR), and zero-downtime deployment to App Service for Containers.',
    diagram: {
      nodes: [
        { id: 'github', label: 'GitHub', sublabel: 'Source Code', type: 'source' },
        { id: 'actions', label: 'GitHub Actions', sublabel: 'CI/CD Runner', type: 'compute' },
        { id: 'docker', label: 'Docker Build', sublabel: 'Image Creation', type: 'badge' },
        { id: 'acr', label: 'Azure Container Registry', sublabel: 'Private Image Hub', type: 'storage' },
        { id: 'appservice', label: 'App Service Containers', sublabel: 'Managed Web Host', type: 'compute' },
        { id: 'users', label: 'End Users', sublabel: 'Live Traffic', type: 'user' },
      ],
      edges: [
        { from: 'github', to: 'actions', label: '1. git push' },
        { from: 'actions', to: 'docker', label: '2. docker build' },
        { from: 'docker', to: 'acr', label: '3. docker push' },
        { from: 'acr', to: 'appservice', label: '4. pull image & deploy' },
        { from: 'appservice', to: 'users', label: '5. serve traffic' },
      ],
    },
    highlights: [
      'Automated container build on every commit',
      'Images secured in private Azure Container Registry with Managed Identities',
      'App Service automatically restarts container on new image release with zero downtime',
    ],
    speakerNotes: [
      'Here is the complete deployment pipeline.',
      'When code is pushed to GitHub, GitHub Actions runs `docker build`, pushes the image tag to Azure Container Registry (ACR), and Azure App Service for Containers pulls the latest image and restarts the container smoothly.',
    ],
  },
  {
    id: 'app-service-containers-statement',
    title: 'The Practical Value of App Service for Containers',
    section: 'App Service for Containers',
    type: 'statement',
    statement: "I want to use Docker, but I don't want to deal with Kubernetes.",
    subtitle: 'Standard web application PaaS benefits paired with custom container runtime flexibility.',
    motifBadge: 'Practical Cloud Strategy',
    speakerNotes: [
      "I want to use Docker, but I don't want to deal with Kubernetes.",
      'This is one of the most practical sweet spots in cloud development: you get the packaging freedom of Docker without taking on Kubernetes operational complexity.',
    ],
  },
  {
    id: 'code-vs-container-appservice-comparison',
    title: 'Managed Runtime vs Custom Container App Service',
    section: 'App Service for Containers',
    type: 'comparison',
    motifBadge: 'App Service Deployment Choices',
    left: {
      title: 'App Service (Code / Managed)',
      subtitle: 'Azure-Managed Runtimes',
      points: [
        'Azure maintains Node.js, .NET, Python, Java versions',
        'Direct deployment from git, ZIP, or GitHub Actions',
        'Automatic security patching of underlying runtime stack',
        'Restricted to officially supported versions and libraries',
      ],
      tag: 'STANDARD PAAS',
    },
    right: {
      title: 'App Service for Containers',
      subtitle: 'Custom Docker Image',
      points: [
        'Bring any runtime, OS packages, fonts, or native C/C++ libraries',
        'Team manages Dockerfile and image patching',
        'Identical environment between local docker-compose and cloud',
        'Same PaaS benefits: custom domains, autoscaling, deployment slots',
      ],
      tag: 'CONTAINER PAAS',
      isPrimary: true,
    },
    takeaway:
      'Use Managed App Service for rapid development with standard stacks; use App Service for Containers when your application requires custom dependencies or pre-built Docker images.',
    speakerNotes: [
      'Let us compare standard App Service with App Service for Containers.',
      'In standard App Service, Azure manages the runtime versions and patches. In App Service for Containers, you bring your own custom Dockerfile—enabling custom OS packages, specific runtime versions, or proprietary libraries—while still retaining all PaaS features like deployment slots and autoscaling.',
    ],
  },
];
