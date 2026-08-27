'use client';

import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Integration Component
 * Positions the livechat widget in the bottom-right corner across all pages.
 * Handles graceful loading and prevents uncaught third-party logging errors.
 */
export default function TawkToChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if script is already injected
    if (document.getElementById('tawk-to-script')) {
      return;
    }

    // Suppress third-party cross-origin / widget script noise
    const handleGlobalError = (event: ErrorEvent) => {
      const msg = event?.message || '';
      if (
        typeof msg === 'string' &&
        (msg.includes('tawk') ||
          msg.includes('Tawk') ||
          msg.includes('i18next') ||
          msg.includes('$_Tawk'))
      ) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
        return true;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reasonStr = String(event?.reason || '');
      if (reasonStr.includes('tawk') || reasonStr.includes('Tawk')) {
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    try {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      const propertyId =
        process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || '6a23a2d4a48b111c34b6ad85';
      const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || 'default';

      const s1 = document.createElement('script');
      s1.id = 'tawk-to-script';
      s1.async = true;
      s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');

      s1.onerror = () => {
        // Silently handle widget load failure (e.g. adblock or invalid key)
        console.warn('Live chat widget could not be loaded.');
      };

      const s0 = document.getElementsByTagName('script')[0];
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.head.appendChild(s1);
      }
    } catch {
      // Graceful fallback if DOM script insertion is blocked
    }

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
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

