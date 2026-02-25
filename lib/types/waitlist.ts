export type ResearchPurpose =
  | 'academic'
  | 'commercial'
  | 'personal'
  | 'nonprofit'
  | 'government';




export type InterestTopic =
  |'ai-research'
  |'data-science'
  |'product-development'
  |'market-analysis'
  | 'user-experience'
  | 'healthcare'
  | 'finance'
  |'education'


  export interface WaitlistEntry {
  error: any;
  id?: string;
  created_at?: string;
  research_purpose: ResearchPurpose;
  organization?: string;
  username: string;
  useremail: string;
  interests: string[];
  usercontact?: string;
}

export type WaitlistStatus =
  | 'pending'
  | 'confirmed'
  | 'invited'
  | 'active'
  | 'archived'


export interface WaitlistApiResponse {
  success: boolean
  entry?: WaitlistEntry
  error?: {
    code: string
    message: string
    field?: string
  }
}
