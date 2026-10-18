export const destinations = [
  { id: 'about', path: '/about', title: 'About', detail: 'The engineer, background, and ideas behind the work.', color: '#35c9b9', dark: '#0c5260', kind: 'ocean' },
  { id: 'projects', path: '/projects', title: 'Work', detail: 'Projects, backend systems, and ML integration.', color: '#6daaff', dark: '#273e79', kind: 'gas' },
  { id: 'skills', path: '/skills', title: 'Skills', detail: 'The tools and practices I use to build.', color: '#ad91e7', dark: '#42376e', kind: 'rock' },
  { id: 'contact', path: '/contact', title: 'Contact', detail: 'Have an idea? Let’s start a conversation.', color: '#e6a976', dark: '#7b4a40', kind: 'desert' },
] as const;

export type SpaceDestination = (typeof destinations)[number];
