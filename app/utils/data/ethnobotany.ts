import { useEthnobotanyStore } from '@/lib/store/ethnobotanyStore';
import { usePlantStore } from '@/lib/store/plantStore';
import type {
  EthnobotanicalMetadata,
  VerificationEvent,
  ChemicalCompound,
  SpeciesRelation,
} from '@/lib/types/ethnobotanical';

const generateVerificationEvents = (
  status: string,
  currentStage: number,
  plantName: string,
  authority: string
): VerificationEvent[] => {
  const stages = [
    { stage: 1, stageName: 'Initial Submission', completedBy: 'admin-001' },
    { stage: 2, stageName: 'Cultural Authority Review', completedBy: authority },
    { stage: 3, stageName: 'Scientific Verification', completedBy: 'Dr. Research Team' },
    { stage: 4, stageName: 'Final Approval', completedBy: 'Editorial Board' }
  ];

  return stages.map((s, index) => ({
    ...s,
    status: index < currentStage ? 'completed' : index === currentStage ? 'in_progress' : 'pending',
    timestamp: index < currentStage ? new Date(Date.now() - (stages.length - index) * 86400000).toISOString() : undefined,
    comments: index < currentStage ? `${s.stageName} completed for ${plantName}` : undefined
  })) as VerificationEvent[];
};

