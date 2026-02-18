

export interface PaperlessDocument {
  id?: number;
  title?: string;
  content?: string;
  created?: string;
  modified?: string;
  tags?: Array<{ name: string }>;
  document_type?: { name: string };
  correspondent?: { name: string };
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface Note {
  id: number;
  note: string;
  created: string; // ISO timestamp, e.g. "2025-07-23T08:38:11.617Z"
  user: User;
}


export interface CustomField {
  field: number;
  value: string;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
  category?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Document {
  id: number;
  correspondent: number;
  document_type: number;
  storage_path: string | null;
  title: string;
  content: string;
  tags: number[];
  created: string;
  created_date: string;
  modified: string;
  added: string;
  deleted_at: string | null;
  archive_serial_number: string | null;
  original_file_name: string;
  archived_file_name: string;
  owner: number;
  user_can_change: boolean;
  is_shared_by_requester: boolean;
  notes: Note[];
  custom_fields: CustomField[];
  page_count: number;
  mime_type: string;
}


export interface newDocument {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  classification?: string;
  correspondent?: string;
  documentType?: string;
  createdDate: string;
  addedDate: string;
  url?: string;
  fileSize?: number;
  fileType?: string;
}

export interface DisplayDocument {
  id: string;
  classification: string;
  tags: string[];
  title: string;
  description: string;
  documentType: string;
  date: string;
  pages: number;
  uploader: string;
  thumbnailUrl?: string;
}
