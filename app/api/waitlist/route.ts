import { WaitingListService } from '@/app/utils/supabase/supabase';
import { WaitlistEntry } from '@/lib/types/waitlist';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body: WaitlistEntry = await request.json();
  // const validatedData = WaitingListFormSchema.parse(body)

  const entry = await WaitingListService.addToWaitingList(body);

  if (entry.error) {
    return NextResponse.json({ error: entry.error }, { status: 500 });
  } else {
    return NextResponse.json({ success: true }, { status: 201 });
  }
}
