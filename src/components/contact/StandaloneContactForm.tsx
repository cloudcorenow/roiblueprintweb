import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Turnstile from "../Turnstile";
import { ContactFormData, ContactFormErrors } from "../../types/contact";
import { validateContactForm } from "../../utils/contactValidation";

const StandaloneContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    industry: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<ContactFormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [botField, setBotField] = React.useState("");
  const [turnstileToken, setTurnstileToken] = React.useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botField) return;

    const hasTurnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (hasTurnstileKey && !turnstileToken) {
      setErrors({ message: "Please complete the security verification" } as ContactFormErrors);
      return;
    }

    const validation = validateContactForm(formData);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    try {
      setSubmitting(true);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: "contact",
          turnstileToken,
          honeypot: botField,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to send email" }));
        throw new Error(errorData.error || "Failed to send email");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", company: "", industry: "", message: "" });
      setTurnstileToken("");
    } catch (err) {
      console.error("Form submission error:", err);
      const message = err instanceof Error ? err.message : "There was an error submitting your form. Please try again.";
      setErrors({ message } as ContactFormErrors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {success && (
        <div className="rounded-xl border border-success-200 bg-success-50 p-4 text-success-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <div>
              <p className="font-medium text-sm">Message sent successfully!</p>
              <p className="text-xs text-success-700">We'll contact you within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="hidden">
          <input
            name="company_website"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="standalone-name" className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="standalone-name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            {errors.name && <p className="text-xs text-error-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="standalone-email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="standalone-email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            {errors.email && <p className="text-xs text-error-600 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="standalone-company" className="block text-sm font-medium text-neutral-700 mb-2">
            Practice Name *
          </label>
          <input
            type="text"
            id="standalone-company"
            name="company"
            required
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          {errors.company && <p className="text-xs text-error-600 mt-1">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="standalone-industry" className="block text-sm font-medium text-neutral-700 mb-2">
            Practice Type *
          </label>
          <select
            id="standalone-industry"
            name="industry"
            required
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          >
            <option value="">Select your practice type</option>
            <option value="aba">ABA Practice</option>
            <option value="medical">Medical Practice</option>
            <option value="dental">Dental Practice</option>
            <option value="other">Other Healthcare</option>
          </select>
          {errors.industry && <p className="text-xs text-error-600 mt-1">{errors.industry}</p>}
        </div>

        <div>
          <label htmlFor="standalone-message" className="block text-sm font-medium text-neutral-700 mb-2">
            Message *
          </label>
          <textarea
            id="standalone-message"
            name="message"
            required
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm resize-none"
          />
          {errors.message && <p className="text-xs text-error-600 mt-1">{errors.message}</p>}
        </div>

        <Turnstile
          onVerify={setTurnstileToken}
          onError={() => setErrors({ message: "Verification failed. Please try again." } as ContactFormErrors)}
          onExpire={() => setTurnstileToken("")}
        />

        <button
          type="submit"
          disabled={submitting || (import.meta.env.VITE_TURNSTILE_SITE_KEY && !turnstileToken)}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <span className="animate-spin inline-block mr-2">⏳</span>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="ml-2 w-4 h-4 inline" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StandaloneContactForm;
