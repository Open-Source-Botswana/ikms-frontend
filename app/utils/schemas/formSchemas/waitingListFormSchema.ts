import { z } from 'zod'
export const ResearchPurpose = {
  academic: 'academic',
  commercial: 'commercial',
  personal: 'personal',
  nonprofit: 'nonprofit',
  government: 'government',
} as const;

export type ResearchPurpose = typeof ResearchPurpose[keyof typeof ResearchPurpose];



export const WaitingListFormSchema = z.object({
  // research_purpose: z.string({
  //   required_error: 'Please select a research purpose',
  // }),
  research_purpose: z.nativeEnum(ResearchPurpose),
  username: z.string(),
  organization: z.string().optional(),
  interests: z
    .array(z.string())
    .min(1, { message: 'Please select at least one interest' }),
  useremail: z.string().email({ message: 'Please enter a valid email address' }),
  usercontact: z.string().optional(),

})

export type WaitingListFormData = z.infer<typeof WaitingListFormSchema>;
