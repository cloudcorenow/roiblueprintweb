import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

type TurnstileErrorCode =
  | 'internal-error'
  | 'network-error'
  | 'browser-error'
  | 'timeout-or-duplicate'
  | 'invalid-input-response'
  | string;

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement | string, options: {
        sitekey: string;
        callback: (token: string) => void;
        'error-callback'?: (errorCode?: TurnstileErrorCode) => void;
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
  const [hasError, setHasError] = useState(false);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      console.warn('Turnstile: No site key provided. Widget will not be rendered.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => {
          if (!isMounted) return;
          setIsLoading(false);
          setHasError(false);
          onVerify(token);
        },
        'error-callback': () => {
          if (!isMounted) return;
          setHasError(true);
          setIsLoading(false);
          onError?.();
        },
        'timeout-callback': () => {
          if (!isMounted) return;
          setHasError(true);
          setIsLoading(false);
          onError?.();
        },
        'expired-callback': () => {
          if (!isMounted) return;
          setIsLoading(false);
          onExpire?.();
        },
        theme: 'light',
        'refresh-expired': 'auto',
      });
    };

    const scriptId = 'cf-turnstile-script';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    const handleScriptLoad = () => {
      if (!isMounted) return;
      renderWidget();
    };

    const handleScriptError = () => {
      if (!isMounted) return;
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };

    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener('load', handleScriptLoad);
      existingScript.addEventListener('error', handleScriptError);
    } else {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', handleScriptLoad);
      script.addEventListener('error', handleScriptError);
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      const script = document.getElementById(scriptId);
      if (script) {
        script.removeEventListener('load', handleScriptLoad);
        script.removeEventListener('error', handleScriptError);
      }

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onError, onExpire]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="my-4">
      <div ref={containerRef} />
      <div className="mt-2 flex items-center justify-center gap-2">
        <ShieldCheck className={`w-4 h-4 ${hasError ? 'text-red-600' : 'text-green-600'}`} />
        <span className="text-sm text-neutral-600">
          {hasError
            ? 'Security verification failed'
            : isLoading
            ? 'Verifying security...'
            : 'Security verified'}
        </span>
      </div>
    </div>
  );
}
