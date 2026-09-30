import { NextRequest } from 'next/server';
import { resolveSession } from '@/lib/sessionStore';

export const dynamic = 'force-dynamic';

/**
 * Server-Sent Events stream of deck state for a paired session.
 * Requires a valid PIN or session id — unauthenticated requests get 401.
 */
export async function GET(req: NextRequest) {
  const cred = req.nextUrl.searchParams.get('pin') ?? req.nextUrl.searchParams.get('id') ?? '';
  const session = resolveSession(cred);
  if (!session) return new Response('Unauthorized', { status: 401 });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // send current state immediately so the client syncs on connect
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'STATE', slide: session.slide })}\n\n`));

      session.listeners.add(controller);

      // keep-alive so proxies don't drop the connection
      const ping = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': ping\n\n'));
        } catch {
          clearInterval(ping);
          session.listeners.delete(controller);
        }
      }, 25_000);

      const cleanup = () => {
        clearInterval(ping);
        session.listeners.delete(controller);
      };

      req.signal.addEventListener('abort', cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
