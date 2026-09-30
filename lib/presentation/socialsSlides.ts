import { SlideData } from './types';

export const socialsSlides: SlideData[] = [
  {
    id: 'socials-connect',
    title: 'Let’s Stay Connected',
    section: 'Closing',
    type: 'socials',
    motifBadge: 'find me online',
    headline: 'Thank you so much, everyone!',
    subline: 'Here are my socials if you want to talk more or have any more questions. Scan a code or click a card.',
    speaker: {
      src: '/assets/headshot.JPG',
      alt: 'Gladwin Ferdz I. Del Rosario',
      name: 'Gladwin Ferdz I. Del Rosario',
      titles: [
        'IT Service Desk Intern — Dayforce',
        'Cloud-Focused Full-Stack Developer',
        'BS CpE — Computer Networks Engineering',
        'Polytechnic University of the Philippines',
      ],
    },
    socials: [
      {
        id: 'bio-link',
        label: 'Bio Link',
        handle: '@gladwin_dr',
        url: 'https://bio.link/gladwin_dr',
        qrSrc: '/assets/qr/bio-link.svg',
        icon: 'link',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        handle: '/in/gladwindr',
        url: 'https://www.linkedin.com/in/gladwindr/',
        qrSrc: '/assets/qr/linkedin.svg',
        icon: 'linkedin',
      },
      {
        id: 'facebook',
        label: 'Facebook',
        handle: '/gfdelrosario0402',
        url: 'https://www.facebook.com/gfdelrosario0402/',
        qrSrc: '/assets/qr/facebook.svg',
        icon: 'facebook',
      },
      {
        id: 'portfolio',
        label: 'Portfolio',
        handle: 'glides-dev.vercel.app',
        url: 'https://glides-dev.vercel.app/',
        qrSrc: '/assets/qr/portfolio.svg',
        icon: 'globe',
      },
    ],
    presentation: {
      label: 'This Presentation',
      url: 'https://azuredeployments-gladwindr.vercel.app/',
      qrSrc: '/assets/qr/presentation.svg',
    },
    speakerNotes: [
      'Thank you so much, everyone!',
      'Here are my socials if you want to talk more or have any more questions.',
      'My bio link, LinkedIn, Facebook, and my portfolio are all on screen — scan the QR codes or just click any of the cards.',
      'And if you want to revisit this deck later, scan the last code for the live version of this presentation.',
    ],
  },
];
