import { SlideData } from './types';

export const aksSpectrumSlides: SlideData[] = [
  // SECTION HEADER: Azure Kubernetes Service (AKS)
  {
    id: 'aks-section-header',
    title: 'Azure Kubernetes Service (AKS)',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'section-header',
    sectionNumber: '06',
    description: 'Enterprise container orchestration, cluster primitives, and platform-scale operations.',
    motifBadge: 'Kubernetes & Platform Ops',
    speakerNotes: [
      "Now, we've reached Azure Kubernetes Service, or AKS.",
      'In this section, we move beyond individual container hosting and step into full-scale distributed container orchestration.',
    ],
  },

  // SLIDE 1: Introduction & Dichotomy
  {
    id: 'aks-intro-concept',
    title: 'Packaging vs Orchestration',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'text-visual',
    motifBadge: 'Containers vs Kubernetes',
    contentBlocks: [
      {
        heading: "Now, we've reached Azure Kubernetes Service, or AKS.",
        body: [
          'Containers (Docker) package applications, runtimes, and dependencies into isolated, reproducible units.',
          'Kubernetes orchestrates, coordinates, and manages collections of containers across a cluster of compute nodes.',
        ],
        highlight: 'Docker solves application packaging; Kubernetes solves distributed container management at scale.',
      },
      {
        heading: 'The AKS Shared Responsibility Model',
        body: [
          'Azure provisions and manages the Kubernetes control plane (API server, etcd, scheduler, controller manager) at zero cluster management fee.',
          'Your team configures worker node pools, manifests, ingress controllers, network policies, and workload deployments.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'AZURE RESPONSIBILITY',
        tag: 'CONTROL PLANE (FREE)',
        items: [
          'API Server & Control Plane HA',
          'etcd Database & Backups',
          'Automated Control Plane Upgrades',
          'Cluster Health Monitoring',
          'Virtual Node Integration',
        ],
      },
      {
        title: 'CUSTOMER RESPONSIBILITY',
        tag: 'WORKLOADS & NODES',
        items: [
          'Worker Node VM Sizing & OS',
          'Kubernetes Manifests / Helm',
          'Ingress & Traffic Routing',
          'Workload Security & RBAC',
          'Namespace & Resource Quotas',
        ],
      },
    ],
    speakerNotes: [
      "Now, we've reached Azure Kubernetes Service, or AKS.",
      'To understand Kubernetes, we have to distinguish between packaging and orchestration. Docker packages your application code and its runtime dependencies into a portable container image. Kubernetes takes hundreds of those containers and manages where they run, how they talk to each other, how they scale, and what happens when they fail.',
      'With AKS, Microsoft provides a fully managed Kubernetes control plane. Azure takes care of the API server, etcd state store, and control plane upgrades, while your team focuses on defining workloads, worker node configurations, and application manifests.',
    ],
  },

  // SLIDE 2: Kubernetes Core Primitives Breakdown
  {
    id: 'aks-primitives-breakdown',
    title: 'Core Kubernetes Primitives',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'text-visual',
    motifBadge: 'K8s Building Blocks',
    contentBlocks: [
      {
        heading: 'Anatomy of a Kubernetes Workload',
        body: [
          'Kubernetes orchestrates applications through declarative API objects defined in YAML manifests or Helm charts.',
          'Instead of running containers directly, Kubernetes manages atomic Pods and controls their lifecycle through higher-level controllers.',
        ],
        highlight: 'Declarative desired-state: You define what the system should look like, and Kubernetes continually reconciles reality.',
      },
    ],
    visualCards: [
      {
        title: 'WORKLOADS & COMPUTE',
        tag: 'CORE EXECUTION',
        items: [
          'Pods: Smallest deployable compute unit',
          'Deployments: Replicas & rolling update controller',
          'Nodes: Virtual Machine worker instances',
          'Namespaces: Multi-tenant virtual clusters',
        ],
      },
      {
        title: 'NETWORKING & CONFIG',
        tag: 'CONNECTIVITY',
        items: [
          'Services: Stable internal L4 load balancers',
          'Ingress: L7 HTTP/HTTPS reverse proxy routing',
          'ConfigMaps: Decoupled plaintext configuration',
          'Secrets: Encrypted credential and token storage',
        ],
      },
    ],
    speakerNotes: [
      'Let us quickly walk through the essential Kubernetes building blocks.',
      'A Pod is the smallest unit of deployment, wrapping one or more tightly-coupled containers sharing IP and storage.',
      'A Deployment manages a declared number of Pod replicas, executing rolling updates without downtime.',
      'Services provide a stable internal IP address and DNS name that load-balances traffic across dynamic Pods.',
      'Ingress manages external HTTP and HTTPS routing into those Services.',
      'ConfigMaps and Secrets decouple runtime configurations, API keys, and environment variables from your container images.',
      'Namespaces isolate teams and environments within the same physical cluster.',
    ],
  },

  // SLIDE 3: Operational Capabilities & Microservices
  {
    id: 'aks-operational-superpowers',
    title: 'Cluster Operational Capabilities',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'text-visual',
    motifBadge: 'Cluster Operations',
    contentBlocks: [
      {
        heading: 'Automated Operations at Scale',
        body: [
          'Scheduling: Intelligent placement of pods based on resource requests, node affinity, and anti-affinity rules.',
          'Self-Healing & Desired-State: Automatically restarts failed containers, reschedules dead nodes, and replaces unresponsive instances.',
          'Horizontal Pod Autoscaling (HPA) & Cluster Autoscaler: Scales pod replicas and worker VM node counts based on metrics.',
          'Zero-Downtime Rolling Deployments: Canary and rolling release strategies ensure continuous availability during upgrades.',
        ],
        highlight: 'Microservices are a common use case for Kubernetes, but microservices do NOT automatically require Kubernetes.',
      },
      {
        heading: 'Microservices vs Orchestration Complexity',
        body: [
          'Do not introduce Kubernetes solely because you have multiple microservices. Evaluate operational readiness, team cognitive load, and whether Azure Container Apps or App Service already fulfills your architectural needs.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'OPERATIONAL POWERS',
        tag: 'AUTOMATION',
        items: [
          'Intelligent Workload Scheduling',
          'Automatic Self-Healing Replicas',
          'Zero-Downtime Rolling Releases',
          'Built-In Service Discovery & DNS',
          'HPA & Cluster VM Autoscaling',
        ],
      },
      {
        title: 'ARCHITECTURE PRINCIPLE',
        tag: 'DECISION GUIDE',
        items: [
          'Microservices ≠ Mandatory Kubernetes',
          'Container Apps handles 80% of microservice setups',
          'Choose AKS when custom networking, CNI, or custom CRDs are required',
          'Account for ongoing cluster maintenance',
        ],
      },
    ],
    speakerNotes: [
      'Why do organizations adopt Kubernetes? Because of its operational superpowers: automated scheduling, self-healing pod reconciliation, zero-downtime rolling deployments, internal DNS service discovery, and dual-layer autoscaling for both pods and cluster VM nodes.',
      'However, here is a critical takeaway: microservices are a very common use case on Kubernetes, but having microservices does NOT automatically mean you must run Kubernetes.',
      'Teams should only take on Kubernetes when their architecture truly requires custom cluster-level networking, custom resource definitions, multi-region ingress meshes, or specialized workloads that simpler managed platforms cannot accommodate.',
    ],
  },

  // SLIDE 4: Progressive Cluster Architecture Diagram
  {
    id: 'aks-cluster-architecture',
    title: 'AKS Progressive Cluster Architecture',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'architecture',
    motifBadge: 'Architecture: AKS Cluster',
    summary:
      'Incoming HTTPS traffic routes through the Ingress Controller and Cluster Services to isolated Pod replicas spanning Frontend, API, Auth, and Worker workloads.',
    diagram: {
      nodes: [
        { id: 'users', label: 'End Users', sublabel: 'External HTTPS', type: 'user' },
        { id: 'ingress', label: 'Ingress Controller', sublabel: 'NGINX / App Gateway', type: 'network' },
        { id: 'services', label: 'Cluster Services', sublabel: 'L4 Internal Discovery', type: 'network' },
        { id: 'fe-pod', label: 'Frontend Pods', sublabel: 'React / Next.js', type: 'compute' },
        { id: 'api-pod', label: 'API Pods', sublabel: 'Core Business API', type: 'compute' },
        { id: 'auth-pod', label: 'Auth Pods', sublabel: 'OAuth2 / Identity', type: 'compute' },
        { id: 'worker-pod', label: 'Worker Pods', sublabel: 'Async Processing', type: 'compute' },
      ],
      edges: [
        { from: 'users', to: 'ingress', label: '1. External Traffic' },
        { from: 'ingress', to: 'services', label: '2. Route by Host/Path' },
        { from: 'services', to: 'fe-pod', label: 'forward /' },
        { from: 'services', to: 'api-pod', label: 'forward /api' },
        { from: 'services', to: 'auth-pod', label: 'forward /auth' },
        { from: 'api-pod', to: 'worker-pod', label: 'queue / grpc' },
      ],
    },
    highlights: [
      'Ingress Controller routes external domain requests based on URL path rules',
      'Kubernetes Services distribute load across healthy pod replicas',
      'Frontend, API, Auth, and Worker workloads operate in isolated pod lifecycles',
    ],
    speakerNotes: [
      'Here is the complete AKS cluster architecture flow.',
      'External user requests arrive at the Ingress Controller—such as the Application Gateway Ingress Controller or NGINX Ingress.',
      'The Ingress inspects the hostname and URL path, then routes traffic to the appropriate internal Kubernetes Service.',
      'The Service load balances the request across active pod replicas: Frontend Pods for UI, API Pods for business logic, and Auth Pods for authentication. Asynchronous tasks are communicated internally to Worker Pods via gRPC or message queues.',
    ],
  },

  // SLIDE 5: Large Statement Slide
  {
    id: 'aks-platform-statement',
    title: 'The Reality of Kubernetes',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'statement',
    statement: "Now we're managing a platform.",
    subtitle: 'Moving from application deployment to operating infrastructure, networking, and cluster governance.',
    motifBadge: 'Platform Engineering',
    speakerNotes: [
      "Now we're managing a platform.",
      'With Kubernetes, your engineering team is no longer just deploying code. You are managing a platform: cluster security, node scaling, ingress controllers, cert managers, service meshes, observability pipelines, and policy enforcement.',
      'For large engineering organizations, this platform abstraction provides immense power. But for small teams, it introduces substantial operational responsibility.',
    ],
  },

  // SECTION HEADER: The Overall Azure Deployment Spectrum
  {
    id: 'spectrum-section-header',
    title: 'The Azure Deployment Spectrum',
    section: 'The Azure Deployment Spectrum',
    type: 'section-header',
    sectionNumber: '07',
    description: 'Synthesizing every deployment model across infrastructure control and managed abstraction.',
    motifBadge: 'Synthesis & Decision Matrix',
    speakerNotes: [
      'Now we arrive at the major payoff of our talk: The Azure Deployment Spectrum.',
      'Having seen each deployment option individually, let us step back and look at how they all fit together into a cohesive architectural framework.',
    ],
  },

  // SLIDE 6: Progression Timeline
  {
    id: 'spectrum-progression-timeline',
    title: 'From Localhost to the Cloud: The Full Journey',
    section: 'The Azure Deployment Spectrum',
    type: 'architecture',
    motifBadge: 'Journey Recap',
    summary:
      'The chronological evolution of hosting architectures from developer machine to serverless PaaS and enterprise cluster orchestration.',
    diagram: {
      nodes: [
        { id: 'local', label: 'localhost:8080', sublabel: 'Local Dev', type: 'source' },
        { id: 'vm', label: 'Azure VM', sublabel: 'IaaS Server', type: 'compute' },
        { id: 'appservice', label: 'App Service', sublabel: 'Managed Web PaaS', type: 'compute' },
        { id: 'functions', label: 'Functions', sublabel: 'Event-Driven', type: 'compute' },
        { id: 'swa', label: 'SWA + Backend', sublabel: 'Decoupled Web', type: 'network' },
        { id: 'aca', label: 'Container Apps', sublabel: 'Serverless K8s', type: 'compute' },
        { id: 'aks', label: 'AKS', sublabel: 'Orchestration', type: 'compute' },
      ],
      edges: [
        { from: 'local', to: 'vm', label: 'Lift & Shift' },
        { from: 'vm', to: 'appservice', label: 'PaaS Abstraction' },
        { from: 'appservice', to: 'functions', label: 'Event-Driven' },
        { from: 'functions', to: 'swa', label: 'Decouple UI' },
        { from: 'swa', to: 'aca', label: 'Containerize' },
        { from: 'aca', to: 'aks', label: 'Platform Scale' },
      ],
    },
    highlights: [
      'Every option represents an evolution in how we package and run software',
      'No single model is universally superior — each solves specific architectural challenges',
      'Teams select architectures based on workload nature, team size, and operational budget',
    ],
    speakerNotes: [
      'Here is the complete journey we have walked through.',
      'We started at localhost:8080 on our development machine.',
      'We moved to an Azure VM for raw server control, then simplified our workflow with Azure App Service.',
      'We transitioned to event-driven compute with Azure Functions and decoupled our frontend with Static Web Apps.',
      'Then we adopted containers with Azure Container Apps and scaled up to full cluster orchestration with AKS.',
      'This is the spectrum of modern cloud deployment.',
    ],
  },

  // SLIDE 7: 2D Deployment Spectrum Matrix
  {
    id: 'spectrum-2d-matrix',
    title: 'The 2D Deployment Decision Matrix',
    section: 'The Azure Deployment Spectrum',
    type: 'text-visual',
    motifBadge: '2D Decision Framework',
    contentBlocks: [
      {
        heading: 'Two Architectural Dimensions',
        body: [
          'Dimension 1: Infrastructure Responsibility & Control (OS, kernel, low-level networking, cluster topology).',
          'Dimension 2: Managed Service Abstraction (developer velocity, automated scaling, platform-managed operations).',
        ],
        highlight: 'This is NOT a linear "best-to-worst" maturity ranking. Different architectures solve different operational problems.',
      },
    ],
    visualCards: [
      {
        title: 'AZURE VM',
        tag: 'MAX INFRASTRUCTURE CONTROL',
        items: [
          'Full OS root access & custom kernel modules',
          'Manual patching, backup, & scaling maintenance',
          'Best for legacy monolithic apps, custom daemons, or strict OS requirements',
        ],
      },
      {
        title: 'APP SERVICE',
        tag: 'MANAGED APP HOSTING',
        items: [
          'Turnkey web & API hosting with deployment slots',
          'Automated patching & integrated TLS/auth',
          'Best for standard web apps, REST APIs, and steady web workloads',
        ],
      },
      {
        title: 'AZURE FUNCTIONS',
        tag: 'EVENT-DRIVEN EXECUTION',
        items: [
          'Sub-second execution billing & scale-to-zero',
          'Rich native event triggers and output bindings',
          'Best for asynchronous processing, webhooks, and bursty tasks',
        ],
      },
      {
        title: 'CONTAINER APPS',
        tag: 'MANAGED CONTAINERS',
        items: [
          'Serverless microservices with KEDA scaling & Envoy ingress',
          'Zero Kubernetes cluster administration overhead',
          'Best for polyglot containerized services & microservice teams',
        ],
      },
      {
        title: 'AKS',
        tag: 'KUBERNETES ORCHESTRATION',
        items: [
          'Complete control over cluster networking, pods, & CRDs',
          'Requires dedicated platform ops & Kubernetes expertise',
          'Best for complex multi-tier enterprise microservice ecosystems',
        ],
      },
    ],
    speakerNotes: [
      'Let us make this crucial point: Do not look at this spectrum as a maturity ladder where AKS is the best and VM is the worst.',
      'Instead, look at it across two dimensions: Infrastructure Control versus Managed Service Abstraction.',
      'If you need raw low-level control, Azure VM is your choice. If you want turnkey web hosting, App Service delivers immediate developer velocity. If your workload is event-driven, Functions saves immense costs. If you have containers but want zero cluster ops, Container Apps is the sweet spot. And if you need deep cluster customization and platform governance, AKS provides the ultimate orchestration toolkit.',
      'Every choice represents a conscious trade-off between control and cognitive overhead.',
    ],
  },

  // SLIDE 8: Conversational Transition to Case Studies
  {
    id: 'case-studies-transition',
    title: 'Ready for Real-World Scenarios',
    section: 'The Azure Deployment Spectrum',
    type: 'statement',
    statement: 'Now, let’s work on some case studies para mas ma-gets pa natin.',
    subtitle: 'Putting theory into practice: Evaluating business requirements, constraints, and choosing the right Azure architecture.',
    motifBadge: 'Interactive Case Studies',
    speakerNotes: [
      'Now, let’s work on some case studies para mas ma-gets pa natin.',
      'We have examined the theory, the diagrams, and the operational trade-offs for each deployment model.',
      'Now, let us put this decision framework into action with realistic scenarios to see how you would choose the right Azure deployment strategy for different business problems.',
    ],
  },
];
