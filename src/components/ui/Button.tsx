/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-lg shadow-primary/10',
      secondary: 'bg-secondary-container text-on-secondary hover:bg-secondary/20',
      tertiary: 'bg-tertiary text-on-tertiary hover:bg-tertiary-container',
      outline: 'border border-outline text-on-surface hover:bg-surface-container-highest',
      ghost: 'text-on-surface hover:bg-surface-container-highest',
      error: 'bg-error text-on-error hover:bg-error-container',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-xl',
      md: 'px-5 py-2.5 text-sm font-medium rounded-2xl',
      lg: 'px-8 py-4 text-base font-semibold rounded-3xl',
      icon: 'p-2 rounded-full',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);
