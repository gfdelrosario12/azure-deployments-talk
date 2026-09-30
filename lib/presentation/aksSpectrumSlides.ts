import { SlideData } from './types';

export const aksSpectrumSlides: SlideData[] = [
  // ── 8. AZURE KUBERNETES SERVICE (AKS) ────────────────────────────────────

  {
    id: 'aks-statement',
    title: 'Azure Kubernetes Service (AKS)',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'statement',
    statement: 'The enterprise scale route.',
    subtitle: 'Advanced container orchestration — manage clusters, pods, services, and microservices at scale.',
    motifBadge: 'AKS // Enterprise Orchestration',
    logos: [{ src: '/assets/icons/azure-kubernetes-service.svg', alt: 'Azure Kubernetes Service' }],
    speakerNotes: [
      "Now, we've reached Azure Kubernetes Service, or AKS.",
      'This is where we move into much more advanced container orchestration.',
      'Instead of simply deploying one application or a few containers, Kubernetes allows us to manage a large collection of containers across a cluster.',
    ],
  },

  {
    id: 'aks-concepts',
    title: 'Kubernetes Core Concepts',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'text-visual',
    motifBadge: 'K8s Primitives',
    contentBlocks: [
      {
        heading: 'Containerization → Orchestration',
        body: [
          'Containerization: package your applications and dependencies into Docker containers so they run consistently across environments.',
          'Kubernetes: manage a large collection of those containers across a cluster — scheduling, scaling, self-healing, and service discovery.',
        ],
        highlight:
          'AKS gives granular control over clusters, pods, services, deployments, and ingress controllers.',
      },
      {
        heading: 'Common Use Case: Microservices',
        body: [
          'Many independent backend and frontend services, each deployed and managed independently.',
          'Kubernetes handles service discovery, scheduling, scaling, rolling deployments, and desired-state reconciliation.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'KUBERNETES PRIMITIVES',
        tag: 'WHAT YOU MANAGE',
        items: [
          'Pods — smallest deployable unit',
          'Deployments — replica & rolling update controller',
          'Services — stable internal load balancer',
          'Ingress — L7 HTTP/HTTPS routing',
          'ConfigMaps & Secrets — config & credentials',
          'Namespaces — multi-tenant isolation',
          'Cluster Nodes — worker VM instances',
        ],
      },
      {
        title: 'KUBERNETES CAPABILITIES',
        tag: 'WHAT K8s HANDLES',
        items: [
          'Service discovery & internal DNS',
          'Intelligent workload scheduling',
          'Automatic self-healing replicas',
          'Zero-downtime rolling deployments',
          'Horizontal Pod & Cluster Autoscaling',
        ],
      },
    ],
    speakerNotes: [
      'Containerization is yung kaninang gagamit ka ng maraming Docker containers.',
      'Basically, we package our applications and their dependencies into containers so they can run consistently across environments.',
      'AKS gives us granular control over our container clusters, pods, services, deployments, and ingress controllers.',
      'Kadalasan, para sa mga microservices ito — maraming iba\'t ibang backend and frontend services that can be deployed and managed independently.',
      'Instead of manually managing each container, Kubernetes handles service discovery, scheduling, scaling, rolling deployments, and maintaining the desired state.',
    ],
  },

  {
    id: 'aks-architecture',
    title: 'AKS Cluster Architecture',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'architecture',
    motifBadge: 'Architecture: AKS Cluster',
    summary:
      'External HTTPS traffic enters through the Ingress Controller, routes via Kubernetes Services to isolated Pod replicas — Frontend, API, Auth, and Worker workloads running across cluster nodes.',
    diagram: {
      nodes: [
        { id: 'users', label: 'End Users', sublabel: 'External HTTPS', type: 'user' },
        { id: 'ingress', label: 'Ingress Controller', sublabel: 'NGINX / App Gateway', type: 'network' },
        { id: 'services', label: 'Kubernetes Services', sublabel: 'Internal Load Balancer', type: 'network' },
        { id: 'fe-pod', label: 'Frontend Pods', sublabel: 'React / Next.js', type: 'compute' },
        { id: 'api-pod', label: 'API Pods', sublabel: 'Core Business API', type: 'compute' },
        { id: 'worker-pod', label: 'Worker Pods', sublabel: 'Async Processing', type: 'compute' },
      ],
      edges: [
        { from: 'users', to: 'ingress', label: '1. External traffic' },
        { from: 'ingress', to: 'services', label: '2. Route by host/path' },
        { from: 'services', to: 'fe-pod', label: 'forward /' },
        { from: 'services', to: 'api-pod', label: 'forward /api' },
        { from: 'api-pod', to: 'worker-pod', label: 'queue / gRPC' },
      ],
    },
    highlights: [
      'Ingress routes external traffic by URL path rules',
      'Services distribute load across healthy pod replicas',
      'Each workload (frontend, API, worker) scales independently',
      'With great power comes great operational responsibility',
    ],
    speakerNotes: [
      'External user requests arrive at the Ingress Controller.',
      'The Ingress inspects the hostname and URL path, then routes traffic to the appropriate Kubernetes Service.',
      'The Service load balances across active pod replicas.',
      'But, with that immense power comes substantially more operational responsibility and Kubernetes complexity.',
      'You now have concepts like pods, deployments, services, namespaces, ingress, ConfigMaps, Secrets, and cluster nodes to understand and manage.',
    ],
  },

  {
    id: 'aks-tradeoff',
    title: 'The AKS Trade-off',
    section: 'Azure Kubernetes Service (AKS)',
    type: 'comparison',
    motifBadge: 'Power vs Complexity',
    left: {
      title: 'What You Gain',
      subtitle: 'Enterprise-Scale Power',
      tag: 'CAPABILITIES',
      points: [
        'Full control over cluster networking, CNI, and ingress',
        'Custom resource definitions (CRDs) and operators',
        'Multi-tenant namespace isolation',
        'Advanced deployment strategies (canary, blue/green)',
        'Platform-level observability and policy enforcement',
      ],
    },
    right: {
      title: 'What You Take On',
      subtitle: 'Operational Complexity',
      tag: 'RESPONSIBILITY',
      points: [
        'Worker node VM sizing, OS, and upgrades',
        'Kubernetes manifests, Helm charts, and RBAC',
        'Ingress controllers, cert managers, service meshes',
        'Cluster security, network policies, and secrets management',
        'Dedicated platform ops expertise required',
      ],
    },
    takeaway:
      'AKS is not for every team. Evaluate whether Container Apps or App Service already fulfills your needs before taking on cluster operations.',
    speakerNotes: [
      'With that immense power comes substantially more operational responsibility and Kubernetes complexity.',
      'Microservices are a common use case for Kubernetes — but microservices do NOT automatically require Kubernetes.',
      'Container Apps handles the majority of microservice setups without cluster management overhead.',
      'Choose AKS when you truly need custom cluster-level networking, CRDs, or specialized workloads.',
    ],
  },

  // ── THE AZURE DEPLOYMENT SPECTRUM ─────────────────────────────────────────

  {
    id: 'spectrum-section-header',
    title: 'The Azure Deployment Spectrum',
    section: 'The Azure Deployment Spectrum',
    type: 'section-header',
    sectionNumber: '07',
    description:
      'From Virtual Machines to App Service, Functions, Containers, and Kubernetes — the full journey.',
    motifBadge: 'Synthesis & Decision Matrix',
    speakerNotes: [
      'And that is all for the different deployment methodologies with Microsoft Azure.',
      'Now, meron pa na mga mas advanced na deployment methods. But yun na yung mga core and basics.',
      'Let us step back and look at how they all fit together.',
    ],
  },

  {
    id: 'spectrum-progression',
    title: 'From localhost:8080 to the Cloud',
    section: 'The Azure Deployment Spectrum',
    type: 'architecture',
    motifBadge: 'The Full Journey',
    summary:
      'The progression from traditional infrastructure to managed PaaS, serverless, separated architectures, containers, and Kubernetes.',
    diagram: {
      nodes: [
        { id: 'local', label: 'localhost:8080', sublabel: 'Local Dev', type: 'source' },
        { id: 'vm', label: 'Azure VM', sublabel: 'IaaS', type: 'compute' },
        { id: 'appservice', label: 'App Service', sublabel: 'Managed PaaS', type: 'compute' },
        { id: 'functions', label: 'Functions', sublabel: 'Serverless', type: 'compute' },
        { id: 'swa', label: 'SWA + Backend', sublabel: 'Decoupled Web', type: 'network' },
        { id: 'aca', label: 'Container Apps', sublabel: 'Managed Containers', type: 'compute' },
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
      'Traditional Infrastructure → Managed PaaS → Serverless → Separated Architectures → Containers → Kubernetes',
      'No single model is universally superior — each solves specific problems',
      'Choose based on your app\'s needs, team capabilities, and how much infra you want to manage',
    ],
    speakerNotes: [
      'Here is the complete journey we have walked through.',
      'We started at localhost:8080. We moved to an Azure VM for raw server control, then simplified with App Service.',
      'We transitioned to event-driven compute with Functions, decoupled our frontend with Static Web Apps.',
      'Then we adopted containers with Container Apps and scaled up to full cluster orchestration with AKS.',
      'Azure gives us different deployment options — from Virtual Machines, App Service, Functions, Containers, to Kubernetes.',
    ],
  },

  {
    id: 'case-studies-transition',
    title: 'The Azure Deployment Spectrum',
    section: 'Interactive Case Studies',
    type: 'section-header',
    sectionNumber: '08',
    description:
      'Putting theory into practice: evaluate requirements, constraints, and choose the right Azure architecture.',
    motifBadge: 'Interactive Case Studies',
    speakerNotes: [
      "Now, let's work on some case studies so we can better understand the concepts we've covered.",
      'We have examined the theory, diagrams, and trade-offs for each deployment model.',
      'Now let us put this decision framework into action with realistic scenarios.',
    ],
  },
];
