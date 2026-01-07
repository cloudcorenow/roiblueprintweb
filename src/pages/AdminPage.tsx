// src/pages/AdminPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Mail,
  Trash2,
  LogOut,
  RefreshCw,
  Shield,
  AlertTriangle,
  Send
} from "lucide-react";
import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";
import BlogAdmin from "../components/BlogAdmin";
import { useAuth } from "../contexts/AuthContext";

interface GuideAccessEmail {
  id: string;
  email: string;
  guide_name: string;
  access_count: number;
  created_at: string;
  last_accessed_at: string;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

interface FormSubmission {
  id: string;
  email: string;
  form_type: string;
  ip_address: string;
  submission_count: number;
  last_submission_at: string;
  created_at: string;
  is_blocked: boolean;
}

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Los_Angeles",
    timeZoneName: "short"
  });
};

export default function AdminPage() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const [emails, setEmails] = useState<GuideAccessEmail[]>([]);
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingReminders, setSendingReminders] = useState(false);
  const [reminderMessage, setReminderMessage] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    await Promise.all([loadEmails(), loadSubscriptions(), loadFormSubmissions()]);
    setLoading(false);
  };

  const loadEmails = async () => {
    try {
      const response = await fetch("/api/guide-access");
      if (response.ok) {
        const data = await response.json();
        setEmails(data);
      }
    } catch (err) {
      console.error("Error loading guide access emails:", err);
      setError("Failed to load guide access emails");
    }
  };

  const loadSubscriptions = async () => {
    try {
      const response = await fetch("/api/newsletter");
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      }
    } catch (err) {
      console.error("Error loading newsletter subscriptions:", err);
      setError("Failed to load newsletter subscriptions");
    }
  };

  const loadFormSubmissions = async () => {
    try {
      const response = await fetch("/api/form-submissions");
      if (response.ok) {
        const data = await response.json();
        setFormSubmissions(data);
      }
    } catch (err) {
      console.error("Error loading form submissions:", err);
      setError("Failed to load form submissions");
    }
  };

  const prequalificationEmails = emails.filter((e) => e.guide_name === "prequalification-assessment");
  const guideDownloadEmails = emails.filter((e) => e.guide_name !== "prequalification-assessment");

  const handleDownloadPrequalification = () => {
    const text = prequalificationEmails
      .map(
        (e) =>
          `${e.email} | Access Count: ${e.access_count} | First Submitted: ${formatDateTime(
            e.created_at
          )} | Last Accessed: ${formatDateTime(e.last_accessed_at)}`
      )
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prequalification-emails-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    const text = guideDownloadEmails
      .map(
        (e) =>
          `${e.email} | Guide: ${e.guide_name} | Access Count: ${e.access_count} | Created: ${formatDateTime(
            e.created_at
          )}`
      )
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guide-access-emails-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSubscriptions = () => {
    const text = subscriptions
      .map((s) => `${s.email} | Source: ${s.source} | Subscribed: ${formatDateTime(s.created_at)}`)
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteGuideAccess = async (id: string) => {
    if (!confirm("Are you sure you want to delete this email?")) return;

    try {
      const response = await fetch(`/api/guide-access?id=${id}`, { method: "DELETE" });

      if (response.ok) {
        await loadEmails();
      } else {
        setError("Failed to delete email");
      }
    } catch (err) {
      console.error("Error deleting email:", err);
      setError("Failed to delete email");
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return;

    try {
      const response = await fetch(`/api/newsletter?id=${id}`, { method: "DELETE" });

      if (response.ok) {
        await loadSubscriptions();
      } else {
        setError("Failed to delete subscription");
      }
    } catch (err) {
      console.error("Error deleting subscription:", err);
      setError("Failed to delete subscription");
    }
  };

  const handleToggleBlock = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/form-submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_blocked: !currentStatus })
      });

      if (response.ok) {
        await loadFormSubmissions();
      } else {
        setError("Failed to update block status");
      }
    } catch (err) {
      console.error("Error updating block status:", err);
      setError("Failed to update block status");
    }
  };

  const handleDeleteFormSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this form submission record?")) return;

    try {
      const response = await fetch(`/api/form-submissions?id=${id}`, { method: "DELETE" });

      if (response.ok) {
        await loadFormSubmissions();
      } else {
        setError("Failed to delete form submission");
      }
    } catch (err) {
      console.error("Error deleting form submission:", err);
      setError("Failed to delete form submission");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleSendReminders = async () => {
    if (!confirm("Send reminder emails to all users who started but didn't finish the assessment?")) return;

    setSendingReminders(true);
    setReminderMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/send-assessment-reminders", { method: "POST" });
      const result = await response.json();

      if (response.ok) {
        setReminderMessage(result.message || `Successfully sent ${result.details?.sent || 0} reminder emails`);
        await loadData();
      } else {
        setError(result.error || "Failed to send reminders");
      }
    } catch (err) {
      console.error("Error sending reminders:", err);
      setError("Failed to send reminders");
    } finally {
      setSendingReminders(false);
    }
  };

  const pageTitle = "Admin Dashboard | ROI Blueprint";
  const pageDescription =
    "ROI Blueprint admin dashboard for managing guide access, prequalification leads, newsletter subscriptions, and form security.";

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/admin"
        ogType="website"
        noIndex
      />

      {/* Admin pages usually should not be indexed; WebPage schema is optional */}
      <StructuredData
        type="webpage"
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageUrl="/admin"
      />

      <div className="container" style={{ marginBottom: "3rem" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
            <p className="text-sm text-neutral-600 mt-1">Logged in as: {user?.email}</p>
          </div>
          <button onClick={handleSignOut} className="btn btn-outline flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {error && (
          <div className="card mb-6 bg-red-50 border-red-200">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {reminderMessage && (
          <div className="card mb-6 bg-green-50 border-green-200">
            <p className="text-green-800">{reminderMessage}</p>
          </div>
        )}

        {/* Prequalification */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-success-600" />
              <h2 className="text-2xl font-bold">Prequalification Submissions</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={loadData} className="btn btn-outline flex items-center gap-2" disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                onClick={handleSendReminders}
                className="btn btn-success flex items-center gap-2"
                disabled={sendingReminders || loading}
              >
                <Send className={`w-4 h-4 ${sendingReminders ? "animate-pulse" : ""}`} />
                {sendingReminders ? "Sending..." : "Send Reminders"}
              </button>
              {prequalificationEmails.length > 0 && (
                <button
                  onClick={handleDownloadPrequalification}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download as Text
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-neutral-500">
              <RefreshCw className="w-8 h-8 mx-auto mb-3 text-neutral-300 animate-spin" />
              <p>Loading...</p>
            </div>
          ) : prequalificationEmails.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <Mail className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p>No prequalification submissions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-neutral-600 mb-4">
                Total submissions: <strong>{prequalificationEmails.length}</strong>
              </p>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {prequalificationEmails.map((entry) => (
                  <div key={entry.id} className="p-4 bg-success-50 rounded-lg border border-success-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900">{entry.email}</p>
                        <p className="text-sm text-success-700 font-semibold">Prequalification Assessment</p>
                        <p className="text-xs text-neutral-500 mt-1">
                          Started {entry.access_count} time{entry.access_count > 1 ? "s" : ""}
                        </p>
                      </div>

                      <div className="text-right flex items-start gap-3">
                        <div>
                          <p className="text-xs text-neutral-500">First: {formatDateTime(entry.created_at)}</p>
                          <p className="text-xs text-neutral-500">Last: {formatDateTime(entry.last_accessed_at)}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteGuideAccess(entry.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-100 rounded"
                          title="Delete email"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-success-50 rounded-lg border border-success-200">
            <p className="text-sm text-success-800">
              <strong>Status:</strong> Prequalification emails are captured when prospects start the assessment process.
              Use the "Send Reminders" button to email users who started but didn't finish (only sends to those who started 1+ hours ago and haven't received a reminder in 24 hours).
            </p>
          </div>
        </div>

        {/* Guide Access */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold">Guide Access Emails</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={loadData} className="btn btn-outline flex items-center gap-2" disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              {guideDownloadEmails.length > 0 && (
                <button onClick={handleDownload} className="btn btn-primary flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download as Text
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-neutral-500">
              <RefreshCw className="w-8 h-8 mx-auto mb-3 text-neutral-300 animate-spin" />
              <p>Loading...</p>
            </div>
          ) : guideDownloadEmails.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <Mail className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p>No guide download submissions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-neutral-600 mb-4">
                Total submissions: <strong>{guideDownloadEmails.length}</strong>
              </p>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {guideDownloadEmails.map((entry) => (
                  <div key={entry.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900">{entry.email}</p>
                        <p className="text-sm text-neutral-600">Guide: {entry.guide_name}</p>
                        <p className="text-xs text-neutral-500 mt-1">Access count: {entry.access_count}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <p className="text-xs text-neutral-500">{formatDateTime(entry.created_at)}</p>
                        <button
                          onClick={() => handleDeleteGuideAccess(entry.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-100 rounded"
                          title="Delete email"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Status:</strong> Guide access emails are stored in the D1 database and synced automatically.
            </p>
          </div>
        </div>

        {/* Form Submission Security */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-error-600" />
              <h2 className="text-2xl font-bold">Form Submission Security</h2>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-neutral-500">
              <RefreshCw className="w-8 h-8 mx-auto mb-3 text-neutral-300 animate-spin" />
              <p>Loading...</p>
            </div>
          ) : formSubmissions.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <Shield className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p>No form submissions tracked yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-neutral-600 mb-4">
                Total tracked: <strong>{formSubmissions.length}</strong> | Blocked:{" "}
                <strong className="text-error-600">
                  {formSubmissions.filter((s) => s.is_blocked).length}
                </strong>
              </p>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {formSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`p-4 rounded-lg border ${
                      submission.is_blocked ? "bg-error-50 border-error-200" : "bg-neutral-50 border-neutral-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-neutral-900 truncate">{submission.email}</p>
                          {submission.is_blocked && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-error-100 text-error-700 text-xs font-semibold rounded-full">
                              <AlertTriangle className="w-3 h-3" />
                              BLOCKED
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-600 space-y-1">
                          <p>
                            Form: <strong>{submission.form_type}</strong>
                          </p>
                          <p>
                            Submissions: <strong>{submission.submission_count}</strong>
                          </p>
                          <p>IP: {submission.ip_address}</p>
                          <p>First: {formatDateTime(submission.created_at)}</p>
                          <p>Last: {formatDateTime(submission.last_submission_at)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={submission.is_blocked}
                            onChange={() => handleToggleBlock(submission.id, submission.is_blocked)}
                            className="w-5 h-5 rounded border-2 border-neutral-300 text-error-600 focus:ring-2 focus:ring-error-500 cursor-pointer"
                          />
                          <span className="text-sm font-medium text-neutral-700 group-hover:text-error-600">Block</span>
                        </label>

                        <button
                          onClick={() => handleDeleteFormSubmission(submission.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-100 rounded"
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-error-50 rounded-lg border border-error-200">
            <p className="text-sm text-error-800">
              <strong>Security Note:</strong> Blocked emails will receive a 403 error when attempting to submit any form.
              Use this feature to prevent abuse and spam.
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-secondary-600" />
              <h2 className="text-2xl font-bold">Newsletter Subscriptions</h2>
            </div>
            <div className="flex gap-3">
              {subscriptions.length > 0 && (
                <button onClick={handleDownloadSubscriptions} className="btn btn-primary flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download as Text
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-neutral-500">
              <RefreshCw className="w-8 h-8 mx-auto mb-3 text-neutral-300 animate-spin" />
              <p>Loading...</p>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <Mail className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p>No newsletter subscriptions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-neutral-600 mb-4">
                Total subscriptions: <strong>{subscriptions.length}</strong>
              </p>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {subscriptions.map((entry) => (
                  <div key={entry.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900">{entry.email}</p>
                        <p className="text-sm text-neutral-600">Source: {entry.source}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <p className="text-xs text-neutral-500">{formatDateTime(entry.created_at)}</p>
                        <button
                          onClick={() => handleDeleteSubscription(entry.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-100 rounded"
                          title="Delete subscription"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Status:</strong> Newsletter subscriptions are stored in the D1 database and synced automatically.
            </p>
          </div>
        </div>
      </div>

      <BlogAdmin />
    </div>
  );
}
