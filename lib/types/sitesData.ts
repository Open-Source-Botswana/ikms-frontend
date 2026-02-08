import { ExtendedFile } from '../types';
import { id } from './../../node_modules/ci-info/index.d';
// app/types/cultural-site.ts
// update sensitivity level to number
export type SensitivityLevel = 'public' | 'restricted' | 'closed'
export type SiteVote = 'approve' | 'reject'
export type SiteCategory =
  | 'heritage'
  | 'language'
  | 'botanical'
  | 'tribal'
  | 'migration'

export type SiteViewMode = "Heritage" | "Tribal"

export interface SiteData {
  id: number,
  site_name: string,
  description: string
  category: SiteCategory,
  latitude: number,
  longitude: number,
  population_density?: number | null,
  migration_route: string,
  metadata: {
    unesco: boolean,
    undp: boolean,
    unicef: boolean,
    local_context: string,
    indigenous_system: string,
    rights: string,
    ip_metadata: string,
    sensitivity_level: SensitivityLevel,
    access_protocol: string
  },
  uploaded_images: File[],
  images?:[
 {
  id?:number,
  images?: string,
  uploaded_at?: string,
  site?: number
 }
  ],
  created_by?: {
    email?: string,
    name?: string,
    is_staff?: boolean
  },
  last_updated?:string,
  date_created?: string,
  category_display?: string,
  status_display?:string
  verification_status?:{
    approve_count?: number,
    reject_count?: number,
    total_votes?: number,
    required_count?: number,
    pending_verifiers?: number,
    status?: string
  }
}


export interface SiteCreationState {
  step: 'TYPE' | 'BASIC' | 'METADATA' | 'UPLOADS' | 'REVIEW'
  siteData: Partial<SiteData>
  currentStepValid: boolean
  nextStep: () => void
  prevStep: () => void
  addSiteData: (data: SiteData) => void;
  updateSiteData: (data: Partial<SiteData>) => void
  resetForm: () => void
}

export interface SiteViewState {
  currentSite: Partial<SiteData> | null
  setCurrentSite: (siteData: Partial<SiteData> | null )=>void
}

export type SiteVoteType = {
  siteId?:number,
  vote: SiteVote,
  comment?: string
}

export interface CulturalSite {
  id: string
  name: string
  latitude: number
  longitude: number
  description: string
  category: 'heritage' | 'language' | 'botanical' | 'tribal' | 'migration'
  language?: string
  tribe?: string
  images: string[]
  videos: string[]
  audio: string[]
  metadata: {
    unesco: boolean
    undp: boolean
    unicef: boolean
    localContext: string
    indigenousSystem: string
    rights: string
    ipMetadata: string
    sensitivityLevel: 'public' | 'restricted' | 'closed'
    accessProtocol: string
  }
  populationDensity?: number
  migrationRoute?: string
  dateCreated: string
  lastUpdated: string
}
