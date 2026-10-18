'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './FlightVeil.module.css';

export default function FlightVeil({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={styles.veil}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.78,
        delay: active && !reducedMotion ? 0.32 : 0,
        ease: [0.22, 0.65, 0.15, 1],
      }}
    />
  );
}
