// app/api/send-email/route.ts
import WaitingListEmail from '@/app/utils/supabase/waitingListEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_DEFAULT_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, useremail } = body;

    const result = await resend.emails.send({
      from: 'IKMS Waiting List <onboarding@resend.dev>',
      to: [useremail],
      subject: 'Waiting List Confirmation',
      react: WaitingListEmail({
        userName:  username || 'Friend',
        message:
          'We’re excited to have you onboard. Our team is working hard to finalize things before launch.',
        features: [
          { id: 1, text: 'Early access before public opening' },
          { id: 2, text: 'Exclusive updates and features' },
          { id: 3, text: 'Opportunities to shape the platform' },
        ],
        supportLinks: [
          { title: 'Visit Website', href: 'http://34.226.203.226:3000/' },
          { title: 'Community', href: 'http://34.226.203.226:3000/' },
        ],
      }),
    });

    return Response.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
