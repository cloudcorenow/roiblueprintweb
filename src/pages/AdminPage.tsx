import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Mail, Trash2, LogOut } from "lucide-react";
import BlogAdmin from "../components/BlogAdmin";
import { useAuth } from "../contexts/AuthContext";
import {
  downloadEmailsAsTextFile,
  getStoredEmails,
  clearStoredEmails,
  downloadNewsletterSubscriptionsAsTextFile,
  getNewsletterSubscriptions,
  clearNewsletterSubscriptions
} from "../utils/emailExport";

export default function AdminPage() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [emails, setEmails] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    loadEmails();
    loadSubscriptions();
  }, []);

  const loadEmails = () => {
    const storedEmails = getStoredEmails();
    setEmails(storedEmails);
  };

  const loadSubscriptions = () => {
    const storedSubscriptions = getNewsletterSubscriptions();
    setSubscriptions(storedSubscriptions);
  };

  const handleDownload = () => {
    downloadEmailsAsTextFile();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all stored emails? This cannot be undone.')) {
      clearStoredEmails();
      loadEmails();
    }
  };

  const handleDownloadSubscriptions = () => {
    downloadNewsletterSubscriptionsAsTextFile();
  };

  const handleClearSubscriptions = () => {
    if (window.confirm('Are you sure you want to clear all newsletter subscriptions? This cannot be undone.')) {
      clearNewsletterSubscriptions();
      loadSubscriptions();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <div className="container" style={{ marginBottom: "3rem" }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
            <p className="text-sm text-neutral-600 mt-1">Logged in as: {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="btn btn-outline flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold">Guide Access Emails</h2>
            </div>
            <div className="flex gap-3">
              {emails.length > 0 && (
                <>
                  <button
                    onClick={handleDownload}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download as Text
                  </button>
                  <button
                    onClick={handleClear}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </>
              )}
            </div>
          </div>

          {emails.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <Mail className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p>No email submissions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-neutral-600 mb-4">
                Total submissions: <strong>{emails.length}</strong>
              </p>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {emails.map((entry, index) => (
                  <div
                    key={index}
                    className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-neutral-900">{entry.email}</p>
                        <p className="text-sm text-neutral-600">Guide: {entry.guide_name}</p>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {new Date(entry.submitted_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Emails are currently stored in your browser's localStorage.
              Download them regularly to avoid data loss. Once the database is configured,
              emails will be automatically saved to Supabase.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-secondary-600" />
              <h2 className="text-2xl font-bold">Newsletter Subscriptions</h2>
            </div>
            <div className="flex gap-3">
              {subscriptions.length > 0 && (
                <>
                  <button
                    onClick={handleDownloadSubscriptions}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download as Text
                  </button>
                  <button
                    onClick={handleClearSubscriptions}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </>
              )}
            </div>
          </div>

          {subscriptions.length === 0 ? (
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
                {subscriptions.map((entry, index) => (
                  <div
                    key={index}
                    className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-neutral-900">{entry.email}</p>
                        <p className="text-sm text-neutral-600">Source: {entry.source}</p>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {new Date(entry.subscribed_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Newsletter subscriptions are currently stored in your browser's localStorage.
              Download them regularly to avoid data loss.
            </p>
          </div>
        </div>
      </div>

      <BlogAdmin />
    </div>
  );
}
