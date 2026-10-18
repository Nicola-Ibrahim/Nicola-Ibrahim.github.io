'use client';

import Link from 'next/link';
import { type MouseEvent } from 'react';
import type { SpaceDestination } from './spaceDestinations';
import { useHeroSpaceTransition } from './HeroSpaceTransition';

export default function PlanetReturnLink({ planetId }: { planetId: SpaceDestination['id'] }) {
  const { start } = useHeroSpaceTransition();
  const href = `/explore?planet=${planetId}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    start(href, 'returnPlanet');
  };

  return <Link href={href} onClick={handleClick} className="return-link return-link--page"><span aria-hidden="true">←</span> Back to space</Link>;
}
