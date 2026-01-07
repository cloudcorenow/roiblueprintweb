interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

interface PagesContext<E = any> {
  request: Request;
  next: () => Promise<Response>;
  env: E;
  params: Record<string, string>;
  data: Record<string, any>;
}

type PagesFunction<E = any> = (context: PagesContext<E>) => Promise<Response> | Response;

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  // Don't modify API routes or static assets
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/assets/') ||
    /\.(png|jpg|jpeg|svg|xml|txt|ico|js|css|woff|woff2|ttf|eot)$/i.test(url.pathname)
  ) {
    return context.next();
  }

  try {
    const response = await context.next();

    // Only process successful HTML responses
    const contentType = response.headers.get('content-type');
    if (
      !response.ok ||
      !contentType ||
      !contentType.includes('text/html')
    ) {
      return response;
    }

    // Read the HTML
    let html = await response.text();

    // Build the correct canonical URL with www
    const baseUrl = 'https://www.roiblueprint.com';
    let path = url.pathname;

    // Normalize path - remove trailing slash except for root
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    const canonicalUrl = `${baseUrl}${path}`;

    // Replace the static canonical with the dynamic one
    html = html.replace(
      /<link rel="canonical" href="https:\/\/www\.roiblueprint\.com\/" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Also update og:url for consistency
    html = html.replace(
      /<meta property="og:url" content="https:\/\/www\.roiblueprint\.com\/" \/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // Also update twitter:url for consistency
    html = html.replace(
      /<meta property="twitter:url" content="https:\/\/www\.roiblueprint\.com\/" \/>/,
      `<meta property="twitter:url" content="${canonicalUrl}" />`
    );

    // Create new headers
    const headers = new Headers(response.headers);
    headers.set('content-type', 'text/html; charset=utf-8');
    headers.set('cache-control', 'public, max-age=0, must-revalidate');
    headers.delete('content-length');

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
  } catch (error) {
    console.error('Middleware error:', error);
    return context.next();
  }
};
