export interface MedicinalPlant {
  id: string
  name: string
  scientificName: string
  otherNames?: string[]
  localNames?: string[]
  family: string
  origin: string
  partsUsed: string[]
  image: string
  description: string
  medicinalQualities: string[]
  traditionalUses: string[]
  modernMedicine: {
    activeCompounds: string[]
    clinicalStudies: string[]
    approvedUses: string[]
    contradictions: string[]
  }
  homeopathicUses: {
    preparations: string[]
    conditions: string[]
    dosage: string
  }
  research: {
    recentStudies: Array<{
      title: string
      year: number
      findings: string
      source: string
    }>
    futureDirections: string[]
  }
  references: string[]
  creditors?: {
    creditor: Array<{
      name: string
      url: string
    }>
  }
}

export interface BotanicalSearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedFamily: string
  onFamilyChange: (value: string) => void
  selectedOrigin: string
  onOriginChange: (value: string) => void
  selectedPartUsed: string
  onPartUsedChange: (value: string) => void
  selectedCondition: string
  onConditionChange: (value: string) => void
  onClearFilters: () => void
}
// Sengaparile (Devil’s Claw)
// ● Scientific Name: Harpagophytum procumbens

// 2. Lengana / Musuzwane (African Wormwood)
// ● Scientific Name: Artemisia afra

// 3. Mosukujane (Wild Mint)
// ● Scientific Name: Mentha longifolia


// 4. Morula (Marula)
// ● Scientific Name: Sclerocarya birrea

// 5. Mokgalo (African Sage)
// ● Scientific Name: Tarchonanthus camphoratus


// 6. Motlopi (Shepherd’s Tree)
// ● Scientific Name: Boscia albitrunca


// 7. Mowana (Baobab)
// ● Scientific Name: Adansonia digitata

// 8. Mokgopa (Mopane)
// ● Scientific Name: Colophospermum mopane

// 9. Mosu (Camelthorn)
// ● Scientific Name: Acacia tortilis


// 10. Motshikiri (Sweet Thorn)
// ● Scientific Name: Vachellia karroo

// 11. Lerotse (Tsamma Melon)
// ● Scientific Name: Citrullus lanatus

// 12. Mosetlha (Sickle Bush)
// ● Scientific Name: Dichrostachys cinerea

// 13. Mosukudu (Wild Medlar)
// ● Scientific Name: Vangueria infausta

// 14. Mohlokohloko (Christmas Berry)
// ● Scientific Name: Sarcocephalus latifolius

// 15. Moretlwa (Raisin Bush)
// ● Scientific Name: Grewia flava


// 16. Mokhure (Jackal Berry)
// ● Scientific Name: Diospyros mespiliformis

// 17. Mokwala (Blackthorn)
// ● Scientific Name: Senegalia mellifera

// 18. Mosima (Wild Pear)
// ● Scientific Name: Dombeya rotundifolia

// 19. Mokalabata (Milk Plum)
// ● Scientific Name: Englerophytum magalismontanum

// 20. Mukokomani (Aloe)
// ● Scientific Name: Aloe marlothii

// 21. Muganu (Bird Plum)
// ● Scientific Name: Berchemia discolor

// 22. Murumanyama (Sandpaper Bush)
// ● Scientific Name: Commiphora marlothii


// lib/types/ethnobotany.ts

import { LabelDomain } from './labels';
import { SensitivityLevel } from './sitesData'

export type CulturalProtocol =
  | 'PUBLIC'
  | 'COMMUNITY_ONLY'
  | 'ELDER_APPROVAL_REQUIRED'
  | 'GENDER_RESTRICTED';

export interface CulturalAuthority {
  communityName: string;
  territory: string; // e.g., "Tlingit Aani, Southeast Alaska"
  representative?: string;
  contactEmail?: string;
  indigenousSystem?:string;
}


export type VerificationRole =
  | 'admin'
  | 'ethnoExpert'
  | 'communityLeader'
  | 'ethnoCouncilMember'
  | 'superAdmin';


export type RecordStatus =
  | 'draft'               // Stage 1: Admin capture
  | 'pending_review'      // Stage 2: Officer/Expert verification
  | 'pending_approval'    // Stage 3: Final approval
  | 'published'           // Approved & public
  | 'denied'              // Rejected with feedback
  | 'revision_requested'; // Sent back to admin


export interface VerificationEvent {
  stage: number;
  role: VerificationRole;
  userId: string;
  userName: string;
  timestamp: string; // ISO 8601
  action: 'submit_for_review' | 'approve' | 'request_revision' | 'deny' | 'publish';
  comments?: string;
  signature: string; // Blockchain signature hash
}

