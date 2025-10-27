interface GuideAccessEmailEntry {
  email: string;
  guide_name: string;
  submitted_at: string;
}

interface NewsletterSubscriptionEntry {
  email: string;
  source?: string;
  subscribed_at: string;
}

const parseStoredList = <T>(key: string, isValid: (value: unknown) => value is T): T[] => {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValid);
  } catch (error) {
    console.error(`Failed to parse stored data for ${key}`, error);
    return [];
  }
};

const isGuideAccessEmailEntry = (value: unknown): value is GuideAccessEmailEntry => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<GuideAccessEmailEntry>;
  return (
    typeof candidate.email === 'string' &&
    typeof candidate.guide_name === 'string' &&
    typeof candidate.submitted_at === 'string'
  );
};

const isNewsletterSubscriptionEntry = (value: unknown): value is NewsletterSubscriptionEntry => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<NewsletterSubscriptionEntry>;
  return typeof candidate.email === 'string' && typeof candidate.subscribed_at === 'string';
};

const formatDate = (value: string): string => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

export const getStoredEmails = (): GuideAccessEmailEntry[] =>
  parseStoredList('guide_access_emails', isGuideAccessEmailEntry);

export const exportEmailsToText = () => {
  const emails = getStoredEmails();

  if (emails.length === 0) {
    return 'No emails collected yet.';
  }

  let textContent = 'Guide Access Email Submissions\n';
  textContent += '================================\n\n';

  emails.forEach((entry, index) => {
    textContent += `Entry ${index + 1}:\n`;
    textContent += `Email: ${entry.email}\n`;
    textContent += `Guide: ${entry.guide_name}\n`;
    textContent += `Submitted: ${formatDate(entry.submitted_at)}\n`;
    textContent += '---\n\n';
  });

  textContent += `\nTotal Submissions: ${emails.length}\n`;

  return textContent;
};

export const downloadEmailsAsTextFile = () => {
  const textContent = exportEmailsToText();
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `guide-emails-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const clearStoredEmails = () => {
  localStorage.removeItem('guide_access_emails');
};

export const exportNewsletterSubscriptionsToText = () => {
  const subscriptions = getNewsletterSubscriptions();

  if (subscriptions.length === 0) {
    return 'No newsletter subscriptions yet.';
  }

  let textContent = 'Newsletter Subscriptions\n';
  textContent += '========================\n\n';

  subscriptions.forEach((entry, index) => {
    textContent += `Entry ${index + 1}:\n`;
    textContent += `Email: ${entry.email}\n`;
    textContent += `Source: ${entry.source || 'unknown'}\n`;
    textContent += `Subscribed: ${formatDate(entry.subscribed_at)}\n`;
    textContent += '---\n\n';
  });

  textContent += `\nTotal Subscriptions: ${subscriptions.length}\n`;

  return textContent;
};

export const downloadNewsletterSubscriptionsAsTextFile = () => {
  const textContent = exportNewsletterSubscriptionsToText();
  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getNewsletterSubscriptions = (): NewsletterSubscriptionEntry[] =>
  parseStoredList('newsletter_subscriptions', isNewsletterSubscriptionEntry);

export const clearNewsletterSubscriptions = () => {
  localStorage.removeItem('newsletter_subscriptions');
};
