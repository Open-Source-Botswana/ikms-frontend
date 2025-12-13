
import RiddleReplyEmail from '@/app/utils/server/email/replyTemplateEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_DEFAULT_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {replyComment, useremail, commentId, commentReference } = body;

    const result = await resend.emails.send({
      from: 'IKMS Support team <onboarding@resend.dev>',
      to: ['samuelkabelo1@gmail.com'],
      subject: 'FeedBack Reply from IKMS',
      react: RiddleReplyEmail({
        replyComment: replyComment,
        commentId: commentId,
        commentReference: commentReference || '',
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
