import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 *
 * @example
 * cn('px-4 py-2', 'px-6') // => 'py-2 px-6'
 * cn('bg-red-500', condition && 'bg-blue-500') // conditional classes
 * cn('text-sm', ['font-bold', 'text-gray-500']) // array support
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
