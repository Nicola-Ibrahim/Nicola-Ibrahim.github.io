import type { ReactNode } from 'react';
import SpacePageShell from './SpacePageShell';
import type { SpaceDestination } from './spaceDestinations';

export default function PortfolioSubpage({ children, planetId }: { children: ReactNode; planetId: SpaceDestination['id'] }) {
  return <SpacePageShell world={planetId}>{children}</SpacePageShell>;
}
