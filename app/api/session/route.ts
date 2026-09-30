import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/sessionStore';

export async function POST(req: NextRequest) {
  const { total = 1 } = await req.json().catch(() => ({}));
  const session = createSession(Number(total));
  return NextResponse.json({ id: session.id, pin: session.pin, slide: session.slide });
}
