'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';
import { useHeroSpaceTransition } from './HeroSpaceTransition';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export default function TransitionLink({ href, onClick, ...props }: Props) {
  const { start } = useHeroSpaceTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.download || (props.target && props.target !== '_self')) return;
    if (new URL(href, window.location.href).pathname === window.location.pathname) return;

    event.preventDefault();
    start(href, 'page');
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
