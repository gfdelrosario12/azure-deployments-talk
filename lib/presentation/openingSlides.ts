import { SlideData } from './types';

export const openingSlides: SlideData[] = [
  {
    id: 'opening-title',
    title: 'Still on localhost:8080? Not Anymore!',
    section: 'Introduction',
    type: 'statement',
    statement: 'Still on localhost:8080? Not Anymore!',
    subtitle: 'Exploring Modern Deployment Methodologies with Microsoft Azure',
    motifBadge: 'localhost:8080',
    speakerNotes: [
      'Welcome everyone! Look at your terminal or browser right now. How many of you currently have an application running happily on localhost:8080?',
      'Today, we are going on a journey from that cozy local development environment all the way to resilient, scalable cloud architectures on Microsoft Azure.',
    ],
  },
  {
    id: 'speaker-intro',
    title: 'Meet the Speaker',
    section: 'Introduction',
    type: 'text-visual',
    motifBadge: 'gladwin@dev',
    contentBlocks: [
      {
        heading: 'Gladwin',
        body: [
          'IT Service Desk Intern at Dayforce by day.',
          'Cloud-focused full-stack application developer by night.',
          'Bridging the gap between cloud infrastructure, software development, and IT operations.',
        ],
        highlight: 'Passionate about cloud architecture, developer tooling, and technical shenanigans.',
      },
    ],
    visualCards: [
      {
        title: 'TECH TOOLBOX',
        tag: 'CORE SKILLS',
        items: [
          'Microsoft Azure',
          'Java',
          'Spring Boot',
          'React',
          'TypeScript',
          'JavaScript',
          'Dart / Flutter',
          'Docker',
        ],
      },
    ],
    speakerNotes: [
      "Hi, everyone, I’m Gladwin, an IT Service Desk Intern at Dayforce by day, and a cloud-focused full-stack application developer by night.",
      "I love working at the intersection of infrastructure, software engineering, and operations—experimenting with Microsoft Azure, Java, React, TypeScript, Flutter, and whatever new technology catches my eye.",
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
      'Eventually, our application has to reach real users. And that is where deployment becomes the difficult part.',
      'How do we actually put this out into the real world so people can use it without breaking?',
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
    ],
  },
];
