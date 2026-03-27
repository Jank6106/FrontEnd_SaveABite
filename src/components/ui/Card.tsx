"use client";

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outline' | 'highest';
  hover?: boolean;
  key?: React.Key;
}

export const Card = ({ children, className, variant = 'default', hover = true }: CardProps) => {
  const variants = {
    default: 'bg-surface-container-low',
    glass: 'glass-panel',
    outline: 'border border-outline-variant bg-transparent',
    highest: 'bg-surface-container-highest',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-3xl overflow-hidden transition-shadow',
        variants[variant],
        hover && 'hover:shadow-2xl hover:shadow-primary/5',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
