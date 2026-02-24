import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * On-demand revalidation for CMS (Strapi) webhooks.
 * Call this when blog (or other) content is published/updated so pages stay fresh
 * without short time-based revalidation (reduces ISR writes).
 *
 * Setup in Strapi: Webhooks → create webhook → URL: https://your-domain.com/api/revalidate
 * Method: POST. Add header: x-revalidate-token: <REVALIDATE_SECRET>
 *
 * Env: set REVALIDATE_SECRET in Vercel (and .env.local) to a random string.
 */
export async function POST(request: NextRequest) {
  try {
    const secret = process.env.REVALIDATE_SECRET;
    if (!secret) {
      console.warn('REVALIDATE_SECRET not set; rejecting revalidate request');
      return NextResponse.json(
        { error: 'Revalidation not configured' },
        { status: 501 }
      );
    }

    const token = request.headers.get('x-revalidate-token') ?? request.nextUrl.searchParams.get('secret');
    if (token !== secret) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Invalidate blog fetch caches (all fetches tagged with 'blog')
    revalidateTag('blog');
    // Invalidate page caches so next request re-renders with fresh data
    revalidatePath('/blog');
    revalidatePath('/');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Revalidated blog and homepage',
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Revalidation failed' },
      { status: 500 }
    );
  }
}
