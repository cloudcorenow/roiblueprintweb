import React, { useState } from 'react';
import { X, Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface GuideAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  guideName?: string;
  guideTitle?: string;
}

export default function GuideAccessModal({
  isOpen,
  onClose,
  onSuccess,
  guideName = 'rd-tax-credit',
  guideTitle = 'R&D Tax Credit Complete Guide'
}: GuideAccessModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/guide-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          guide_name: guideName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save email');
      }

      console.log('Guide Access Email Submitted:', { email, guide_name: guideName });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Error saving email:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setEmail('');
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Thank You!</h3>
            <p className="text-neutral-600">
              Opening your guide now...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Access Your Free Guide
              </h2>
              <p className="text-neutral-600">
                Enter your email to access the <strong>{guideTitle}</strong> and stay updated with our latest insights.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                  className="form-input w-full disabled:opacity-50"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#ade5f8', color: '#004aad' }}
              >
                {isSubmitting ? 'Submitting...' : 'Access Guide'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <p className="text-xs text-neutral-500 text-center">
                We respect your privacy. Your email will only be used to send you valuable insights and updates.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
