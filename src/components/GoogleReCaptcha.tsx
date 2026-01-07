import React, { useEffect, useRef } from "react";

interface GoogleReCaptchaProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: string | HTMLElement, parameters: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
      }) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

const GoogleReCaptcha: React.FC<GoogleReCaptchaProps> = ({ onVerify, onError, onExpire }) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      console.warn("reCAPTCHA site key not configured");
      return;
    }

    const loadRecaptchaScript = () => {
      if (document.getElementById("recaptcha-script")) {
        return;
      }

      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.grecaptcha && recaptchaRef.current && !widgetIdRef.current) {
          window.grecaptcha.ready(() => {
            widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current!, {
              sitekey: siteKey,
              callback: onVerify,
              'error-callback': onError,
              'expired-callback': onExpire,
            });
          });
        }
      };
    };

    if (window.grecaptcha) {
      if (recaptchaRef.current && !widgetIdRef.current) {
        window.grecaptcha.ready(() => {
          widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current!, {
            sitekey: siteKey,
            callback: onVerify,
            'error-callback': onError,
            'expired-callback': onExpire,
          });
        });
      }
    } else {
      loadRecaptchaScript();
    }

    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {
          console.error("Error resetting reCAPTCHA:", e);
        }
      }
    };
  }, [siteKey, onVerify, onError, onExpire]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div ref={recaptchaRef}></div>
    </div>
  );
};

export default GoogleReCaptcha;
