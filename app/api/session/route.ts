import { NextRequest, NextResponse } from 'next/server';
import { createSession, resolveSession } from '@/lib/sessionStore';

export const dynamic = 'force-dynamic';

/** Create a new pairing session. The PIN is never returned — it is a secret. */
export async function POST(req: NextRequest) {
  const { total = 1 } = await req.json().catch(() => ({}));
  const session = createSession(Number(total) || 1);
  return NextResponse.json({
    id: session.id,
    slide: session.slide,
    total: session.total,
  });
}

/** Verify a credential and resolve the live session. */
export async function GET(req: NextRequest) {
  const cred = req.nextUrl.searchParams.get('pin') ?? req.nextUrl.searchParams.get('id') ?? '';
  const session = resolveSession(cred);
  if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ id: session.id, slide: session.slide, total: session.total });
}
