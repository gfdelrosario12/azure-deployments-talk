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
        accent: true,
        body: [
          'A plain-text recipe that describes exactly how to build a container image — OS base, runtime, dependencies, and startup command.',
          'Write it once. Run it identically on your laptop, a VM, or any cloud platform.',
          'Four instructions describe your whole runtime: the base image, where the code goes, what it listens on, and how it starts.',
        ],
        highlight: 'No more "it works on my machine" — the container IS the machine.',
      },
      {
        heading: 'Java Spring Boot API',
        icon: { src: '/assets/icons/java.webp', alt: 'Java' },
        body: [
          'FROM eclipse-temurin:21-jre-alpine',
          'WORKDIR /app',
          'COPY target/aquadflow-api.jar app.jar',
          'EXPOSE 8080',
          'ENTRYPOINT ["java", "-jar", "app.jar"]',
        ],
      },
      {
        heading: 'Flutter App (built ahead of time)',
        body: [
          'flutter build apk --release',
          'flutter build ios --release',
          '',
          '# AOT-compiled binary — no runtime server',
          '# Android: .apk / .aab  |  iOS: .ipa',
          'Ship via Play Store / App Store',
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
      'Four lines do it: what base image you start from, where your code lives, what port it listens on, and the command that starts it.',
      'For the Java Spring Boot API: start from a JRE Alpine image, copy the compiled JAR, expose port 8080, and run it.',
      'For the Flutter app: it compiles ahead of time to an AOT binary — an APK or App Bundle for Android, an IPA for iOS — which you ship through the Play Store or App Store rather than hosting on a server.',
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
    id: 'app-service-public-endpoints',
    title: 'Making the API Public: Domain or Public IP',
    section: 'Azure App Service (PaaS)',
    type: 'architecture',
    motifBadge: 'Exposing the API',
    summary:
      'Once deployed, the API still lives on an Azure-provided hostname. To let the Flutter app and the outside world reach it, you expose it two ways: bind a custom domain, or just use the public IP Azure hands you.',
    diagram: {
      nodes: [
        { id: 'azure',    label: 'Azure App Service', sublabel: 'your Spring Boot API', type: 'compute', status: 'active' },
        { id: 'domain',   label: 'Custom Domain',      sublabel: 'api.aquadflow.app',   type: 'network' },
        { id: 'ip',       label: 'Public IP',          sublabel: '20.x.x.x:8080',       type: 'network' },
        { id: 'dns',      label: 'DNS / A Record',     sublabel: 'domain → App Service', type: 'network' },
        { id: 'frontend', label: 'Flutter App',        sublabel: 'Dart client',         type: 'user', status: 'active' },
      ],
      edges: [
        { from: 'domain', to: 'azure', label: 'HTTPS + custom SSL', animated: false },
        { from: 'dns',    to: 'domain', label: 'point the record', animated: false },
        { from: 'ip',     to: 'azure', label: 'default outbound',   animated: false },
        { from: 'frontend', to: 'domain', label: 'calls the API',   animated: true },
        { from: 'frontend', to: 'ip',   label: 'or plain IP',    animated: false },
      ],
    },
    highlights: [
      'Custom domain: bind api.yourdomain.com with managed SSL — the professional choice',
      'Public IP: Azure gives you an address immediately — fine for demos and thesis defenses',
      'Either way the endpoints below become reachable from the frontend',
    ],
    speakerNotes: [
      'So once the API is deployed, there is one more step before the frontend can talk to it: it has to be reachable from outside Azure.',
      'You have two options. The first is a custom domain — you buy a domain, add a DNS A record that points to your App Service, and then bind it inside App Service. Azure issues the SSL certificate for you automatically.',
      'That is the professional choice, and that is what you would use in production.',
      'The second option is much simpler: App Service already gives you a public IP. You can just use that raw IP address to reach your endpoints.',
      'That is not something you would ship, but it is perfect for a demo or for a thesis defense, because you can hand somebody an IP and a port and it works.',
      'Now, what does "the endpoints" actually mean? It is just your REST API — the AquaFlow Spring Boot backend.',
      'Every endpoint you write in that backend becomes a URL under the base address.',
      'So if your base is the App Service hostname, then GET /api/paddies gives you every rice paddy, GET /api/paddies/{id} gives you one specific paddy, GET /api/users gives you the users, and POST /api/users registers a new one.',
      'Add GET /api/readings for sensor telemetry, GET /api/irrigation/status for the current AWD state, and you have GET /api/health for uptime checks.',
      'And that is the connection: in the Flutter app you set one base URL — like const String apiBase = "https://api.aquadflow.app" — and then every call in your app is just apiBase plus the path.',
      'So the Flutter app calls GET $apiBase/api/paddies, and the App Service answers with JSON.',
      'And because I told you earlier the backend also pushes real-time events over WebSocket, that same base URL handles the live stream too.',
      'One deployment, one base URL, every endpoint — that is the whole contract between your frontend and your backend.',
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
