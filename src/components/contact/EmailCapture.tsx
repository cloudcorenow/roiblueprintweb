import React from "react";
import { ArrowLeft, ArrowRight, Mail, AlertTriangle } from "lucide-react";

interface EmailCaptureProps {
  onSuccess: () => void;
  onBack: () => void;
}

const EmailCapture: React.FC<EmailCaptureProps> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await Promise.all([
        fetch("/api/guide-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            guide_name: "prequalification-assessment",
          }),
        }),
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            firstName: email.split("@")[0],
            lastName: "",
            message: "Prequalification assessment request",
            formType: "guide",
          }),
        }),
      ]);

      setTimeout(() => {
        onSuccess();
      }, 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(errorMessage);
      console.error("Error saving email:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = /\S+@\S+\.\S+/.test(email);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-neutral-800">Enter Your Email</h4>
          <p className="text-sm text-neutral-600">Get instant access to your assessment</p>
        </div>
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-all duration-300 flex items-center justify-center"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-primary-50 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
          <div className="text-sm text-primary-800">
            <p className="font-semibold mb-1">Why we need your email:</p>
            <ul className="list-disc list-inside space-y-1 text-primary-700">
              <li>Receive your personalized assessment results</li>
              <li>Get follow-up resources tailored to your needs</li>
              <li>Stay updated on optimization opportunities</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@practice.com"
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          <p className="text-xs text-neutral-500 mt-1">
            We'll send your assessment results and next steps instantly.
          </p>
          {error && (
            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValidEmail}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin inline-block mr-2">⏳</span>
              Sending...
            </>
          ) : (
            <>
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EmailCapture;
