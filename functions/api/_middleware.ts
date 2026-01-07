export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
  env: any;
}) {
  const response = await context.next();
  const url = new URL(context.request.url);

  // Only process HTML responses
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    return response;
  }

  // Don't modify API routes
  if (url.pathname.startsWith('/api/')) {
    return response;
  }

  try {
    let html = await response.text();

    // Build the correct canonical URL with www
    const baseUrl = 'https://www.roiblueprint.com';
    let path = url.pathname;

    // Normalize path - ensure trailing slash except for root
    if (path !== '/' && !path.endsWith('/')) {
      path = `${path}/`;
    }

    const canonicalUrl = `${baseUrl}${path}`;

    // Replace the static canonical with the dynamic one
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Also update og:url for consistency
    html = html.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // Also update twitter:url for consistency
    html = html.replace(
      /<meta property="twitter:url" content="[^"]*" \/>/,
      `<meta property="twitter:url" content="${canonicalUrl}" />`
    );

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  } catch (error) {
    // If anything fails, return the original response
    console.error('Error processing HTML:', error);
    return response;
  }
}
