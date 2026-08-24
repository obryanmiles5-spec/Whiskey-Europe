'use client';

import { useEffect } from 'react';

/**
 * Tawk.to Live Chat Integration Component
 * Positions the livechat widget in the bottom-right corner across all pages.
 * Includes defensive polyfills for $_Tawk.i18next to prevent third-party runtime crashes.
 */
export default function TawkToChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Helper to create a resilient i18next function & object
    const createSafeI18n = () => {
      const fn = function (key: unknown) {
        return typeof key === 'string' ? key : '';
      };
      fn.t = function (key: string) {
        return key || '';
      };
      fn.init = function () {
        return fn;
      };
      fn.changeLanguage = function () {
        return Promise.resolve();
      };
      fn.use = function () {
        return fn;
      };
      fn.exists = function () {
        return true;
      };
      return fn;
    };

    // Ensure window.i18next exists as a fallback
    const windowAny = window as unknown as Record<string, unknown>;
    if (!windowAny.i18next) {
      windowAny.i18next = createSafeI18n();
    }

    // Intercept or ensure window.$_Tawk always has a valid i18next function
    try {
      let currentTawk = windowAny.$_Tawk as Record<string, unknown> | undefined;
      if (!currentTawk) {
        currentTawk = { i18next: createSafeI18n() };
        windowAny.$_Tawk = currentTawk;
      } else if (typeof currentTawk.i18next !== 'function') {
        currentTawk.i18next = createSafeI18n();
      }

      // Define property descriptor so future reassignments from Tawk scripts preserve i18next
      let internalTawkObj = currentTawk;
      Object.defineProperty(window, '$_Tawk', {
        configurable: true,
        enumerable: true,
        get() {
          return internalTawkObj;
        },
        set(val: unknown) {
          if (val && typeof val === 'object') {
            const obj = val as Record<string, unknown>;
            if (typeof obj.i18next !== 'function') {
              obj.i18next = createSafeI18n();
            }
            internalTawkObj = obj;
          } else {
            internalTawkObj = val as Record<string, unknown>;
          }
        },
      });
    } catch {
      // Ignore if Object.defineProperty is locked
    }

    // Global error listener to suppress benign third-party widget i18n crashes
    const handleGlobalError = (event: ErrorEvent) => {
      if (
        event.message &&
        (event.message.includes('$_Tawk') ||
          event.message.includes('i18next is not a function') ||
          event.message.includes('tawk.to'))
      ) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
        return true;
      }
    };
    window.addEventListener('error', handleGlobalError);

    // Check if script is already present
    const existingScript = document.getElementById('tawk-to-script');
    if (!existingScript) {
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
    }

    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  return null;
}

// Extend global window object for TypeScript safety
declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
    $_Tawk?: Record<string, unknown>;
  }
}

