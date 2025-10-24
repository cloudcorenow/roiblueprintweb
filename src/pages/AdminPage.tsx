import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Mail, Trash2, LogOut, RefreshCw } from "lucide-react";
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

export default function AdminPage() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [emails, setEmails] = useState<GuideAccessEmail[]>([]);
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    await Promise.all([loadEmails(), loadSubscriptions()]);
    setLoading(false);
  };

  const loadEmails = async () => {
    try {
      const response = await fetch('/api/guide-access');
      if (response.ok) {
        const data = await response.json();
        setEmails(data);
      }
    } catch (error) {
      console.error('Error loading guide access emails:', error);
      setError('Failed to load guide access emails');
    }
  };

  const loadSubscriptions = async () => {
    try {
      const response = await fetch('/api/newsletter');
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      }
    } catch (error) {
      console.error('Error loading newsletter subscriptions:', error);
      setError('Failed to load newsletter subscriptions');
    }
  };

  const handleDownload = () => {
    const text = emails.map(e =>
      `${e.email} | Guide: ${e.guide_name} | Access Count: ${e.access_count} | Created: ${new Date(e.created_at).toLocaleString()}`
    ).join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guide-access-emails-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSubscriptions = () => {
    const text = subscriptions.map(s =>
      `${s.email} | Source: ${s.source} | Subscribed: ${new Date(s.created_at).toLocaleString()}`
    ).join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

        {error && (
          <div className="card mb-6 bg-red-50 border-red-200">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold">Guide Access Emails</h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadData}
                className="btn btn-outline flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              {emails.length > 0 && (
                <button
                  onClick={handleDownload}
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
          ) : emails.length === 0 ? (
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
                {emails.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-neutral-900">{entry.email}</p>
                        <p className="text-sm text-neutral-600">Guide: {entry.guide_name}</p>
                        <p className="text-xs text-neutral-500 mt-1">Access count: {entry.access_count}</p>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {new Date(entry.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Status:</strong> Guide access emails are now stored in the D1 database and synced automatically.
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
                <button
                  onClick={handleDownloadSubscriptions}
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
                  <div
                    key={entry.id}
                    className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-neutral-900">{entry.email}</p>
                        <p className="text-sm text-neutral-600">Source: {entry.source}</p>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {new Date(entry.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Status:</strong> Newsletter subscriptions are now stored in the D1 database and synced automatically.
            </p>
          </div>
        </div>
      </div>

      <BlogAdmin />
    </div>
  );
}
