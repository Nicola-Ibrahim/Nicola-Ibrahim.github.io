export const destinations = [
  { id: 'about', path: '/about', title: 'About', detail: 'Background and approach.', color: '#35c9b9', dark: '#0c5260', kind: 'ocean' },
  { id: 'projects', path: '/projects', title: 'Work', detail: 'A project and the problem behind it.', color: '#6daaff', dark: '#273e79', kind: 'gas' },
  { id: 'skills', path: '/skills', title: 'Skills', detail: 'Tools used across software and data work.', color: '#ad91e7', dark: '#42376e', kind: 'rock' },
  { id: 'contact', path: '/contact', title: 'Contact', detail: 'Have a question or an idea? Let’s talk.', color: '#e6a976', dark: '#7b4a40', kind: 'desert' },
] as const;

export type SpaceDestination = (typeof destinations)[number];
