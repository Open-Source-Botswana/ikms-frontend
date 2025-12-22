import { monthlySubmissions } from './../mock/articles';
import { categories } from './../mock/categoryStats';
import { languageItemDifficuly } from './../../../lib/types/languages';
import { FeedbackItem, FeedbackStatus, RiddleFormValues, RiddleItem, RiddleMetrics } from "@/lib/types/folklore";
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

  static async updateFeedbackStatus(id: string, newstatus:FeedbackStatus, status_comment?:string): Promise<FeedbackItem> {
    try {
      const { data, error } = await supabase
        .from('folklore_feedback')
        .update({ status_enum: newstatus, status_comment: status_comment??null })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to update feedback status');

      return data as FeedbackItem;
    } catch (error) {
      console.error('Error updating feedback status:', error);
      throw error instanceof Error ? error : new Error('Failed to update feedback status');
    }
  }
}

export class FolkloreRiddlesService {

  static async create(values: RiddleFormValues) {
    const { data, error } = await supabase
      .from('language_riddles_items')
      .insert(values)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, values: RiddleFormValues) {
    const { data, error } = await supabase
      .from('language_riddles_items')
      .update(values)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

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

  static async softDeleteItemById(riddleId: string){
    const {error} = await supabase.from('language_riddles_items').update({is_deleted:true}).eq('id', riddleId)

    if (error) throw error
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

export class RiddleMetricsService {

  static async getOverviewMetrics(): Promise<RiddleMetrics> {

    const startOfMonth = new Date();
    startOfMonth.setDate(1);

    const [
      total, approved, pending, rejected, languages,categories, monthlySubmissions
    ] = await Promise.all([
      supabase.from('language_riddles_items').select('*', { count: 'exact', head: true }),
      supabase.from('language_riddles_items').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
      supabase.from('language_riddles_items').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('language_riddles_items').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
      supabase.from('language_riddles_items').select('language', { count: 'exact', head: true }),
      supabase.from('language_riddles_items').select('category', { count: 'exact', head: true }),
      supabase.from('language_riddles_items')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString()),
    ]);


    // if (error) throw error;
    return {
            totalRiddles: total.count ?? 0,
      approvedRiddles: approved.count ?? 0,
      pendingRiddles: pending.count ?? 0,
      rejectedRiddles: rejected.count ?? 0,
      languagesCount: languages.count ?? 0,
      categoriesCount: categories.count ?? 0,
      newThisMonth: monthlySubmissions.count ?? 0,
    };
  }
}
