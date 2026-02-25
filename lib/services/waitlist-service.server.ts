import { WaitingListFormSchema } from "@/app/utils/schemas/formSchemas/waitingListFormSchema";
import { WaitlistApiResponse, WaitlistEntry } from "../types/waitlist";
import { supabase } from "@/app/utils/supabase/supabase";
import { createClerkClient } from '@clerk/nextjs/server';
/**
 * WaitList
 */

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
export class WaitingListService {

  static TABLE = "waiting_list";
  static async addToWaitingList(userData: WaitlistEntry): Promise<WaitlistEntry> {


    const validatedData = WaitingListFormSchema.parse(userData)
    // const { data: existing } = await supabase
    //   .from('waitlist_entries')
    //   .select('id, status')
    //   .eq('useremail', validatedData.useremail)
    //   .neq('status', 'archived')
    //   .maybeSingle()

    // if (existing) {
    //   throw NextResponse.json<WaitlistApiResponse>(
    //     {
    //       success: false,
    //       error: {
    //         code: 'DUPLICATE_EMAIL',
    //         message: 'This email is already on the waitlist.',
    //         field: 'useremail'
    //       }
    //     },
    //     { status: 409 }
    //   )
    // }


    try {
      const { data, error } = await supabase
        .from(this.TABLE)
        .insert({
          researchpurpose: userData.research_purpose,
          username: userData.username,
          organization: userData.organization,
          interests: userData.interests,
          useremail: userData.useremail,
          usercontact: userData.usercontact,
        })
        .select()
        .single();

      if (error) throw error;

      await clerkClient.waitlistEntries.create({
        emailAddress: validatedData.useremail,
        notify: true,
      }).catch(err => {
        console.warn('Clerk waitlist update failed:', err)
        return null
      });

      //   const [clerkResult, emailResult] = await Promise.allSettled([

      //   clerkClient.waitlistEntries.create({
      //     emailAddress: validatedData.useremail,
      //     notify: true,
      //   }).catch(err => {
      //     console.warn('Clerk waitlist update failed:', err)
      //     return null
      //   }),

      //        resend.emails.send({
      //     from: 'Waitlist <onboarding@yourdomain.com>',
      //     to: validatedData.useremail,
      //     subject: 'Welcome to the Waitlist! 🎉',
      //     react: WelcomeEmail({
      //       username: validatedData.username,
      //       interests: validatedData.interests,
      //       researchPurpose: validatedData.researchPurpose,
      //     }),
      //   }).catch(err => {
      //     console.warn('Resend email failed:', err)
      //     return null
      //   })
      // ])


      return data as WaitlistEntry;
    } catch (error) {
      console.error('Error creating waiting list:', error);
      throw error instanceof Error ? error : new Error('Failed to submit waiting list');
    }
  }
}