export const mockPlants: EthnobotanicalMetadata[] = [
  {
    id: 'plant-001',
    name: 'Dicoma anomala',
    scientificName: 'Dicoma anomala',
    otherNames: ['Fever bush', 'Stomach bush'],
    localNames: ['Pelobotlhoko', 'Tlhonya'],
    family: 'Asteraceae',
    origin: 'Sub-Saharan Africa',
    partsUsed: ['Roots', 'Leaves'],
    image: '/assets/botanical/Dicoma_anomala_500X500.jpg',
    description: "Dicoma anomala is a widespread African perennial herb valued for its medicinal versatility. Known locally as 'fever bush' or 'stomach bush,' it has woody rootstocks with annual stems, dark green serrated leaves, and mauve-white florets. It thrives in well-drained soils and dry grassland conditions. Traditionally used for fever, coughs, stomach issues, and skin disorders, the plant contains flavonoids with demonstrated anti-cancer, anti-parasitic, and anti-diabetic properties, along with antioxidant and hepatoprotective benefits.",
    medicinalQualities: [
      'Anti-cancer', 'Anti-parasitic', 'Anti-diabetic', 'Antioxidant',
      'Hepatoprotective', 'Antimicrobial', 'Anti-tumor'
    ],
    traditionalUses: [
      'Fever, colds, coughs, sore throats',
      'Intestinal issues: diarrhea, dysentery, worms',
      'Stomach and abdominal pain',
      'Malaria and syphilis',
      'Other sexually transmitted infections',
      'Diabetes and cardiac problems',
      'Wounds and skin disorders',
      'Respiratory complaints'
    ],
    modernMedicine: {
      activeCompounds: ['Flavonoids', 'Sesquiterpene lactones', 'Phenolic acids', 'Triterpenes'],
      clinicalStudies: [
        'Flavonoids isolated from Dicoma anomala demonstrated anti-cancer activity, especially in breast cancer cell lines.',
        'Extracts have shown antimicrobial and anti-diabetic properties.',
        'Studies highlight hepatoprotective and antioxidant effects beneficial for liver health.'
      ],
      approvedUses: [
        'Traditional decoctions for fever and stomach ailments',
        'Potential adjunct treatment in metabolic disorders (diabetes)',
        'Supportive therapy in antimicrobial and antioxidant treatments'
      ],
      contradictions: [
        'Limited toxicological studies; use with caution in pregnancy and lactation',
        'Not approved as a standardized pharmaceutical in most countries'
      ]
    },
    homeopathicUses: {
      preparations: ['Root decoctions', 'Root shavings', 'Powdered extracts'],
      conditions: [
        'Fever and colds',
        'Stomachaches and abdominal pain',
        'Intestinal worms and diarrhea',
        'Skin wounds and infections',
        'Respiratory issues'
      ],
      dosage: 'Traditionally consumed as a root decoction; dosage varies by community practice and preparation method. Modern standardized dosages are not yet established.'
    },
    research: {
      recentStudies: [
        {
          title: 'Flavonoid-rich extracts of Dicoma anomala show anti-tumor activity in breast cancer cell lines',
          year: 2021,
          findings: 'Flavonoids isolated from the roots demonstrated significant cytotoxicity against breast cancer cells.',
          source: 'Journal of Ethnopharmacology'
        },
        {
          title: 'Antimicrobial and anti-diabetic effects of Dicoma anomala extracts',
          year: 2019,
          findings: 'Extracts showed broad antimicrobial activity and improved glucose regulation in diabetic models.',
          source: 'South African Journal of Botany'
        },
        {
          title: 'Hepatoprotective effects of Dicoma anomala in carbon tetrachloride-induced liver damage',
          year: 2020,
          findings: 'Significant reduction in liver enzyme markers and improved tissue architecture.',
          source: 'Phytotherapy Research'
        }
      ],
      futureDirections: [
        'Clinical trials to evaluate safety and efficacy in humans',
        'Standardization of dosage and preparations',
        'Further exploration of hepatoprotective and antioxidant mechanisms',
        'Development of nutraceutical or phytopharmaceutical products'
      ]
    },
    references: [
      'Wildflower Nursery: Dicoma anomala profile',
      'Journal of Ethnopharmacology (2021) – Anti-tumor activity study',
      'South African Journal of Botany (2019) – Antimicrobial and anti-diabetic effects'
    ],
    culturalAuthority: {
      communityName: 'Batswana Traditional Healers Association',
      territory: 'Kalahari Desert Region, Botswana',
      representative: 'Dr. Mma Kgosi',
      contactEmail: 'healers@btha.bw',
      indigenousSystem: 'Traditional Healing Council Governance'
    },
    labelDomain: 'traditional',
    tkLabels: ['TK Verified', 'TK Open to Collaboration'],
    bcLabels: ['BC Consent Verified'],
    customCulturalId: 'BTSA-MED-2024-001',
    docId: 'doi:10.5281/ethnoflora.BTSA-MED-2024-001',
    consentStatus: 'verified',
    consentExpiry: '2030-12-31',
    accessProtocol: 'For educational and non-commercial research only. Commercial use requires direct engagement with BTHA and formal benefit-sharing agreement.',
    benefitSharingAgreement: 'https://example.com/btha-benefit-sharing.pdf',
    associatedTerritory: 'Kalahari Desert Region, Botswana',
    copyrightNotice: '© Batswana Traditional Healers Association, 2024. All rights reserved under the Berne Convention.',
    sensitivityLevel: 'public',
    ipMetadata: 'CC BY-NC-ND 4.0',
    status: 'published',
    currentStage: 3,
    verificationStages: generateVerificationEvents('published', 3, 'Dicoma anomala', 'Batswana Traditional Healers Association'),
    feedback: '',
    publishedAt: '2024-01-17T09:15:00Z',
    hasRequiredLabels: true,
    hasConsentDocumentation: true,
    hasGeographicPrecision: true,
    standardsCompliance: {
      darwinCore: true,
      localContexts: true,
      nagoyaProtocol: true,
      berneConvention: true
    },
    dateCreated: '2024-01-15T10:00:00Z',
    lastUpdated: '2024-01-17T09:15:00Z',
    createdBy: 'admin-001',
    location: {
      unescoSite: false,
      undpSupported: true
    },
    locationMetadata: [
      {
        id: 'geo-001',
        type: 'Point',
        name: 'Kgalagadi Transfrontier Park - Primary Collection Site',
        description: 'Main collection area within the park boundaries, near Twee Rivieren',
        geometry: {
          coordinates: [20.6117, -26.4725]
        }
      },
      {
        id: 'geo-002',
        type: 'Point',
        name: 'Tsabong Traditional Healer Station',
        description: 'Community health center where traditional preparations are made',
        geometry: {
          coordinates: [22.4500, -26.0500]
        }
      },
      {
        id: 'geo-003',
        type: 'Circle',
        name: 'Nossob Valley Distribution Zone',
        description: 'Extended range where the species has been documented',
        geometry: {
          coordinates: [20.4500, -25.7500],
          radiusMeters: 15000
        }
      },
      {
        id: 'geo-004',
        type: 'Point',
        name: 'Bokspits Village Collection Area',
        description: 'Community-based harvesting zone with traditional stewardship',
        geometry: {
          coordinates: [20.7000, -26.9000]
        }
      },
      {
        id: 'geo-005',
        type: 'Point',
        name: 'Mabuasehube Research Station',
        description: 'Botanical research and documentation center',
        geometry: {
          coordinates: [22.0833, -24.7500]
        }
      }
    ],

   galleryImages: [
      {
        id: 'img-001',
        url: '/assets/botanical/Dicoma_anomala_500X500.jpg',
        captions: 'Dicoma anomala in its natural Kalahari habitat',
        credit: 'BTHA Field Research Team',
        isBanner: true,
        date_added: '2024-01-15T10:00:00Z'
      },
      {
        id: 'img-002',
        url: '/assets/botanical/Artemisia-afra.jpg',
        captions: 'Woody rootstock used in traditional medicine preparations',
        credit: 'Dr. Mma Kgosi',
        date_added: '2024-01-15T10:30:00Z'
      },
      {
        id: 'img-003',
        url: '/assets/botanical/Marula.jpg',
        captions: 'Mauve-white florets characteristic of the species',
        credit: 'Kgalagadi Botanical Survey',
        date_added: '2024-01-16T08:00:00Z'
      },
    ],

    jsonLdExport: {
      "@context": {
        dwc: "http://rs.tdwg.org/dwc/terms/",
        lc: "http://localcontexts.org/terms/",
        schema: "https://schema.org/",
        geo: "http://www.opengis.net/ont/geosparql#"
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
        "schema:name": "Kgalagadi Desert Region, Botswana",
        "schema:geo": {
          "@type": "schema:GeoCoordinates",
          "schema:latitude": -25.5,
          "schema:longitude": 21.5
        }
      }
    }
  }
];

