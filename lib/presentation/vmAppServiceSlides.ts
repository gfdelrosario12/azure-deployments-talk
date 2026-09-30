import { SlideData } from './types';

export const vmAppServiceSlides: SlideData[] = [
  // ── 1. AZURE VIRTUAL MACHINE ──────────────────────────────────────────────

  {
    id: 'vm-statement',
    title: 'Azure Virtual Machine',
    section: 'Azure Virtual Machine (IaaS)',
    type: 'statement',
    statement: 'You get the server. You own everything inside it.',
    subtitle: 'Pure IaaS — renting a raw server in the cloud.',
    motifBadge: 'IaaS // The Classic Approach',
    logos: [{ src: '/assets/icons/azure-vm.svg', alt: 'Azure Virtual Machine' }],
    speakerNotes: [
      'We start with the most traditional approach: the Azure Virtual Machine.',
      'Essentially, you are renting a raw server in the cloud. This is pure IaaS.',
      'You can install whatever you want on it — Ubuntu, Docker, Nginx, PostgreSQL, Spring Boot, Node.js, you name it.',
      'Azure gives us the server — but we are responsible for everything running inside that server.',
    ],
  },

  {
    id: 'vm-architecture-diagram',
    title: 'Azure VM Deployment Flow',
    section: 'Azure Virtual Machine (IaaS)',
    type: 'architecture',
    motifBadge: 'Deployment: git clone',
    summary:
      'Clone your repository into the VM, run your application as a system service, and route public traffic through Nginx. Optionally, run Docker containers on the same host.',
    diagram: {
      nodes: [
        { id: 'gh', label: 'GitHub', sublabel: 'Source Repo', type: 'source' },
        { id: 'vm', label: 'Azure VM', sublabel: 'Ubuntu / Linux', type: 'compute' },
        { id: 'app', label: 'Application', sublabel: 'Port 8080 (24/7)', type: 'compute' },
        { id: 'nginx', label: 'Nginx', sublabel: 'Reverse Proxy', type: 'network' },
        { id: 'users', label: 'End Users', sublabel: 'HTTPS (443)', type: 'user' },
      ],
      edges: [
        { from: 'gh', to: 'vm', label: 'git clone' },
        { from: 'vm', to: 'app', label: 'systemd / run' },
        { from: 'nginx', to: 'app', label: 'proxy_pass :8080' },
        { from: 'users', to: 'nginx', label: 'web traffic' },
      ],
    },
    secondaryDiagram: {
      nodes: [
        { id: 'gh2', label: 'GitHub', sublabel: 'Source Repo', type: 'source' },
        { id: 'vm2', label: 'Azure VM', sublabel: 'Docker Engine', type: 'compute' },
        { id: 'container', label: 'Docker Container', sublabel: 'app:latest', type: 'compute' },
        { id: 'nginx2', label: 'Nginx', sublabel: 'Port 80 / 443', type: 'network' },
        { id: 'users2', label: 'End Users', sublabel: 'Public Web', type: 'user' },
      ],
      edges: [
        { from: 'gh2', to: 'vm2', label: 'git clone / pull' },
        { from: 'vm2', to: 'container', label: 'docker run' },
        { from: 'nginx2', to: 'container', label: 'proxy' },
        { from: 'users2', to: 'nginx2', label: 'requests' },
      ],
    },
    highlights: [
      'sudo apt install anything — full OS-level control',
      'git clone your repo, serve it 24/7 via systemd',
      'Or run Docker + Nginx on the same VM',
      'Azure gives the server — you manage everything inside',
    ],
    speakerNotes: [
      'The process: get your code from GitHub, git clone it into the VM, then serve it 24/7.',
      'Instead of running it on your usual PC where you can simply turn it off, the VM stays running in the cloud continuously.',
      'You can also use Docker inside the VM and serve the application through Nginx.',
      'With Virtual Machines, mas limitless pa yung pwede magawa.',
    ],
  },

  {
    id: 'vm-dockerfile',
    title: 'Dockerfile: Define Your Runtime Once',
    section: 'Azure Virtual Machine (IaaS)',
    type: 'text-visual',
    motifBadge: 'Docker // Containerization',
    contentBlocks: [
      {
        heading: 'What is a Dockerfile?',
        body: [
          'A plain-text recipe that describes exactly how to build a container image — OS base, runtime, dependencies, and startup command.',
          'Write it once. Run it identically on your laptop, a VM, or any cloud platform.',
        ],
        highlight: 'No more "it works on my machine" — the container IS the machine.',
      },
      {
        heading: 'Java Spring Boot API',
        body: [
          'FROM eclipse-temurin:21-jre-alpine',
          'WORKDIR /app',
          'COPY target/aquadflow-api.jar app.jar',
          'EXPOSE 8080',
          'ENTRYPOINT ["java", "-jar", "app.jar"]',
        ],
      },
      {
        heading: 'Next.js Dashboard (multi-stage)',
        body: [
          'FROM node:20-alpine AS builder',
          'WORKDIR /app && COPY package*.json ./',
          'RUN npm ci && COPY . . && RUN npm run build',
          '',
          'FROM node:20-alpine',
          'WORKDIR /app',
          'COPY --from=builder /app/.next/standalone ./',
          'EXPOSE 3000 && CMD ["node", "server.js"]',
        ],
      },
    ],
    visualCards: [
      {
        title: 'WHY IT MATTERS',
        tag: 'PORTABILITY',
        items: [
          'Reproducible builds',
          'Consistent environments',
          'VM, App Service,',
          'Container Apps, AKS',
          'No runtime surprises',
        ],
      },
    ],
    speakerNotes: [
      'Before we go further, let me quickly show you what a Dockerfile actually looks like.',
      'A Dockerfile is just a text file that describes your application environment — the base image, the runtime, your code, and the startup command.',
      'For the Java Spring Boot API: start from a JRE Alpine image, copy the compiled JAR, expose port 8080, and run it.',
      'For the Next.js dashboard: multi-stage build — first build the app, then copy only the output into a lean runtime image.',
      'The key insight: once you have a Dockerfile, you can deploy that container to a VM, App Service for Containers, Container Apps, or AKS — same image, everywhere.',
    ],
  },

  {
    id: 'vm-responsibility',
    title: 'Total Freedom, Total Responsibility',
    section: 'Azure Virtual Machine (IaaS)',
    type: 'comparison',
    motifBadge: 'IaaS Ownership Split',
    left: {
      title: 'Azure Manages',
      subtitle: 'Physical Infrastructure',
      tag: 'AZURE',
      points: [
        'Physical datacenter & hardware',
        'Hypervisor & virtualization layer',
        'Network backbone & power',
      ],
    },
    right: {
      title: 'You Manage',
      subtitle: 'Everything Else',
      tag: 'YOUR RESPONSIBILITY',
      points: [
        'OS installation, patching & kernel upgrades',
        'Nginx / Apache configuration & SSL certs',
        'Runtime dependencies & application code',
        'Firewall rules, ports & network security',
        'Process restarts, logs & disk space',
      ],
    },
    takeaway:
      'Great when you need OS-level control, custom daemons, or specific Linux distributions. Heavy lifting for standard web apps.',
    speakerNotes: [
      'Azure guarantees the physical server and virtualization layer. Everything from the OS up is your responsibility.',
      'If an OpenSSL vulnerability drops on Monday, you patch the VM. If your app crashes OOM, you configure swap and process monitors.',
      'This is unmatched power for specialized workloads — but heavy lifting for modern web applications.',
    ],
  },

  // ── 2. AZURE APP SERVICE ──────────────────────────────────────────────────

  {
    id: 'app-service-statement',
    title: 'Azure App Service',
    section: 'Azure App Service (PaaS)',
    type: 'statement',
    statement: 'Give Azure your GitHub link. It handles the rest.',
    subtitle: 'Full-stack web hosting without touching a Linux terminal — pure PaaS.',
    motifBadge: 'PaaS // Simplest Full-Stack',
    logos: [{ src: '/assets/icons/azure-app-service.svg', alt: 'Azure App Service' }],
    speakerNotes: [
      'Next up is Azure App Service, which moves us into PaaS.',
      'If you want to deploy a full-stack web app or a REST API without dealing with Linux terminal configurations, this is usually your go-to option.',
      'Kung kanina, gumamit tayo ng git clone, ngayon literal na ibibigay na lang natin yung link ng GitHub repository natin kay Microsoft Azure.',
      'Then, Azure will take care of the deployment process for us.',
    ],
  },

  {
    id: 'app-service-architecture',
    title: 'Azure App Service Deployment Flow',
    section: 'Azure App Service (PaaS)',
    type: 'architecture',
    motifBadge: 'Architecture: App Service',
    summary:
      'Connect your GitHub repository to App Service. Azure pulls the code, builds the application, and deploys it — no SSH, no Nginx config, no OS management.',
    diagram: {
      nodes: [
        { id: 'gh', label: 'GitHub', sublabel: 'Your Repository', type: 'source' },
        { id: 'azure', label: 'Azure App Service', sublabel: 'Managed PaaS Runtime', type: 'compute' },
        { id: 'runtime', label: 'Managed Runtime', sublabel: 'Node / Java / Python / .NET', type: 'compute' },
        { id: 'users', label: 'End Users', sublabel: 'HTTPS', type: 'user' },
      ],
      edges: [
        { from: 'gh', to: 'azure', label: 'GitHub link / push' },
        { from: 'azure', to: 'runtime', label: 'build & deploy' },
        { from: 'runtime', to: 'users', label: 'serve traffic' },
      ],
    },
    highlights: [
      'No SSH, no Nginx config, no OS patching',
      'Supports React, Angular, Vue, Node.js, Python, Java, .NET',
      'Azure builds and deploys from your GitHub repo automatically',
      'Free managed SSL, custom domains, auto-scaling built in',
    ],
    speakerNotes: [
      'You can deploy your application directly as code — React, Angular, Vue frontend, or Node.js, Python, Java, .NET backend.',
      'App Service natively supports multiple platforms and manages the underlying runtime on Linux or Windows.',
      'Azure will take care of the deployment process: pull the code, build the application, deploy it to the App Service environment.',
    ],
  },

  {
    id: 'vm-vs-appservice-comparison',
    title: 'VM vs App Service: The Workflow Shift',
    section: 'Deployment Comparison',
    type: 'comparison',
    motifBadge: 'IaaS → PaaS',
    left: {
      title: 'Azure VM (IaaS)',
      subtitle: 'Manual Workflow',
      tag: 'SSH & SCRIPTING',
      points: [
        'SSH into the VM',
        'git clone your repository',
        'Configure runtime & dependencies manually',
        'Set up Nginx reverse proxy',
        'Manage SSL certs & systemd restarts',
      ],
    },
    right: {
      title: 'Azure App Service (PaaS)',
      subtitle: 'Automated Workflow',
      tag: 'PUSH TO DEPLOY',
      isPrimary: true,
      points: [
        'Connect your GitHub repository',
        'Azure pulls, builds, and deploys automatically',
        'No SSH access needed',
        'Platform manages runtime, SSL, and scaling',
        'Focus 100% on your application code',
      ],
    },
    takeaway:
      'PaaS replaces manual server administration with automated, continuous deployment pipelines.',
    speakerNotes: [
      'Look at how the developer experience transforms.',
      'VM: Developer → SSH → VM → Configure → Build → Deploy → Configure Nginx.',
      'App Service: Developer → Push to GitHub → Azure → Live Application.',
      'Instead of SSHing into a server and running git clone, you connect your GitHub repository and Azure handles everything.',
    ],
  },

  {
    id: 'transition-to-functions',
    title: 'What If We Only Need to Run One Piece of Code?',
    section: 'Next: Serverless',
    type: 'section-header',
    sectionNumber: '03',
    description:
      'Moving from continuously running servers to on-demand, event-driven execution with Azure Functions.',
    motifBadge: 'Next: Serverless',
    speakerNotes: [
      'We have seen the two extremes of traditional hosting: the raw control of VMs and the simplicity of App Service.',
      'But what if we do not need a full server running 24/7? What if we only need to run one piece of code when something happens?',
      'That brings us to the next stage: Serverless with Azure Functions.',
    ],
  },
];
