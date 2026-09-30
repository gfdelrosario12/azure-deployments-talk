import { SlideData } from './types';

export const openingSlides: SlideData[] = [
  {
    id: 'opening-title',
    title: 'Still on localhost:8080? Not Anymore!',
    section: 'Introduction',
    type: 'statement',
    statement: 'Still on localhost:8080?\nNot Anymore!',
    subtitle: 'Exploring Modern Deployment Methodologies with Microsoft Azure!',
    presentationLink: {
      label: 'Scan for this deck',
      url: 'https://azuredeployments-gladwindr.vercel.app/',
      qrSrc: '/assets/qr/presentation.svg',
    },
    logos: [
      { src: '/assets/azug.jpg', alt: 'AZUG Philippines', className: 'rounded-md' },
      { src: '/assets/jugph.png', alt: 'JUG Philippines' }
    ],
    speakerNotes: [
      'Welcome everyone! How many of you currently have an application running happily on localhost?',
      'Today, we are going on a journey from that cozy local development environment all the way to resilient, scalable cloud architectures on Microsoft Azure.',
    ],
  },
  {
    id: 'speaker-intro',
    title: 'Speaker',
    section: 'Introduction',
    type: 'text-visual',
    motifBadge: 'gladwin@dev',
    image: {
      src: '/assets/headshot.JPG',
      alt: 'Gladwin Ferdz I. Del Rosario',
      caption: 'Gladwin Ferdz I. Del Rosario',
    },
    affiliations: [
      {
        src: '/assets/dayforce.jpg',
        alt: 'Dayforce',
        label: 'IT Service Desk Intern',
      },
      {
        src: '/assets/jugph.png',
        alt: 'Java User Group Philippines',
        label: 'JUG Philippines',
      },
      {
        src: '/assets/pup.svg',
        alt: 'Polytechnic University of the Philippines',
        label: '4th Year BS CpE — Computer Networks',
      },
    ],
    contentBlocks: [
      {
        heading: 'Gladwin Ferdz I. Del Rosario',
        body: [
          'IT Service Desk Intern at Dayforce.',
          'Cloud-focused full-stack application developer.',
          'Bridging the gap across cloud infrastructure, software development, and IT operations.',
          '4th Year BS Computer Engineering Student — Specializing in Computer Networks Engineering at the Polytechnic University of the Philippines.',
        ],
        highlight: 'Currently surviving 3 AM thesis defense preparation — deployment is my least favorite part.',
      },
    ],
    visualCards: [
      {
        title: 'TECH TOOLBOX',
        tag: 'CORE STACK',
        items: [
          'Microsoft Azure',
          'Java',
          'React',
          'JavaScript',
          'TypeScript',
          'Dart / Flutter',
          'Cloud Infrastructure',
          'IT Operations',
        ],
      },
    ],
    speakerNotes: [
      "Hi, everyone, I'm Gladwin, an IT Service Desk Intern at Dayforce, and a cloud-focused full-stack application developer.",
      "My work typically sits right between cloud infrastructure, software development, and IT operations. I primarily work with cloud platforms, especially Microsoft Azure, and build applications using technologies like Java, React, JavaScript, TypeScript, Dart, and Flutter, among others.",
      "Outside of my day job, I spend a lot of time experimenting with new technologies, building projects, and getting into various technical shenanigans because apparently, working in IT all day just isn't quite enough.",
      "And right now, as a fourth-year Computer Engineering student at the Polytechnic University of the Philippines, I'm in the final stages of my thesis — which means I've been pulling a lot of late nights.",
    ],
  },
  {
    id: 'thesis-intro',
    title: 'AquaDflow / AquaSense',
    section: 'Introduction',
    type: 'architecture',
    motifBadge: 'thesis project',
    summary: 'Enterprise-grade IoT smart agriculture platform for precision Alternate Wetting and Drying (AWD) water management in rice paddies — reducing water consumption by up to 30%.',
    diagram: {
      nodes: [
        { id: 'lorawan',   label: 'LoRaWAN Nodes',    sublabel: 'field sensors',        type: 'source',  status: 'active' },
        { id: 'edge',      label: 'Edge Node',         sublabel: 'autonomous decisions',  type: 'compute', status: 'active' },
        { id: 'api',       label: 'Java Backend API',  sublabel: 'Spring Boot',           type: 'compute', status: 'active' },
        { id: 'ws',        label: 'WebSocket Stream',  sublabel: 'real-time events',      type: 'network', status: 'active' },
        { id: 'frontend',  label: 'Next.js Dashboard', sublabel: 'React / TypeScript',    type: 'compute', status: 'active' },
        { id: 'user',      label: 'Farm Operator',     sublabel: 'web browser',           type: 'user',    status: 'neutral' },
      ],
      edges: [
        { from: 'lorawan',  to: 'edge',     label: 'LoRa telemetry', animated: true },
        { from: 'edge',     to: 'api',      label: 'MQTT / HTTP',    animated: true },
        { from: 'api',      to: 'ws',       label: 'push events',    animated: true },
        { from: 'api',      to: 'frontend', label: 'REST',           animated: false },
        { from: 'ws',       to: 'frontend', label: 'live updates',   animated: true },
        { from: 'frontend', to: 'user',     label: 'dashboard UI',   animated: false },
      ],
    },
    highlights: [
      'Deploy: Next.js Dashboard → Azure Static Web Apps / App Service',
      'Deploy: Java API → Azure App Service / Container Apps / AKS',
      'Field-scoped security controls + centralized irrigation management',
    ],
    speakerNotes: [
      'So this is the system I need to deploy — AquaDflow and AquaSense, my thesis project.',
      'It is an IoT smart agriculture platform for precision water management in rice paddies using a technique called Alternate Wetting and Drying.',
      'LoRaWAN sensor nodes in the field send telemetry to an edge node that makes autonomous irrigation decisions.',
      'That edge node talks to a Java Spring Boot backend API, which pushes real-time events over WebSocket and serves REST data to the frontend.',
      'The frontend is a Next.js dashboard built with React and TypeScript — the farm operator sees everything here.',
      'So the deployment question is: where do I put the Next.js dashboard, and where do I put the Java API? That is exactly what this talk answers.',
    ],
  },
  {
    id: 'deployment-problem-statement',
    title: 'The Localhost Illusion',
    section: 'The Problem',
    type: 'statement',
    statement: 'It works on my machine. Now what?',
    subtitle: 'Code runs, tests pass, database connects... until we need real users.',
    motifBadge: 'localhost:8080',
    speakerNotes: [
      'We all know that feeling: The code works locally. Features work. Tests pass. Everything is green on localhost:8080.',
      'But here is my personal reality check: It is 3 AM, I am wrapping up the final stages of my thesis, and the question on my mind is — what deployment method do I use?',
      'You write the code, you test the features, everything works seamlessly locally, and then it is 5 AM and defense na mamaya: How do we actually put this out into the real world so people can use it without breaking?',
      'This is the single greatest hurdle in development — and it is the problem we are tackling today.',
    ],
  },
  {
    id: 'session-thesis',
    title: 'The Mission Today',
    section: 'Overview',
    type: 'section-header',
    sectionNumber: '01',
    description: 'Deconstructing Azure deployment options from raw VMs to managed serverless.',
    motifBadge: 'localhost -> azure',
    speakerNotes: [
      'So today, we are going to explore the different deployment methodologies we can use with Microsoft Azure!',
      'We will look at the spectrum of control versus convenience, starting from barebones virtual machines up to managed platforms and container orchestration.',
      'Because whether you are defending a thesis at 5 AM or shipping production software, the fundamentals are the same: you need a deployment strategy that actually works.',
    ],
  },
  {
    id: 'cloud-meme',
    title: 'The Cloud Reality',
    section: 'Overview',
    type: 'image',
    motifBadge: 'localhost -> azure',
    image: {
      src: '/assets/memes/cloudmeme1.png',
      alt: 'Cloud deployment meme',
    },
    speakerNotes: [
      'So today, we are going to explore the different deployment methodologies we can use with Microsoft Azure!',
      'We will look at the spectrum of control versus convenience, starting from barebones virtual machines up to managed platforms and container orchestration.',
      'Because whether you are defending a thesis at 5 AM or shipping production software, the fundamentals are the same: you need a deployment strategy that actually works.',
    ],
  },
];
