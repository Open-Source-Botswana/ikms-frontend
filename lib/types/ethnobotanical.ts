import { VerificationRole } from "./botanical";

export type LabelDomain = 'traditional' | 'biocultural' | 'research';
export type SensitivityLevel = 'public' | 'restricted' | 'confidential';


export type WorkflowStatus =   | 'draft'               // Stage 1: Admin capture
  | 'pending_review'      // Stage 2: Officer/Expert verification
  | 'pending_approval'    // Stage 3: Final approval
  | 'published'           // Approved & public
  | 'denied'              // Rejected with feedback
  | 'revision_requested' // Sent back to admin
  | 'archived';            // Record is archived and not publicly visible

export interface VerificationEvent {
  stage: number;
  stageName?: string;
  status?: 'completed' | 'in_progress' | 'pending';
  role?: VerificationRole;
  userId?: string;
  userName?: string;
  timestamp?: string;
  completedAt?: string;
  completedBy?: string;
  action?: string;
  comments?: string;
  signature?: string; // For cryptographic signature of the event

}

export interface CulturalAuthority {
  communityName: string;
  territory: string;
  representative: string;
  contactEmail: string;
  indigenousSystem: string;
}

export interface ModernMedicine {
  activeCompounds: string[];
  clinicalStudies: string[];
  approvedUses: string[];
  contradictions: string[];
}

export interface HomeopathicUses {
  preparations: string[];
  conditions: string[];
  dosage: string;
}

export interface ResearchStudy {
  title: string;
  year: number;
  findings: string;
  source: string;
}

export interface Research {
  recentStudies: ResearchStudy[];
  futureDirections: string[];
}

export interface StandardsCompliance {
  darwinCore: boolean;
  localContexts: boolean;
  nagoyaProtocol: boolean;
  berneConvention: boolean;
}

export interface Location {
  unescoSite: boolean;
  undpSupported: boolean;
}

export type GeographicalFeatureType = 'Point' | 'Polygon' | 'LineString' | 'MultiPoint' | 'MultiPolygon' | 'Circle';


export interface GeographicalFeature {
  id: string;
  type: GeographicalFeatureType;
  name?: string;
  description?: string;
  geometry: {
    coordinates?: number | number[] | number[][] | number[][][];
    radiusMeters?: number;
  };
}

export interface JSONLdExport {
  "@context": {
    dwc: string;
    lc: string;
    schema: string;
    geo: string;
  };
  "@type": string;
  "@id": string;
  "dwc:scientificName": string;
  "dwc:family": string;
  "lc:tkLabels": string[];
  "lc:bcLabels": string[];
  "lc:culturalAuthority": string;
  "lc:customCulturalId": string;
  "schema:name": string;
  "schema:description": string;
  "schema:license": string;
  "schema:datePublished": string;
  "schema:spatialCoverage": {
    "@type": string;
    "schema:name": string;
    "schema:geo": {
      "@type": string;
      "schema:latitude": number;
      "schema:longitude": number;
    };
  };
}

export interface EthnobotanicalMetadata {
  id: string;
  name: string;
  scientificName: string;
  otherNames: string[];
  localNames: string[];
  family: string;
  origin: string;
  partsUsed: string[];
  image: string;
  description: string;
  medicinalQualities: string[];
  traditionalUses: string[];
  modernMedicine: ModernMedicine;
  homeopathicUses: HomeopathicUses;
  research: Research;
  references: string[];

  // Cultural & Ethical Metadata
  culturalAuthority: CulturalAuthority;
  labelDomain: LabelDomain;
  tkLabels?: string[];
  bcLabels?: string[];
  customCulturalId: string;
  docId: string;
  consentStatus: 'verified' | 'pending' | 'expired';
  consentExpiry: string;
  accessProtocol: string;
  benefitSharingAgreement: string;
  associatedTerritory: string;
  copyrightNotice: string;
  sensitivityLevel: SensitivityLevel;
  ipMetadata?: string;

  // Verification Workflow
  status: WorkflowStatus;
  currentStage: number;
  verificationStages: VerificationEvent[];
  feedback: string;
  publishedAt?: string;

  // Compliance Flags
  hasRequiredLabels: boolean;
  hasConsentDocumentation: boolean;
  hasGeographicPrecision: boolean;
  standardsCompliance: StandardsCompliance;

  // Audit & Export
  dateCreated: string;
  lastUpdated: string;
  createdBy: string;
  jsonLdExport?: JSONLdExport;
  location?: Location;
  locationMetadata?: GeographicalFeature[];
}

export interface ChemicalCompound {
  name: string;
  formula?: string;
  category: string;
  properties: string[];
  percentage?: number;
}

export interface SpeciesRelation {
  id: string;
  name: string;
  scientificName: string;
  relationship: 'parent' | 'sibling' | 'child' | 'related';
  similarity: number;
}
