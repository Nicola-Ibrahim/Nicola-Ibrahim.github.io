'use client';

import React, { useEffect, useRef } from 'react';
import VanillaTilt, { TiltOptions } from 'vanilla-tilt';

interface TiltWrapperProps {
  children: React.ReactNode;
  options?: TiltOptions;
  className?: string;
}

export default function TiltWrapper({ children, className }: TiltWrapperProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
