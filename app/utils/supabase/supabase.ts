import { FeedbackItem, RiddleItem } from "@/lib/types/folklore";
import { createClient } from "@supabase/supabase-js";
import z from "zod";
import { WaitingListFormData, WaitingListFormSchema } from "../schemas/formSchemas/waitingListFormSchema";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!)

export class FeedbackService {
  static async createFeedback(feedback: FeedbackItem): Promise<FeedbackItem> {
    try {
      const { data, error } = await supabase
        .from('folklore_feedback')
        .insert({
          itemid: feedback.itemId,
          category: feedback.category,
          feedbacktype: feedback.feedBackType,
          message: feedback.message,
          useremail: feedback.useremail || null,
        }).select().single();


      if (error) throw error;
      if (!data) throw new Error('Failed to create feedback');

      //   console.error('Sending this feedback:', data);

      return data as FeedbackItem;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error instanceof Error ? error : new Error('Failed to submit feedback');
    }
  }

  static async getFeedbackByItemId(itemId: string): Promise<FeedbackItem[]> {
    try {
      const { data, error } = await supabase
        .from('folklore_feedback')
        .select('*')
        .eq('itemid', itemId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching feedback:', error);
      return [];
    }
  }

  static async getFeedbackById(id: string): Promise<FeedbackItem | null> {
    try {
      const { data, error } = await supabase
        .from('folklore_feedback')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching feedback by ID:', error);
      return null;
    }
  }

  static async getAllFeedback(): Promise<FeedbackItem[]> {
    try {
      const { data, error } = await supabase
        .from('folklore_feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all feedback:', error);
      return [];
    }
  }

  static async getRiddleItemById(itemId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('language_riddles_items')
        .select('*')
        .eq('id', itemId)
        .single();

      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      return null;
    }
  }
}

export class FolkloreRiddlesService {


  static async getRiddleItemById(itemId: string): Promise<RiddleItem | null> {
    try {
      const { data, error } = await supabase
        .from('language_riddles_items')
        .select('*')
        .eq('id', itemId)
        .single();

      if (error) throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      return null;
    }
  }
}


// export interface WaitingListRecord extends WaitingListFormData {
//   id: string;
//   created_at: string;
// }

export class WaitingListService {

  static TABLE = "waiting_list";
  static async addToWaitingList(userData: WaitingListFormData): Promise<WaitingListFormData> {
    try {
      const { data, error } = await supabase
        .from(this.TABLE)
        .insert({
          researchpurpose: userData.researchPurpose,
          username: userData.username,
          organization: userData.organization,
          interests: userData.interests,
          useremail: userData.useremail,
          usercontact: userData.usercontact,
        })
        .select()
        .single();

      if (error) throw error;
      return data as WaitingListFormData;
    } catch (error) {
      console.error('Error creating waiting list:', error);
      throw error instanceof Error ? error : new Error('Failed to submit waiting list');
    }
  }
}
