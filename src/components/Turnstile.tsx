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
      console.warn('Turnstile: No site key provided');
      setIsLoading(false);
      return;
    }

    console.log('Turnstile: Initializing with site key:', siteKey);

    const loadTurnstile = () => {
      if (!containerRef.current) {
        console.error('Turnstile: Container ref not available');
        return;
      }

      if (!window.turnstile) {
        console.error('Turnstile: API not loaded');
        setError('Turnstile API not loaded');
        setIsLoading(false);
        return;
      }

      if (widgetIdRef.current) {
        console.log('Turnstile: Widget already rendered');
        return;
      }

      try {
        console.log('Turnstile: Rendering widget...');
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            console.log('Turnstile: Success, token received');
            setIsLoading(false);
            setError(null);
            onVerify(token);
          },
          'error-callback': (errorCode?: string) => {
            console.error('Turnstile: Error callback triggered', errorCode);
            setError('Verification failed');
            setIsLoading(false);
            onError?.();
          },
          'expired-callback': () => {
            console.warn('Turnstile: Token expired');
            setIsLoading(true);
            setError(null);
            onExpire?.();
          },
          theme: 'light',
          size: 'normal',
        });
        console.log('Turnstile: Widget rendered with ID:', widgetIdRef.current);
        setIsLoading(false);
      } catch (err) {
        console.error('Turnstile: Render error:', err);
        setError('Failed to load security verification');
        setIsLoading(false);
      }
    };

    const checkTurnstile = () => {
      if (window.turnstile) {
        loadTurnstile();
      } else {
        console.log('Turnstile: API not ready, waiting...');
        setTimeout(checkTurnstile, 100);
      }
    };

    checkTurnstile();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          console.log('Turnstile: Removing widget', widgetIdRef.current);
          window.turnstile.remove(widgetIdRef.current);
        } catch (err) {
          console.error('Turnstile: Error removing widget:', err);
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onError, onExpire]);

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