export type EthnobotanicalMetadataMode = 'create' | 'edit';


export type GeographicalFeatureType =
  | 'Point'        // Single collection site
  | 'Polygon'      // Traditional use area / territory boundary
  | 'Circle'       // Buffer zone around sensitive location
  | 'LineString'   // Migration route / trade path
  | 'MultiPoint'   // Multiple verified occurrence sites


export interface GeographicalFeature {
  id: string; // UUID for feature-level tracking
  type: GeographicalFeatureType;

  // GEOMETRY (GeoJSON-compliant coordinates)
  geometry: {
    // Point: [longitude, latitude] - GeoJSON standard order
    coordinates?: number | number[] | number[][] | number[][][];
    // Circle-specific (non-GeoJSON extension)
    radiusMeters?: number; // Buffer radius for sensitive locations
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
  sensitivityLevel: SensitivityLevel;
  modernMedicine: {
    activeCompounds: string[];
    clinicalStudies: string[];
    approvedUses: string[];
    contradictions: string[];
  };
  homeopathicUses: {
    preparations: string[];
    conditions: string[];
    dosage: string;
  };
  research: {
    recentStudies: Array<{
      title: string;
      year: number;
      findings: string;
      source: string;
    }>;
    futureDirections: string[];
  };
  references: string[];

  // ✅ NEW: Culturally aware & legally compliant fields
  culturalAuthority: CulturalAuthority;
  labelDomain: LabelDomain; // 'traditional' | 'biocultural'
  tkLabels: string[];       // e.g., ['TK Verified', 'TK Open to Collaboration']
  bcLabels: string[];       // e.g., ['BC Consent Verified']
  customCulturalId: string; // e.g., 'TLINGIT-MED-2024-001'
  docId?: string;           // DOI or Handle.net persistent ID
  consentStatus: 'verified' | 'non-verified' | 'pending' | 'withdrawn';
  consentExpiry?: string;   // ISO date
  accessProtocol: string;   // Human-readable usage terms
  benefitSharingAgreement?: string; // URL to agreement
  associatedTerritory: string;
  copyrightNotice: string;  // Berne-compliant notice

    // === VERIFICATION METADATA (Critical Addition) ===
  status?: RecordStatus;
  verificationStages: VerificationEvent[]; // Immutable audit trail
  currentStage: number
  feedback?: string; // For denied/revision requests
  publishedAt?: string;

  // === COMPLIANCE FLAGS (Auto-validated) ===
  hasRequiredLabels?: boolean; // TK/BC labels present
  hasConsentDocumentation?: boolean;
  hasGeographicPrecision?: boolean; // Coordinates meet sensitivity rules
  standardsCompliance?: {
    darwinCore?: boolean;
    localContexts?: boolean;
    nagoyaProtocol?: boolean;
    berneConvention?: boolean;
  };

    // === AUDIT ===
  dateCreated?: string;
  lastUpdated?: string;
  createdBy?: string; // Community ID or email

  location?: {
    unescoSite?: boolean,
    undpSupported?: boolean,
    latitude?: string,
    longitude?:string,
  };

  locationMetadata: GeographicalFeature[];
  jsonLdExport:{
    "@context": {
      "dwc": "http://rs.tdwg.org/dwc/terms/",
      "lc": "http://localcontexts.org/terms/",
      "schema": "https://schema.org/",
      "geo": "http://www.opengis.net/ont/geosparql#"
    },
    "@type": "schema:Dataset",
    "@id": "doi:10.5281/ethnoflora.BTSA-MED-2024-001",
    "dwc:scientificName": "Dicoma anomala",
    "dwc:family": "Asteraceae",
    "lc:tkLabels": ["TK Verified", "TK Open to Collaboration"],
    "lc:bcLabels": ["BC Consent Verified"],
    "lc:culturalAuthority": "Batswana Traditional Healers Association",
    "lc:customCulturalId": "BTSA-MED-2024-001",
    "schema:name": "Dicoma anomala (Fever bush)",
    "schema:description": "Medicinal plant used for fever, stomach issues, and skin disorders",
    "schema:license": "© Batswana Traditional Healers Association, 2024. All rights reserved under the Berne Convention.",
    "schema:datePublished": "2024-01-17",
    "schema:spatialCoverage": {
      "@type": "schema:Place",
      "schema:name": "Kalahari Desert Region, Botswana",
      "schema:geo": {
        "@type": "schema:GeoCoordinates",
        "schema:latitude": -22.5,
        "schema:longitude": 24.0
      }
    }
  }, // Serialized JSON-LD at publication


}


export interface ResearchArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  fullDescription: string;
  keyFindings: string[];
  relatedTopics: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
