'use client';

import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Integration Component
 * Positions the livechat widget in the bottom-right corner across all pages.
 */
export default function TawkToChat() {
  useEffect(() => {
    // Prevent duplicate script injection
    if (typeof window === 'undefined') return;

    // Check if script is already present
    const existingScript = document.getElementById('tawk-to-script');
    if (existingScript) return;

    // Initialize Tawk API global variables
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.id = 'tawk-to-script';
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6a23a2d4a48b111c34b6ad85/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  }, []);

  return null;
}

// Extend global window object for TypeScript safety
declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}
