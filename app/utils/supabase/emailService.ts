import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_DEFAULT_KEY);

export class EmailService {
      static async sendWaitingListConfirmation({
    toEmail,
    subject,
    message,

  }: {
    toEmail: string;
    subject: string;
    message: string;

  }) {
    try {
      const { error } = await resend.emails.send({
        from: 'Riddle Me <noreply@riddleme.com>',
        to: 'samuelkabelo1@gmail.com',
        subject: `Re: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🧠 Riddle Me</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 16px;">Your riddle feedback has been replied to</p>
            </div>

            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 20px;">Re: ${subject}</h2>

              <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 15px 0;">
                <p style="color: #4a5568; margin: 0 0 10px 0; font-style: italic;">"${message}"</p>

              </div>

              <div style="background: #e6fffa; border-left: 4px solid #38b2ac; padding: 15px; margin: 15px 0; border-radius: 0 8px 8px 0;">
                <p style="color: #2c7a7b; margin: 0; font-weight: 500;">Reply from Riddle Me Team:</p>
                <p style="color: #2d3748; margin: 8px 0 0 0;">Thank you for your valuable feedback! We've received your comment and our team has reviewed it. Your input helps us improve the riddle experience for everyone.</p>
              </div>
            </div>


            <div style="text-align: center; margin-top: 20px; color: #a0aec0; font-size: 12px;">
              <p style="margin: 5px 0;">This is an automated message from Riddle Me</p>
              <p style="margin: 5px 0;">© ${new Date().getFullYear()} Riddle Me. All rights reserved.</p>
            </div>
          </div>
        `,
      });

      if (error) {
            console.error('Error sending email:', error);
      };
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error instanceof Error ? error : new Error('Failed to send email');
    }
  }
  static async sendFeedbackReply({
    toEmail,
    subject,
    message,
    riddleTitle,
    replyId
  }: {
    toEmail: string;
    subject: string;
    message: string;
    riddleTitle: string;
    replyId: string;
  }) {
    try {
      const { error } = await resend.emails.send({
        from: 'Riddle Me <noreply@riddleme.com>',
        to: [toEmail],
        subject: `Re: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🧠 Riddle Me</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0; font-size: 16px;">Your riddle feedback has been replied to</p>
            </div>

            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 20px;">Re: ${subject}</h2>

              <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 15px 0;">
                <p style="color: #4a5568; margin: 0 0 10px 0; font-style: italic;">"${message}"</p>
                <p style="color: #718096; margin: 0; font-size: 14px;">- Your feedback on "${riddleTitle}"</p>
              </div>

              <div style="background: #e6fffa; border-left: 4px solid #38b2ac; padding: 15px; margin: 15px 0; border-radius: 0 8px 8px 0;">
                <p style="color: #2c7a7b; margin: 0; font-weight: 500;">Reply from Riddle Me Team:</p>
                <p style="color: #2d3748; margin: 8px 0 0 0;">Thank you for your valuable feedback! We've received your comment and our team has reviewed it. Your input helps us improve the riddle experience for everyone.</p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; margin: 0 0 10px 0; font-size: 14px;">
                View your feedback thread:
              </p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/language/folklore/riddles/${replyId}"
                 style="background: #667eea; color: white; text-decoration: none; padding: 10px 25px; border-radius: 6px; font-weight: 500; display: inline-block;">
                View Feedback Thread
              </a>
            </div>

            <div style="text-align: center; margin-top: 20px; color: #a0aec0; font-size: 12px;">
              <p style="margin: 5px 0;">This is an automated message from Riddle Me</p>
              <p style="margin: 5px 0;">© ${new Date().getFullYear()} Riddle Me. All rights reserved.</p>
            </div>
          </div>
        `,
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error instanceof Error ? error : new Error('Failed to send email');
    }
  }
}
