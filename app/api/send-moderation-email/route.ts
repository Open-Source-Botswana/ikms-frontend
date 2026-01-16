
import CommentsModerationEmail from '@/app/utils/server/email/moderationEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_DEFAULT_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {recipient_email, action, comment_id, reason, moderator_name } = body;

    const result = await resend.emails.send({
      from: 'IKMS Support team <onboarding@resend.dev>',
      to: ['samuelkabelo1@gmail.com'],
      subject: 'Moderation Reply from IKMS',
      react: CommentsModerationEmail({
        recipient_email: recipient_email,
        comment_id: comment_id,
        action: action,
        reason: reason || '',
        moderator_name: moderator_name,
        nextSteps: [
          { id: 1, text: 'Early access before public opening' },
          { id: 2, text: 'Exclusive updates and features' },
          { id: 3, text: 'Opportunities to shape the platform' },
        ],
        supportLinks: [
          { title: 'Visit Site', href: 'http://34.226.203.226:3000/learn' },
          { title: 'Support', href: 'http://34.226.203.226:3000/' },
        ],
      }),
    });

    return Response.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
