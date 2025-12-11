import { z } from 'zod'

export const WaitingListFormSchema = z.object({
  researchPurpose: z.string({
    required_error: 'Please select a research purpose',
  }),
  username: z.string(),
  organization: z.string().optional(),
  interests: z
    .array(z.string())
    .min(1, { message: 'Please select at least one interest' }),
  useremail: z.string().email({ message: 'Please enter a valid email address' }),
  usercontact: z.string().optional(),

})

export type WaitingListFormData = z.infer<typeof WaitingListFormSchema>;
