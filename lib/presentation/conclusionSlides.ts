import { SlideData } from './types';

export const conclusionSlides: SlideData[] = [
  {
    id: 'conclusion-recap',
    title: 'Keep It Simple, Stupid',
    section: 'Conclusion',
    type: 'closing-takeaway',
    motifBadge: 'KISS',
    takeaways: [
      {
        title: "Don't add complexity just because you can.",
        description:
          'Every layer of control you take on is a layer you are responsible for patching, monitoring, and maintaining.',
      },
      {
        title: 'Start simple, deploy, learn, and scale.',
        description: 'Scale when you actually need to — not before, and not because it sounds impressive.',
      },
    ],
    speakerNotes: [
      'So, as we wrap up today, let us go back to the problem we started with.',
      'Your application works. It works on your machine. It works on localhost:8080.',
      'But, you need to deploy it ASAP.',
      'Azure gives us different deployment options, from Virtual Machines, App Service to Functions, Containers, and Kubernetes.',
      'But, let me tell you a secret.',
      'The important thing in deployment is not to choose the most complicated or maybe tech-savvy option.',
      'Keep It Simple, Stupid.',
      'Choose the deployment method based on your application needs, your team capabilities, and how much infrastructure you actually need to manage.',
      "Don't add complexity just because you can.",
      'Start simple, deploy, learn, and scale when you actually need to.',
    ],
  },

  {
    id: 'conclusion-punchline',
    title: 'Final Thought',
    section: 'Conclusion',
    type: 'statement',
    motifBadge: 'localhost:8080',
    statement: "Get your application off localhost:8080, for god's sake.",
    subtitle: 'It works on your machine. Now make it work for everyone else.',
    speakerNotes: [
      'And most importantly:',
      "Get your application off localhost:8080, for god's sake.",
    ],
  },
];
