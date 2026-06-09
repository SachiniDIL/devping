import { getSites, updateSiteStatus } from '@/lib/store';

export async function POST(request: Request) {
  const { id, url } = await request.json();

  if (!id || !url) {
    return new Response(JSON.stringify({ error: 'ID and URL are required' }), {
      status: 400,
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // Set a timeout of 5 seconds
    const startTime = Date.now();
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    });
    const status = response.ok ? 'UP' : 'DOWN';
    const responseTime = Date.now() - startTime;
    clearTimeout(timeout);
    updateSiteStatus(id, status, responseTime);
    const updatedSite = getSites().find((site) => site.id === id);
    return new Response(JSON.stringify(updatedSite), { status: 200 });
  } catch {
    updateSiteStatus(id, 'DOWN', 0);
    const updatedSite = getSites().find((site) => site.id === id);
    return new Response(JSON.stringify(updatedSite), { status: 200 });
  }
}
