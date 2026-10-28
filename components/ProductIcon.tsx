import React from 'react';
import { ProductIconType } from '@/types/catalog';

interface ProductIconProps {
  name: ProductIconType;
  className?: string;
  size?: number;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ name, className = '', size = 48 }) => {
  switch (name) {
    case 'mask':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <path d="M5 17c0-3 2-5 5-5h28c3 0 5 2 5 5v7c0 5-4 8-9 8h-2.5c-2 0-3-1-4-3-.6-1.1-1.6-1.6-3-1.6s-2.4.5-3 1.6-1 2-2 3-4 3H14c-5 0-9-3-9-8z" />
          <path d="M24 12v9M12 18v5M36 18v5" />
        </svg>
      );
    case 'snorkel':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <path d="M33 5v28a10 10 0 0 1-20 0v-3" />
          <path d="M29 10h8" />
          <rect x="7" y="25" width="12" height="7" rx="3.5" />
        </svg>
      );
    case 'fins':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <path d="M4 17c0-3 2-5 5-5h5c2 0 3 1 3 3v1c9 0 19 3 27 6v6H8c-3 0-4-2-4-4z" />
          <path d="M17 21h26M17 27h26" />
        </svg>
      );
    case 'wetsuit':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <path d="M19 4l-10 5-5 16 6 2 5-11v27h6V28h2v15h6V16l5 11 6-2-5-16-10-5c-1 3-3 5-6 5s-5-2-6-5z" />
          <path d="M24 9v8" />
        </svg>
      );
    case 'belt':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <rect x="3" y="17" width="42" height="14" rx="4" />
          <rect x="19" y="14" width="10" height="20" rx="2.5" />
          <rect x="7" y="21" width="8" height="6" rx="1.5" />
          <rect x="33" y="21" width="8" height="6" rx="1.5" />
        </svg>
      );
    case 'neck':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <path d="M11 8c0 15 5.5 25 13 25s13-10 13-25" />
          <rect x="19.5" y="31" width="9" height="12" rx="2.5" />
          <path d="M17 8c0 8 3 13 7 13s7-5 7-13" />
        </svg>
      );
    case 'knife':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <path d="M10 38L34 8c2 1 4 3 5 5L18 42z" />
          <path d="M12 34l5 5" />
          <circle cx="9" cy="41" r="3" />
        </svg>
      );
    case 'buoy':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <ellipse cx="24" cy="29" rx="13" ry="9" />
          <path d="M24 20V5l11 4.5L24 14" />
          <path d="M5 42c4-3 8-3 12 0s8 3 12 0 8-3 12 0" />
        </svg>
      );
    case 'watch':
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          width={size}
          height={size}
        >
          <rect x="13" y="12" width="22" height="24" rx="7" />
          <path d="M18 12l2-7h8l2 7M18 36l2 7h8l2-7" />
          <path d="M24 18v7l4.5 3" />
        </svg>
      );
    default:
      return null;
  }
};
