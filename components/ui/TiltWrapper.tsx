'use client';

import React, { useEffect, useRef } from 'react';
import VanillaTilt, { TiltOptions } from 'vanilla-tilt';

interface TiltWrapperProps {
  children: React.ReactNode;
  options?: TiltOptions;
  className?: string;
}

export default function TiltWrapper({ children, options, className }: TiltWrapperProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const defaultOptions: TiltOptions = {
    max: 10,
    speed: 400,
    glare: true,
    'max-glare': 0.2,
    scale: 1.02,
  };

  useEffect(() => {
    const node = tiltRef.current;
    if (node) {
      VanillaTilt.init(node, { ...defaultOptions, ...options });
    }
    return () => {
      // @ts-ignore - vanilla-tilt adds a vanillaTilt property to the element
      if (node && node.vanillaTilt) {
        // @ts-ignore
        node.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
}
