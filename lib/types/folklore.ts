// types/folklore.types.ts
export type FolkloreType = 'riddles' | 'idioms' | 'proverbs';

export interface BaseFolkloreItem {
  id?: string;
  type: FolkloreType;
  category: string;
  language: string;
  version: number;
  created_at?: string;
  updated_at: string;
}

export interface RiddleItem extends BaseFolkloreItem {
  question: string;
  answer: string;
  context?: string;
  usage?: string;
  tags: string[];
//   hints?: {
//     deleteLetters?: number;
//     revealLetter?: number[];
//     solveCost?: number;
//   };
}

export interface IdiomItem extends BaseFolkloreItem {
  expression: string;
  meaning: string;
  example?: string;
  origin?: string;
  synonyms: string[];
}

export interface ProverbItem extends BaseFolkloreItem {
  proverb: string;
  meaning: string;
  cultural_context?: string;
  region: string;
  synonyms: string[];
}

export type FolkloreItem = RiddleItem | IdiomItem | ProverbItem;

// Feedback and Comments types
// export interface FeedbackItem {
//   id: string;
//   folklore_id: string;
//   user_id?: string;
//   feedback_type: 'translation' | 'meaning' | 'context' | 'lexical' | 'other';
//   original_content: string;
//   suggested_content: string;
//   comment?: string;
//   rating?: 1 | 2 | 3 | 4 | 5;
//   status: 'pending' | 'approved' | 'rejected';
//   created_at: string;
// }

export interface CommentItem {
  id: string;
  folklore_id: string;
  user_id?: string;
  user_name?: string;
  content: string;
  likes: number;
  created_at: string;
  parent_id?: string; // for nested comments
}

export type LanguageItemType = 'riddle' | 'idiom' | 'proverb';
export type FeedbackCategory = 'translation' | 'meaning' | 'options' | 'context' | 'lexical';
export type FeedbackStatus = 'pending' | 'approved' | 'rejected';

export interface CategoryType {
  category: LanguageItemType;
}

export interface FeedbackType {
  feedBackType: FeedbackCategory;
}

export interface FeedbackItem {
  id: string;
  itemId: string;
  category: CategoryType;
  feedBackType: FeedbackType;
  message: string;
  useremail?: string;
  created_at: string;
  status_enum?: FeedbackStatus;
  status_comment?: string;
  reply_count?: number;
  // TODO: add more fields to identify the admin/moderator who changed status + timestamp

}

export type RiddleFormMode = 'create' | 'edit';

export interface RiddleFormValues {
  category: string;
  language: string;
  question: string;
  answer: string;
  context?: string;
  usage?: string;
  tags: string[];
}
