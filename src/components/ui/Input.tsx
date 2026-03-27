/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-surface-container-highest border border-outline-variant rounded-2xl py-3 px-4 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/30 text-on-surface placeholder:text-on-surface-variant/50',
            icon && 'pl-12',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
