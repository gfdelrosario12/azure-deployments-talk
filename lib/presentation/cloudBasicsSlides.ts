import { SlideData } from './types';

export const cloudBasicsSlides: SlideData[] = [
  {
    id: 'iaas-paas-saas-spectrum',
    title: 'The Cloud Service Spectrum',
    section: 'Cloud Basics',
    type: 'text-visual',
    motifBadge: 'iaas-paas-saas',
    contentBlocks: [
      {
        heading: 'Infrastructure as a Service (IaaS)',
        body: [
          'Virtual machines, storage disks, virtual networks, and firewalls.',
          'You manage the operating system, runtime patches, and software installation.',
          'Azure manages physical hardware, power, cooling, and virtualization.',
        ],
        highlight: 'Maximum control, maximum operational maintenance.',
      },
      {
        heading: 'Platform as a Service (PaaS)',
        body: [
          'Managed application execution environments without OS configuration.',
          'Developer focuses purely on writing application code and data models.',
          'Azure handles OS updates, runtime security patches, and load balancing.',
        ],
        highlight: 'High developer velocity with managed operations.',
      },
      {
        heading: 'Software as a Service (SaaS)',
        body: [
          'End-user applications delivered over the internet (e.g., Microsoft 365).',
          'Zero platform or infrastructure management required.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'MANAGED SPECTRUM',
        tag: 'RESPONSIBILITY',
        items: ['IaaS: You own the OS', 'PaaS: You own the Code', 'SaaS: You own the Data'],
      },
    ],
    speakerNotes: [
      'To understand Azure deployments, we need to anchor ourselves in the classic cloud tiers: IaaS, PaaS, and SaaS.',
      'With IaaS, Azure gives you a blank VM and you manage the OS, security patches, networking, and dependencies.',
      'With PaaS, Azure manages the operating system and runtime layer, allowing you to focus on application logic.',
      'And with SaaS, the complete software application is delivered ready-to-use.',
    ],
  },
  {
    id: 'serverless-meme',
    title: 'The Serverless Reality',
    section: 'Serverless',
    type: 'image',
    motifBadge: 'serverless != no servers',
    image: {
      src: '/assets/memes/serverlessmeme1.jpg',
      alt: 'Serverless meme',
    },
    speakerNotes: [
      'Now, that brings us to a buzzword that everyone in tech loves to throw around: Serverless.',
      'Let’s be crystal clear: servers still exist! The cloud provider is simply abstracting the server lifecycle entirely away from your daily developer workflow.',
      'You write code that reacts to events, and the platform handles scaling from zero to thousands of executions automatically.',
    ],
  },
  {
    id: 'serverless-buzzword-intro',
    title: 'The "Serverless" Myth',
    section: 'Serverless',
    type: 'statement',
    statement: '"Serverless" does not mean there are no servers.',
    subtitle: 'It means you never have to provision, configure, or think about server maintenance.',
    motifBadge: 'serverless != no servers',
    speakerNotes: [
      'Now, that brings us to a buzzword that everyone in tech loves to throw around: Serverless.',
      'Let’s be crystal clear: servers still exist! The cloud provider is simply abstracting the server lifecycle entirely away from your daily developer workflow.',
      'You write code that reacts to events, and the platform handles scaling from zero to thousands of executions automatically.',
    ],
  },
  {
    id: 'serverful-vs-serverless',
    title: 'Traditional Serverful vs Event-Driven Serverless',
    section: 'Serverless',
    type: 'comparison',
    motifBadge: 'serverful vs serverless',
    left: {
      title: 'Traditional / Serverful',
      subtitle: 'Continuous Execution',
      tag: 'IaaS & Dedicated PaaS',
      points: [
        'Always-on compute instances running 24/7.',
        'Predictable, fixed hourly billing regardless of traffic volume.',
        'Manual or metric-based threshold autoscaling.',
        'Developer or Ops team responsible for capacity headroom.',
      ],
    },
    right: {
      title: 'Event-Driven Serverless',
      subtitle: 'On-Demand Execution',
      tag: 'Azure Functions / Event Grid',
      points: [
        'Instances spin up on-demand in response to incoming events or HTTP requests.',
        'Scale down to true zero instances when idle (zero cost idle).',
        'Micro-billing per execution millisecond.',
        'Platform automatically manages capacity, patching, and fault tolerance.',
      ],
    },
    takeaway: 'Choose serverful for continuous long-running workloads; choose serverless for bursty, event-driven pipelines.',
    speakerNotes: [
      'Notice the fundamental operational difference: In traditional serverful models, you pay for capacity standing by waiting for requests.',
      'In serverless architectures, compute only lives when an event triggers execution, scaling down to absolute zero when idle.',
      'Important note: not every Azure service behaves identically, but this event-driven execution model is the core philosophy.',
    ],
  },
  {
    id: 'transition-to-methodologies',
    title: 'The Azure Deployment Spectrum',
    section: 'Methodologies',
    type: 'section-header',
    sectionNumber: '02',
    description: 'From raw Virtual Machines to Managed PaaS, Containers, and Kubernetes.',
    motifBadge: 'spectrum: start',
    speakerNotes: [
      'Now that we have our foundation down, let’s jump straight into the core of our session: The Deployment Methodologies in Azure.',
      'We will walk through Azure Virtual Machines, Azure App Service, Azure Container Apps, and Azure Kubernetes Service.',
    ],
  },
];
