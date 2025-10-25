import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement | string, options: {
        sitekey: string;
        callback: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function Turnstile({ onVerify, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      setIsLoading(false);
      return;
    }

    const loadTurnstile = () => {
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              setIsLoading(false);
              onVerify(token);
            },
            'error-callback': () => {
              setError('Verification failed');
              setIsLoading(false);
              onError?.();
            },
            'expired-callback': () => {
              setIsLoading(true);
              onExpire?.();
            },
            theme: 'light',
            size: 'normal',
          });
          setIsLoading(false);
        } catch (err) {
          console.error('Turnstile render error:', err);
          setError('Failed to load security verification');
          setIsLoading(false);
        }
      }
    };

    if (window.turnstile) {
      loadTurnstile();
    } else {
      const existingScript = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');

      if (existingScript) {
        existingScript.addEventListener('load', loadTurnstile);
      } else {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.defer = true;
        script.onload = loadTurnstile;
        script.onerror = () => {
          setError('Failed to load security verification');
          setIsLoading(false);
        };
        document.head.appendChild(script);
      }
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (err) {
          console.error('Error removing Turnstile widget:', err);
        }
        widgetIdRef.current = null;
      }
    };
  }, [onVerify, onError, onExpire]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="my-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <ShieldCheck className="w-4 h-4 text-primary-600" />
        <span className="text-sm font-medium text-neutral-700">Security Verification</span>
      </div>
      <div ref={containerRef} className="flex justify-center min-h-[65px]" />
      {isLoading && (
        <div className="text-center text-sm text-neutral-500">
          Loading verification...
        </div>
      )}
      {error && (
        <div className="text-center text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
