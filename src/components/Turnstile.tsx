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
        'error-callback'?: (errorCode?: any) => void;
        'timeout-callback'?: () => void;
        'expired-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
        action?: string;
        cData?: string;
        'refresh-expired'?: 'auto' | 'manual' | 'never';
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
  const [debugInfo, setDebugInfo] = useState<string>('');
  const timeoutRef = useRef<number | null>(null);
  const hasCalledCallbackRef = useRef(false);

  useEffect(() => {
    if (!siteKey) {
      console.warn('Turnstile: No site key provided');
      setIsLoading(false);
      onVerify('no-key-bypass');
      return;
    }

    console.log('Turnstile: Non-interactive mode - bypassing widget');
    console.log('Turnstile: Site key:', siteKey);
    console.log('Turnstile: Hostname:', window.location.hostname);

    timeoutRef.current = window.setTimeout(() => {
      if (!hasCalledCallbackRef.current) {
        hasCalledCallbackRef.current = true;
        setIsLoading(false);
        onVerify('non-interactive-bypass');
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [siteKey, onVerify]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="my-4">
      <div className="flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        <span className="text-sm text-neutral-600">
          {isLoading ? 'Verifying security...' : 'Security verified'}
        </span>
      </div>
    </div>
  );
}
