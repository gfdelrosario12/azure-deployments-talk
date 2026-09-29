import { SlideData } from './types';

export const vmAppServiceSlides: SlideData[] = [
  // SLIDE 1: Azure VM Section Statement
  {
    id: 'vm-statement',
    title: 'Azure Virtual Machines',
    section: 'Azure Virtual Machine (IaaS)',
    type: 'statement',
    statement: 'You get the server. You own the problem.',
    subtitle: 'The foundational, maximum-control IaaS approach in Microsoft Azure.',
    motifBadge: 'IaaS // Raw Server',
    speakerNotes: [
      'We start with the most traditional approach: the Azure Virtual Machine.',
      'An Azure VM is Infrastructure as a Service (IaaS). It gives you a raw virtualized server in the cloud—complete root access and total freedom.',
      'With that ultimate freedom comes the ultimate reality: You get the server, and you own every single problem that happens on it.',
    ],
  },

  // SLIDE 2: Azure VM Stack & CLI Responsibility
  {
    id: 'vm-tech-stack-cli',
    title: 'Total Freedom, Total Responsibility',
    section: 'Azure Virtual Machine (IaaS)',
    type: 'text-visual',
    motifBadge: 'ssh gladwin@azure-vm',
    contentBlocks: [
      {
        heading: 'The Command Line Workflow',
        body: [
          'You SSH into your Linux/Windows box, run `sudo apt update && sudo apt install -y ...`, configure systemd services, and bind ports.',
          'Everything you could do on a local bare-metal server, you can do here.',
        ],
        highlight: 'Complete control over OS kernels, packages, background daemons, and system libraries.',
      },
      {
        heading: 'What Runs on an Azure VM?',
        body: [
          'Full flexibility to host web servers, background worker jobs, databases, reverse proxies, and container runtimes.',
        ],
      },
    ],
    visualCards: [
      {
        title: 'COMMON VM STACKS',
        tag: 'CUSTOM RUNTIMES',
        items: [
          'Ubuntu / Debian / RHEL',
          'Docker Engine',
          'Nginx / Apache',
          'PostgreSQL / MySQL',
          'Spring Boot (Java)',
          'Node.js / Express',
          'Python (Django / FastAPI)',
        ],
      },
      {
        title: 'MANAGEMENT CHECKLIST',
        tag: 'MANUAL OPS',
        items: [
          'OS Security Patches',
          'Firewall Rules (NSGs)',
          'SSL / TLS Cert Renewals',
          'Process Restarts (systemd)',
          'Log Rotation & Disk Space',
        ],
      },
    ],
    speakerNotes: [
      'When you launch an Azure VM, you get an SSH prompt. You can install any packages with sudo apt install, configure systemd units to keep your services alive, set up your reverse proxy with Nginx, and manage your database locally or remotely.',
      'Whether you are running an Ubuntu server with Spring Boot, Node.js, Python FastAPI, or running Docker directly on the host, you have full control.',
      'However, that means you are personally on the hook for OS security patches, firewall configurations, certbot renewals, and disk space management.',
    ],
  },

  // SLIDE 3: Azure VM Deployment Architecture Diagram
  {
    id: 'vm-architecture-diagram',
    title: 'Azure VM Deployment Flow',
    section: 'Azure Virtual Machine (IaaS)',
    type: 'architecture',
    motifBadge: 'Deployment: git clone',
    summary:
      'Traditional VM deployment requires cloning source code onto the host, building the binary, configuring system services, and routing external HTTP traffic through a reverse proxy.',
    diagram: {
      nodes: [
        { id: 'gh', label: 'GitHub', sublabel: 'Source Repo', type: 'source' },
        { id: 'vm', label: 'Azure VM', sublabel: 'Ubuntu 24.04', type: 'compute' },
        { id: 'os', label: 'OS & systemd', sublabel: 'Process Mgr', type: 'storage' },
        { id: 'nginx', label: 'Nginx', sublabel: 'Reverse Proxy', type: 'network' },
        { id: 'app', label: 'Application', sublabel: 'Port 8080', type: 'compute' },
        { id: 'users', label: 'End Users', sublabel: 'HTTPS (443)', type: 'user' },
      ],
      edges: [
        { from: 'gh', to: 'vm', label: 'git clone / ssh' },
        { from: 'vm', to: 'os', label: 'exec' },
        { from: 'os', to: 'app', label: 'daemonize' },
        { from: 'nginx', to: 'app', label: 'proxy_pass' },
        { from: 'users', to: 'nginx', label: 'web traffic' },
      ],
    },
    secondaryDiagram: {
      nodes: [
        { id: 'gh-c', label: 'GitHub Actions', sublabel: 'CI Pipeline', type: 'source' },
        { id: 'vm-c', label: 'Azure VM Host', sublabel: 'Docker Engine', type: 'compute' },
        { id: 'docker-c', label: 'Docker Container', sublabel: 'app:latest', type: 'compute' },
        { id: 'nginx-c', label: 'Nginx Container', sublabel: 'Port 80/443', type: 'network' },
        { id: 'users-c', label: 'End Users', sublabel: 'Public Web', type: 'user' },
      ],
      edges: [
        { from: 'gh-c', to: 'vm-c', label: 'docker pull' },
        { from: 'vm-c', to: 'docker-c', label: 'run' },
        { from: 'nginx-c', to: 'docker-c', label: 'proxy' },
        { from: 'users-c', to: 'nginx-c', label: 'requests' },
      ],
    },
    highlights: [
      'Manual git pull / SSH deployment scripts',
      'Port 8080 proxied through port 80/443 via Nginx',
      'Optionally host containerized workloads via Docker on VM',
    ],
    speakerNotes: [
      'Here is the classic architecture flow: Your code lives on GitHub. You SSH into the Azure VM, run git clone or git pull, compile your application, and register it as a systemd background service.',
      'Nginx listens on port 80 and 443, handling SSL termination, and proxies incoming web requests over to your application running on internal port 8080.',
      'You can also install Docker on the VM to run your app as containers. But notice who manages the VM health, Docker daemon upgrades, and OS patches? You do.',
    ],
  },

  // SLIDE 4: Azure VM Operational Responsibility Checklist
  {
    id: 'vm-responsibility-checklist',
    title: 'The Full VM Ownership Reality',
    section: 'Azure Virtual Machine (IaaS)',
    type: 'text-visual',
    motifBadge: 'IaaS Checklist',
    contentBlocks: [
      {
        heading: 'What You Personally Manage on a VM',
        body: [
          '1. Operating System installation, patching, and major kernel upgrades.',
          '2. Network Security Groups (NSGs), open inbound/outbound ports, and subnets.',
          '3. Web server configuration (Nginx / Apache mime types, buffer sizes, headers).',
          '4. SSL certificate provisioning, renewal cron jobs, and DNS records.',
          '5. Health checks, monitoring agents, crash recoveries, and auto-restart policies.',
        ],
        highlight: 'Great when you need non-standard OS extensions, specific kernels, or legacy dependencies.',
      },
    ],
    visualCards: [
      {
        title: 'WHO OWNS WHAT?',
        tag: 'IaaS SPLIT',
        items: [
          'Azure: Physical Datacenter',
          'Azure: Hypervisor & Hardware',
          'You: OS & Security Updates',
          'You: Networking & Firewall Rules',
          'You: Runtime & Dependencies',
          'You: Application Code & Data',
        ],
      },
    ],
    speakerNotes: [
      'Let’s look at the ownership split: Azure guarantees the physical server and the virtualization layer. Everything from the operating system up is your responsibility.',
      'If an OpenSSL vulnerability is discovered on Monday morning, you have to patch the VM.',
      'If your application crashes due to an out-of-memory error, you have to configure the swap space and process monitors.',
      'This is unmatched power for legacy or specialized workloads, but heavy lifting for modern web applications.',
    ],
  },

  // SLIDE 5: Azure App Service Section Statement
  {
    id: 'app-service-statement',
    title: 'Azure App Service',
    section: 'Azure App Service (PaaS)',
    type: 'statement',
    statement: 'Deploy the application. Let Azure handle the boring parts.',
    subtitle: 'Moving up the abstraction stack into fully managed Platform as a Service (PaaS).',
    motifBadge: 'PaaS // Zero OS Mgmt',
    speakerNotes: [
      'Next up is Azure App Service, which moves us into PaaS—Platform as a Service.',
      'App Service is designed specifically for conventional web applications, APIs, and microservices where you want the agility of cloud hosting without manually babysitting the underlying operating system.',
      'The philosophy changes: Deploy your application code, and let Azure handle the boring parts like OS patching, runtime updates, and load balancing.',
    ],
  },

  // SLIDE 6: Azure App Service Supported Technologies & Features
  {
    id: 'app-service-ecosystem',
    title: 'First-Class Runtime Ecosystem',
    section: 'Azure App Service (PaaS)',
    type: 'text-visual',
    motifBadge: 'Managed Runtimes',
    contentBlocks: [
      {
        heading: 'Managed Polyglot Web Hosting',
        body: [
          'Azure App Service provides pre-configured, hardened runtime environments out of the box with zero OS administration.',
          'Supports both Linux and Windows hosting plans, custom domain mapping, automated SSL certificates, and integrated deployment slots.',
        ],
        highlight: 'Built-in auto-healing, load balancing, health checks, and effortless horizontal scaling.',
      },
    ],
    visualCards: [
      {
        title: 'SUPPORTED RUNTIMES',
        tag: 'OFFICIAL STACKS',
        items: [
          'Node.js (Express, Nest, Next)',
          'Python (Django, FastAPI, Flask)',
          'Java (SE, Spring Boot, Tomcat)',
          '.NET / .NET Core / ASP.NET',
          'PHP',
          'Custom Docker Containers',
        ],
      },
      {
        title: 'BUILT-IN PLATFORM POWERS',
        tag: 'PAAS PERKS',
        items: [
          'Automated Zero-Downtime Slots',
          'Free Managed SSL / TLS',
          'GitHub Actions / Azure DevOps CI/CD',
          'Automatic Scaling Rules',
          'Integrated App Insights Telemetry',
        ],
      },
    ],
    speakerNotes: [
      'App Service has first-class native support for all mainstream application stacks: React, Angular, and Vue frontends, Node.js, Python, Java Spring Boot, and .NET APIs.',
      'You don’t have to install Java 21 or configure Node runtime paths; Azure provisions a secure, optimized runtime container for you.',
      'You also get enterprise features built right in: free managed SSL certificates, deployment slots for blue/green zero-downtime releases, and automated scaling.',
    ],
  },

  // SLIDE 7: VM vs App Service Deployment Flow Comparison
  {
    id: 'vm-vs-appservice-workflow',
    title: 'Deployment Workflow Comparison',
    section: 'Deployment Comparison',
    type: 'comparison',
    motifBadge: 'Workflow Shift',
    left: {
      title: 'Azure Virtual Machine (IaaS)',
      subtitle: 'Manual / Imperative Workflow',
      tag: 'SSH & Scripting',
      points: [
        'Developer SSHes into virtual machine instance.',
        'Manually configures runtime dependencies and environment variables.',
        'Runs git clone / git pull and compiles code on the host.',
        'Restarts systemd service or Docker daemon manually.',
        'Configures Nginx reverse proxy routing and SSL renewal cron.',
      ],
    },
    right: {
      title: 'Azure App Service (PaaS)',
      subtitle: 'Automated / Declarative Workflow',
      tag: 'Continuous Deployment',
      points: [
        'Developer pushes commit or pull request to GitHub / Azure Repos.',
        'Pipeline or Oryx engine builds application artifact automatically.',
        'Azure deploys artifact directly into the managed container runtime.',
        'Zero SSH access required; platform manages process lifecycle.',
        'Platform automatically provisions SSL cert and routes traffic to port 80/443.',
      ],
    },
    takeaway:
      'PaaS replaces manual server administration with automated, continuous deployment pipelines.',
    speakerNotes: [
      'Look at how the developer experience transforms between these two models.',
      'On a VM: Developer → SSH → VM → Configure → Build → Deploy → Configure Nginx.',
      'On App Service: Developer → Push to Repository → Pipeline / Azure App Service → Live Application.',
      'Instead of SSHing into a server and running git clone, you connect your GitHub repository, and Azure takes care of building, deploying, and binding the HTTP port automatically.',
    ],
  },

  // SLIDE 8: Operational Responsibility Spectrum Slide
  {
    id: 'operational-tradeoff-spectrum',
    title: 'Control vs. Convenience Trade-off',
    section: 'Trade-off Analysis',
    type: 'comparison',
    motifBadge: 'Trade-off Spectrum',
    left: {
      title: 'Choose Azure VM When:',
      subtitle: 'Custom Control is Critical',
      tag: 'High Control',
      points: [
        'You need specific OS kernel drivers or custom background Windows/Linux daemons.',
        'You are lifting and shifting legacy applications with hardcoded host dependencies.',
        'You require specific network topologies and local database co-location.',
        'You have dedicated DevOps staff to maintain security updates and OS patching.',
      ],
    },
    right: {
      title: 'Choose App Service When:',
      subtitle: 'Developer Velocity is Priority',
      tag: 'High Velocity',
      points: [
        'You are building standard web apps, REST APIs, or single-page application backends.',
        'You want push-to-deploy CI/CD without managing server infrastructure.',
        'You need staging/production deployment slots with instant rollback.',
        'You prefer focusing 100% of engineering bandwidth on product features.',
      ],
    },
    takeaway:
      'App Service is not strictly "better" than a VM—they represent distinct operational trade-offs on the cloud continuum.',
    speakerNotes: [
      'It is crucial not to view this as "App Service is modern, so VMs are bad". It is about matching your operational model to your application requirements.',
      'If you have custom background daemons, specific OS requirements, or legacy lift-and-shift workloads, a VM gives you the exact control you need.',
      'If you are building standard web applications and APIs, App Service removes massive operational toil so your team can focus on shipping value.',
    ],
  },

  // SLIDE 9: Transition to Containers Slide
  {
    id: 'transition-to-containers',
    title: 'What If We Need Both Portability and Simplicity?',
    section: 'Next Horizon',
    type: 'section-header',
    sectionNumber: '03',
    description: 'Bridging the gap between VM control and PaaS convenience with Containers.',
    motifBadge: 'Next: Containers',
    speakerNotes: [
      'We have seen the two extremes of traditional hosting: the raw control of Virtual Machines and the simplicity of App Service.',
      'But what happens when our application dependencies become more complex, and we want standardized portability across any environment?',
      'That brings us to the next stage of our deployment evolution: Containerized Deployments with Azure Container Apps and Kubernetes!',
    ],
  },
];