export const chemicalCompounds: ChemicalCompound[] = [
  { name: 'Quercetin', formula: 'C₁₅H₁₀O₇', category: 'Flavonoid', properties: ['Antioxidant', 'Anti-inflammatory'], percentage: 12.5 },
  { name: 'Kaempferol', formula: 'C₁₅H₁₀O₆', category: 'Flavonoid', properties: ['Anti-cancer', 'Cardioprotective'], percentage: 8.3 },
  { name: 'Luteolin', formula: 'C₁₅H₁₀O₆', category: 'Flavonoid', properties: ['Neuroprotective', 'Anti-allergic'], percentage: 6.7 },
  { name: 'Germacranolide', formula: 'C₁₅H₂₀O₃', category: 'Sesquiterpene Lactone', properties: ['Anti-tumor', 'Antimicrobial'], percentage: 15.2 },
  { name: 'Caffeic acid', formula: 'C₉H₈O₄', category: 'Phenolic Acid', properties: ['Antioxidant', 'Anti-viral'], percentage: 4.1 },
  { name: 'Oleanolic acid', formula: 'C₃₀H₄₈O₃', category: 'Triterpene', properties: ['Hepatoprotective', 'Anti-diabetic'], percentage: 9.8 }
];

export const relatedSpecies: SpeciesRelation[] = [
  { id: 'sp-001', name: 'Dicoma capensis', scientificName: 'Dicoma capensis', relationship: 'sibling', similarity: 85 },
  { id: 'sp-002', name: 'Dicoma tomentosa', scientificName: 'Dicoma tomentosa', relationship: 'sibling', similarity: 78 },
  { id: 'sp-003', name: 'Vernonia amygdalina', scientificName: 'Vernonia amygdalina', relationship: 'related', similarity: 45 },
  { id: 'sp-004', name: 'Artemisia afra', scientificName: 'Artemisia afra', relationship: 'related', similarity: 38 }
];

export const getPlantById = (id: string):  Partial<EthnobotanicalMetadata> | undefined => {


  // causing SSR + circular dependency issues, so we will just pull from the plant store directly for now
  const {plants} = usePlantStore.getState();


  const plant = plants.find(p => p.id === id);
  // if(!plant) {
  //     return mockPlants.find(plant => plant.id === id);
  // }

  return plant as Partial<EthnobotanicalMetadata>;
};
