import { NextRequest, NextResponse } from 'next/server';
import { applyCommand, resolveSession } from '@/lib/sessionStore';

export const dynamic = 'force-dynamic';

/**
 * Apply a navigation command from a paired remote.
 * Requires a valid PIN or session id — unauthenticated requests get 401.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const cred: string = body.pin || body.id || '';
  const session = resolveSession(cred);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const action = body.action as 'NEXT' | 'PREV' | 'GOTO';
  if (!['NEXT', 'PREV', 'GOTO'].includes(action)) {
    return NextResponse.json({ error: 'Bad action' }, { status: 400 });
  }

  const slide = applyCommand(session, { action, slide: body.slide });
  return NextResponse.json({ ok: true, slide });
}
