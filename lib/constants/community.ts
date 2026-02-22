
import {
  CheckCheckIcon,
  FileAudio,
  FileText,
  FileVideo,
  ImageIcon,
} from 'lucide-react'

export enum CommunityGovernanceSteps {
  BASIC = 'BASIC',
  AUTHORITY = 'AUTHORITY',
  PROTOCOLS = 'PROTOCOLS',
  REVIEW = 'REVIEW',
}

export enum CommunityGovernance {
  INDIGENOUS_COUNCIL = 'INDIGENOUS_COUNCIL',
  ELDER_COUNCIL = 'ELDER_COUNCIL',
  STEWARDSHIP_CIRCLE = 'STEWARDSHIP_CIRCLE',
}

export enum TKLabel {
  SECRET_SACRED = 'SECRET_SACRED',
  CULTURAL_INFLUENCE = 'CULTURAL_INFLUENCE',
  WOMEN_S_ONLY = 'WOMEN_S_ONLY',
  MEN_S_ONLY = 'MEN_S_ONLY',
}

export enum CulturalProtocol {
  PUBLIC = 'PUBLIC',
  COMMUNITY_ONLY = 'COMMUNITY_ONLY',
  ELDER_APPROVAL_REQUIRED = 'ELDER_APPROVAL_REQUIRED',
  GENDER_RESTRICTED = 'GENDER_RESTRICTED',
}

export enum LicensingOption {
  ATTRIBUTION = 'ATTRIBUTION',
  ATTRIBUTION_SHARE_ALIKE = 'ATTRIBUTION_SHARE_ALIKE',
  ATTRIBUTION_NON_COMMERCIAL = 'ATTRIBUTION_NON_COMMERCIAL',
  COMMUNITY_PROTOCOL = 'COMMUNITY_PROTOCOL',
  ALL_RIGHTS_RESERVED = 'ALL_RIGHTS_RESERVED',
}

export enum CollectionGovernanceSteps {
  BASIC = 'BASIC',
  METADATA = 'METADATA',
  CURATION = 'CURATION',
  PROTOCOLS = 'PROTOCOLS',
  REVIEW = 'REVIEW',
}

export enum SiteSensitivityLevel {
  PUBLIC = 'PUBLIC',
  RESTRICTED = 'RESTRICTED',
  CLOSED = 'CLOSED',
}

export enum SiteCategory {
  HERITAGE = 'HERITAGE',
  LANGUAGE = 'LANGUAGE',
  BOTANICAL = 'BOTANICAL',
  TRIBAL = 'TRIBAL',
  MIGRATION = 'MIGRATION',
}

export const steps = [
  CommunityGovernanceSteps.BASIC,
  CommunityGovernanceSteps.AUTHORITY,
  CommunityGovernanceSteps.PROTOCOLS,
  CommunityGovernanceSteps.REVIEW,
]

export const stepsCollection = [
  CollectionGovernanceSteps.BASIC,
  CollectionGovernanceSteps.METADATA,
  CollectionGovernanceSteps.CURATION,
  CollectionGovernanceSteps.PROTOCOLS,
  CollectionGovernanceSteps.REVIEW,
]

export enum CollectionType {
  EVENTS = 'EVENTS',
  CULTURAL_PRACTICE = 'CULTURAL_PRACTICE',
  RITUAL = 'RITUAL',
  ORAL_HISTORY = 'ORAL_HISTORY',
  TRADITIONAL_KNOWLEDGE = 'TRADITIONAL_KNOWLEDGE',
  ARTIFACTS = 'ARTIFACTS',
  CEREMONIES = 'CEREMONIES',
}

export const collectionTypeOptions = [
  {
    value: CollectionType.EVENTS,
    label: 'Events',
    description: 'Historical events and occurrences',
  },
  {
    value: CollectionType.CULTURAL_PRACTICE,
    label: 'Cultural Practice',
    description: 'Traditional practices and customs',
  },
  {
    value: CollectionType.RITUAL,
    label: 'Ritual',
    description: 'Ceremonial and spiritual practices',
  },
  {
    value: CollectionType.ORAL_HISTORY,
    label: 'Oral History',
    description: 'Stories and spoken traditions',
  },
  {
    value: CollectionType.TRADITIONAL_KNOWLEDGE,
    label: 'Traditional Knowledge',
    description: 'Indigenous knowledge systems',
  },
  {
    value: CollectionType.ARTIFACTS,
    label: 'Artifacts',
    description: 'Cultural objects and materials',
  },
  {
    value: CollectionType.CEREMONIES,
    label: 'Ceremonies',
    description: 'Formal cultural ceremonies',
  },
]

export const tkLabelOptions = [
  {
    label: TKLabel.SECRET_SACRED,
    title: 'Secret/Sacred',
    description: 'Requires highest protection',
  },
  {
    label: TKLabel.CULTURAL_INFLUENCE,
    title: 'Cultural Influence',
    description: 'May influence cultural understanding',
  },
  {
    label: TKLabel.WOMEN_S_ONLY,
    title: "Women's Knowledge",
    description: "Specific to women's traditions",
  },
  {
    label: TKLabel.MEN_S_ONLY,
    title: "Men's Knowledge",
    description: "Specific to men's traditions",
  },
]

export const protocolOptions = [
  {
    value: CulturalProtocol.PUBLIC,
    title: 'Public',
    description: 'Openly accessible to all',
  },
  {
    value: CulturalProtocol.COMMUNITY_ONLY,
    title: 'Community Only',
    description: 'Restricted to community members',
  },
  {
    value: CulturalProtocol.ELDER_APPROVAL_REQUIRED,
    title: 'Elder Approval Required',
    description: 'Requires elder council approval',
  },
  {
    value: CulturalProtocol.GENDER_RESTRICTED,
    title: 'Gender Restricted',
    description: 'Limited by traditional gender protocols',
  },
]

export const contentTypeIcons = {
  audio: FileAudio,
  video: FileVideo,
  text: FileText,
  image: ImageIcon,
  document: FileText,
  all: CheckCheckIcon,
}

export const accessLevelColors = {
  PUBLIC: 'bg-green-100 text-green-800 border-green-300',
  COMMUNITY_ONLY: 'bg-blue-100 text-blue-800 border-blue-300',
  ELDER_APPROVAL_REQUIRED: 'bg-red-100 text-red-800 border-red-300',
  GENDER_RESTRICTED: 'bg-purple-100 text-purple-800 border-purple-300',
}

export const accessLevelDescriptions = {
  PUBLIC:
    'This knowledge can be viewed by anyone and shared according to community protocols.',
  COMMUNITY_ONLY:
    'This knowledge is restricted to verified community members only.',
  ELDER_APPROVAL_REQUIRED:
    'This sacred knowledge requires elder approval before access is granted.',
  GENDER_RESTRICTED: 'This knowledge is restricted to genders only.',
}

export type KnowledgeDomain =
  | 'biodiversity' | 'history' | 'artifacts' | 'music'
  | 'medicine' | 'agriculture' | 'language' | 'ceremony'
  | 'crafts' | 'oral_tradition' | 'dance' | 'food';

export type AccessLevel = 'public' | 'community_only' | 'restricted' | 'sacred';
export type MediaType = 'audio' | 'video' | 'text' | 'image' | '3d_artifact' | 'document';
export type MemberRole = 'elder' | 'chief' | 'healer' | 'researcher' | 'custodian' | 'contributor' | 'member';
