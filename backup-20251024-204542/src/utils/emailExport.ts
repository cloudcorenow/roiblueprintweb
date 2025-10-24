export const exportEmailsToText = () => {
  const emails = JSON.parse(localStorage.getItem('guide_access_emails') || '[]');

  if (emails.length === 0) {
    return 'No emails collected yet.';
  }

  let textContent = 'Guide Access Email Submissions\n';
  textContent += '================================\n\n';

  emails.forEach((entry: any, index: number) => {
    textContent += `Entry ${index + 1}:\n`;
    textContent += `Email: ${entry.email}\n`;
    textContent += `Guide: ${entry.guide_name}\n`;
    textContent += `Submitted: ${new Date(entry.submitted_at).toLocaleString()}\n`;
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

export const getStoredEmails = () => {
  return JSON.parse(localStorage.getItem('guide_access_emails') || '[]');
};

export const clearStoredEmails = () => {
  localStorage.removeItem('guide_access_emails');
};

export const exportNewsletterSubscriptionsToText = () => {
  const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');

  if (subscriptions.length === 0) {
    return 'No newsletter subscriptions yet.';
  }

  let textContent = 'Newsletter Subscriptions\n';
  textContent += '========================\n\n';

  subscriptions.forEach((entry: any, index: number) => {
    textContent += `Entry ${index + 1}:\n`;
    textContent += `Email: ${entry.email}\n`;
    textContent += `Source: ${entry.source || 'unknown'}\n`;
    textContent += `Subscribed: ${new Date(entry.subscribed_at).toLocaleString()}\n`;
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

export const getNewsletterSubscriptions = () => {
  return JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
};

export const clearNewsletterSubscriptions = () => {
  localStorage.removeItem('newsletter_subscriptions');
};
