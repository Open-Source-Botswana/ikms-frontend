import { WaitingListService } from '@/lib/services/waitlist-service.server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const entry = await WaitingListService.addToWaitingList(body);
    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (error: any) {
    console.error("Waitlist Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
