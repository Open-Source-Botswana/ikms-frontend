// import { EthnobotanicalMetadata, MedicinalPlant } from '@/lib/types/botanical';
// import { LabelDomain } from '@/lib/types/labels';
// import { SensitivityLevel } from '@/lib/types/sitesData';


// // lib/data/mockPlants.ts

// export const mockFinalPlants: EthnobotanicalMetadata[] = [
//   // ===== PUBLISHED RECORD (Complete workflow) =====
//   {
//     id: 'plant-001',
//     name: 'Dicoma anomala',
//     scientificName: 'Dicoma anomala',
//     otherNames: ['Fever bush', 'Stomach bush'],
//     localNames: ['Pelobotlhoko', 'Tlhonya'],
//     family: 'Asteraceae',
//     origin: 'Sub-Saharan Africa',
//     partsUsed: ['Roots', 'Leaves'],
//     image: '/assets/botanical/Dicoma_anomala_500X500.jpg',
//     description: "Dicoma anomala is a widespread African perennial herb valued for its medicinal versatility. Known locally as 'fever bush' or 'stomach bush,' it has woody rootstocks with annual stems, dark green serrated leaves, and mauve-white florets. It thrives in well-drained soils and dry grassland conditions. Traditionally used for fever, coughs, stomach issues, and skin disorders, the plant contains flavonoids with demonstrated anti-cancer, anti-parasitic, and anti-diabetic properties, along with antioxidant and hepatoprotective benefits.",
//     medicinalQualities: [
//       'Anti-cancer', 'Anti-parasitic', 'Anti-diabetic', 'Antioxidant',
//       'Hepatoprotective', 'Antimicrobial', 'Anti-tumor'
//     ],
//     traditionalUses: [
//       'Fever, colds, coughs, sore throats',
//       'Intestinal issues: diarrhea, dysentery, worms',
//       'Stomach and abdominal pain',
//       'Malaria and syphilis',
//       'Other sexually transmitted infections',
//       'Diabetes and cardiac problems',
//       'Wounds and skin disorders',
//       'Respiratory complaints'
//     ],
//     modernMedicine: {
//       activeCompounds: ['Flavonoids'],
//       clinicalStudies: [
//         'Flavonoids isolated from Dicoma anomala demonstrated anti-cancer activity, especially in breast cancer cell lines.',
//         'Extracts have shown antimicrobial and anti-diabetic properties.',
//         'Studies highlight hepatoprotective and antioxidant effects beneficial for liver health.'
//       ],
//       approvedUses: [
//         'Traditional decoctions for fever and stomach ailments',
//         'Potential adjunct treatment in metabolic disorders (diabetes)',
//         'Supportive therapy in antimicrobial and antioxidant treatments'
//       ],
//       contradictions: [
//         'Limited toxicological studies; use with caution in pregnancy and lactation',
//         'Not approved as a standardized pharmaceutical in most countries'
//       ]
//     },
//     homeopathicUses: {
//       preparations: ['Root decoctions', 'Root shavings', 'Powdered extracts'],
//       conditions: [
//         'Fever and colds',
//         'Stomachaches and abdominal pain',
//         'Intestinal worms and diarrhea',
//         'Skin wounds and infections',
//         'Respiratory issues'
//       ],
//       dosage: 'Traditionally consumed as a root decoction; dosage varies by community practice and preparation method. Modern standardized dosages are not yet established.'
//     },
//     research: {
//       recentStudies: [
//         {
//           title: 'Flavonoid-rich extracts of Dicoma anomala show anti-tumor activity in breast cancer cell lines',
//           year: 2021,
//           findings: 'Flavonoids isolated from the roots demonstrated significant cytotoxicity against breast cancer cells.',
//           source: 'Journal of Ethnopharmacology'
//         },
//         {
//           title: 'Antimicrobial and anti-diabetic effects of Dicoma anomala extracts',
//           year: 2019,
//           findings: 'Extracts showed broad antimicrobial activity and improved glucose regulation in diabetic models.',
//           source: 'South African Journal of Botany'
//         }
//       ],
//       futureDirections: [
//         'Clinical trials to evaluate safety and efficacy in humans',
//         'Standardization of dosage and preparations',
//         'Further exploration of hepatoprotective and antioxidant mechanisms',
//         'Development of nutraceutical or phytopharmaceutical products'
//       ]
//     },
//     references: [
//       'Wildflower Nursery: Dicoma anomala profile',
//       'Journal of Ethnopharmacology (2021) – Anti-tumor activity study',
//       'South African Journal of Botany (2019) – Antimicrobial and anti-diabetic effects'
//     ],
//     // === CULTURAL & ETHICAL METADATA ===
//     culturalAuthority: {
//       communityName: 'Batswana Traditional Healers Association',
//       territory: 'Kalahari Desert Region, Botswana',
//       representative: 'Dr. Mma Kgosi',
//       contactEmail: 'healers@btha.bw',
//       indigenousSystem: 'Traditional Healing Council Governance'
//     },
//     labelDomain: 'traditional' as LabelDomain,
//     tkLabels: ['TK Verified', 'TK Open to Collaboration'],
//     bcLabels: ['BC Consent Verified'],
//     customCulturalId: 'BTSA-MED-2024-001',
//     docId: 'doi:10.5281/ethnoflora.BTSA-MED-2024-001',
//     consentStatus: 'verified',
//     consentExpiry: '2030-12-31',
//     accessProtocol: 'For educational and non-commercial research only. Commercial use requires direct engagement with BTHA and formal benefit-sharing agreement.',
//     benefitSharingAgreement: 'https://example.com/btha-benefit-sharing.pdf',
//     associatedTerritory: 'Kalahari Desert Region, Botswana',
//     copyrightNotice: '© Batswana Traditional Healers Association, 2024. All rights reserved under the Berne Convention.',
//     sensitivityLevel: 'public' as SensitivityLevel,
//     // ipMetadata: 'CC BY-NC-ND 4.0',
//     // === VERIFICATION WORKFLOW ===
//     status: 'published',
//     currentStage: 3,
//     verificationStages:[],
//     // verificationStages: generateVerificationEvents('published', 3, 'Dicoma anomala', 'Batswana Traditional Healers Association'),
//     feedback: '',
//     publishedAt: '2024-01-17T09:15:00Z',
//     // === COMPLIANCE FLAGS ===
//     hasRequiredLabels: true,
//     hasConsentDocumentation: true,
//     hasGeographicPrecision: true,
//     standardsCompliance: {
//       darwinCore: true,
//       localContexts: true,
//       nagoyaProtocol: true,
//       berneConvention: true
//     },
//     // === AUDIT & EXPORT ===
//     dateCreated: '2024-01-15T10:00:00Z',
//     lastUpdated: '2024-01-17T09:15:00Z',
//     createdBy: 'admin-001',
//     jsonLdExport:{
//     "@context": {
//       "dwc": "http://rs.tdwg.org/dwc/terms/",
//       "lc": "http://localcontexts.org/terms/",
//       "schema": "https://schema.org/",
//       "geo": "http://www.opengis.net/ont/geosparql#"
//     },
//     "@type": "schema:Dataset",
//     "@id": "doi:10.5281/ethnoflora.BTSA-MED-2024-001",
//     "dwc:scientificName": "Dicoma anomala",
//     "dwc:family": "Asteraceae",
//     "lc:tkLabels": ["TK Verified", "TK Open to Collaboration"],
//     "lc:bcLabels": ["BC Consent Verified"],
//     "lc:culturalAuthority": "Batswana Traditional Healers Association",
//     "lc:customCulturalId": "BTSA-MED-2024-001",
//     "schema:name": "Dicoma anomala (Fever bush)",
//     "schema:description": "Medicinal plant used for fever, stomach issues, and skin disorders",
//     "schema:license": "© Batswana Traditional Healers Association, 2024. All rights reserved under the Berne Convention.",
//     "schema:datePublished": "2024-01-17",
//     "schema:spatialCoverage": {
//       "@type": "schema:Place",
//       "schema:name": "Kalahari Desert Region, Botswana",
//       "schema:geo": {
//         "@type": "schema:GeoCoordinates",
//         "schema:latitude": -22.5,
//         "schema:longitude": 24.0
//       }
//     }
//     } ,
//     location: {
//       unescoSite: false,
//       undpSupported: true,
//       latitude: "-22.5",
//       longitude: "24.0"
//     }
//   },
// ]

// export const mockPlants: EthnobotanicalMetadata[] = [
//   {
//     id: '1',
//     name: 'Dicoma anomala',
//     scientificName: 'Dicoma anomala',
//     otherNames: ['Fever bush', 'Stomach bush'],
//     localNames: ['Pelobotlhoko', 'Tlhonya'],
//     family: 'Asteraceae',
//     origin: 'Sub-Saharan Africa',
//     partsUsed: ['Roots', 'Leaves'],
//     image: '/assets/botanical/Boscia-albitrunca.jpg',
//     description: "Dicoma anomala is a widespread African perennial herb...",
//     // ... keep all your existing fields ...
//     // ✅ NEW ETHICAL METADATA
//     culturalAuthority: {
//       communityName: 'Batswana Traditional Healers Association',
//       territory: 'Botswana, Southern Africa',
//       representative: 'Dr. Mma Kgosi',
//       contactEmail: 'healers@btha.bw',
//     },
//     labelDomain: 'traditional',
//     tkLabels: ['TK Verified', 'TK Open to Collaboration'],
//     bcLabels: ['BC Consent Verified'],
//     customCulturalId: 'BTSA-MED-2024-001',
//     docId: 'doi:10.5281/zenodo.1234567',
//     consentStatus: 'verified',
//     consentExpiry: '2030-12-31',
//     accessProtocol: 'For educational and non-commercial research only. Commercial use requires direct engagement with BTHA.',
//     benefitSharingAgreement: 'https://example.com/btha-benefit-sharing.pdf',
//     associatedTerritory: 'Kalahari Desert Region, Botswana',
//     copyrightNotice: '© Batswana Traditional Healers Association, 2024. All rights reserved under the Berne Convention.',
//     medicinalQualities: [],
//     traditionalUses: [],
//     modernMedicine: {
//       activeCompounds: [],
//       clinicalStudies: [],
//       approvedUses: [],
//       contradictions: []
//     },
//     homeopathicUses: {
//       preparations: [],
//       conditions: [],
//       dosage: ''
//     },
//     research: {
//       recentStudies: [],
//       futureDirections: []
//     },
//     references: []
//   },
//   {
//     id: '2',
//     name: 'Echinacea',
//     scientificName: 'Echinacea purpurea',
//     // ... existing fields ...
//     culturalAuthority: {
//       communityName: 'Lakota Nation',
//       territory: 'Pine Ridge Reservation, South Dakota, USA',
//       representative: 'Elder Mary Running Wolf',
//     },
//     labelDomain: 'traditional',
//     tkLabels: ['TK Attribution', 'TK Family Only'],
//     bcLabels: ['BC Consent Non-Verified'],
//     customCulturalId: 'LAKOTA-MED-2024-002',
//     consentStatus: 'non-verified',
//     accessProtocol: 'Knowledge shared for educational purposes only. Not for commercial use or redistribution without explicit consent from Lakota Elders Council.',
//     associatedTerritory: 'Oceti Sakowin (Great Sioux Nation)',
//     copyrightNotice: '© Lakota Nation, 2024. This knowledge is protected under the Berne Convention.',
//     otherNames: [],
//     localNames: [],
//     family: '',
//     origin: '',
//     partsUsed: [],
//     image: '/assets/botanical/Acacia-tortilis.jpg',
//     description: '',
//     medicinalQualities: [],
//     traditionalUses: [],
//     modernMedicine: {
//       activeCompounds: [],
//       clinicalStudies: [],
//       approvedUses: [],
//       contradictions: []
//     },
//     homeopathicUses: {
//       preparations: [],
//       conditions: [],
//       dosage: ''
//     },
//     research: {
//       recentStudies: [],
//       futureDirections: []
//     },
//     references: []
//   },
//   // ... update Turmeric, Ginseng, etc. similarly ...
// ];

// export const mockPlants3: MedicinalPlant[] = [
//   {
//     id: '1',
//     name: 'Dicoma anomala',
//     scientificName: 'Dicoma anomala',
//     otherNames: ['Fever bush', 'Stomach bush'],
//     localNames: ['Pelobotlhoko', 'Tlhonya'],
//     family: 'Asteraceae',
//     origin: 'Sub-Saharan Africa',
//     partsUsed: ['Roots', 'Leaves'],
//     image: 'assets/botanical/Dicoma_anomala_500X500.jpg',
//     description:
//       "Dicoma anomala is a widespread African perennial herb valued for its medicinal versatility. Known locally as 'fever bush' or 'stomach bush,' it has woody rootstocks with annual stems, dark green serrated leaves, and mauve-white florets. It thrives in well-drained soils and dry grassland conditions. Traditionally used for fever, coughs, stomach issues, and skin disorders, the plant contains flavonoids with demonstrated anti-cancer, anti-parasitic, and anti-diabetic properties, along with antioxidant and hepatoprotective benefits.",
//     medicinalQualities: [
//       'Anti-cancer',
//       'Anti-parasitic',
//       'Anti-diabetic',
//       'Antioxidant',
//       'Hepatoprotective',
//       'Antimicrobial',
//       'Anti-tumor',
//     ],
//     traditionalUses: [
//       'Fever, colds, coughs, sore throats',
//       'Intestinal issues: diarrhea, dysentery, worms',
//       'Stomach and abdominal pain',
//       'Malaria and syphilis',
//       'Other sexually transmitted infections',
//       'Diabetes and cardiac problems',
//       'Wounds and skin disorders',
//       'Respiratory complaints',
//     ],
//     modernMedicine: {
//       activeCompounds: ['Flavonoids'],
//       clinicalStudies: [
//         'Flavonoids isolated from Dicoma anomala demonstrated anti-cancer activity, especially in breast cancer cell lines.',
//         'Extracts have shown antimicrobial and anti-diabetic properties.',
//         'Studies highlight hepatoprotective and antioxidant effects beneficial for liver health.',
//       ],
//       approvedUses: [
//         'Traditional decoctions for fever and stomach ailments',
//         'Potential adjunct treatment in metabolic disorders (diabetes)',
//         'Supportive therapy in antimicrobial and antioxidant treatments',
//       ],
//       contradictions: [
//         'Limited toxicological studies; use with caution in pregnancy and lactation',
//         'Not approved as a standardized pharmaceutical in most countries',
//       ],
//     },
//     homeopathicUses: {
//       preparations: ['Root decoctions', 'Root shavings', 'Powdered extracts'],
//       conditions: [
//         'Fever and colds',
//         'Stomachaches and abdominal pain',
//         'Intestinal worms and diarrhea',
//         'Skin wounds and infections',
//         'Respiratory issues',
//       ],
//       dosage:
//         'Traditionally consumed as a root decoction; dosage varies by community practice and preparation method. Modern standardized dosages are not yet established.',
//     },
//     research: {
//       recentStudies: [
//         {
//           title:
//             'Flavonoid-rich extracts of Dicoma anomala show anti-tumor activity in breast cancer cell lines',
//           year: 2021,
//           findings:
//             'Flavonoids isolated from the roots demonstrated significant cytotoxicity against breast cancer cells.',
//           source: 'Journal of Ethnopharmacology',
//         },
//         {
//           title:
//             'Antimicrobial and anti-diabetic effects of Dicoma anomala extracts',
//           year: 2019,
//           findings:
//             'Extracts showed broad antimicrobial activity and improved glucose regulation in diabetic models.',
//           source: 'South African Journal of Botany',
//         },
//       ],
//       futureDirections: [
//         'Clinical trials to evaluate safety and efficacy in humans',
//         'Standardization of dosage and preparations',
//         'Further exploration of hepatoprotective and antioxidant mechanisms',
//         'Development of nutraceutical or phytopharmaceutical products',
//       ],
//     },
//     references: [
//       'Wildflower Nursery: Dicoma anomala profile',
//       'Journal of Ethnopharmacology (2021) – Anti-tumor activity study',
//       'South African Journal of Botany (2019) – Antimicrobial and anti-diabetic effects',
//     ],
//   },
//   {
//     id: '2',
//     name: 'Echinacea',
//     scientificName: 'Echinacea purpurea',
//     family: 'Asteraceae',
//     origin: 'North America',
//     partsUsed: ['Roots', 'Leaves', 'Flowers'],
//     image:
//       'https://images.unsplash.com/photo-1662411271553-e18d7ef508f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY2hpbmFjZWElMjBwdXJwbGUlMjBmbG93ZXJ8ZW58MXx8fHwxNzU3Mzg5MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     description:
//       'Purple coneflower used traditionally for immune support and wound healing.',
//     medicinalQualities: [
//       'Immunostimulant',
//       'Anti-inflammatory',
//       'Antioxidant',
//       'Antimicrobial',
//     ],
//     traditionalUses: [
//       'Cold and flu prevention',
//       'Wound healing',
//       'Respiratory infections',
//       'Skin conditions',
//     ],
//     modernMedicine: {
//       activeCompounds: [
//         'Alkylamides',
//         'Cichoric acid',
//         'Polysaccharides',
//         'Flavonoids',
//       ],
//       clinicalStudies: [
//         'Reduced cold duration by 1.4 days in meta-analysis',
//         'Modest immune system enhancement in healthy adults',
//       ],
//       approvedUses: [
//         'Upper respiratory tract infections (Germany)',
//         'Topical wound healing',
//       ],
//       contradictions: [
//         'Autoimmune disorders',
//         'Progressive systemic diseases',
//         'Pregnancy (insufficient data)',
//       ],
//     },
//     homeopathicUses: {
//       preparations: [
//         'Tincture 1:5',
//         'Mother tincture',
//         'Low potencies (3X-6X)',
//       ],
//       conditions: [
//         'Recurrent infections',
//         'Septic conditions',
//         'Boils and abscesses',
//       ],
//       dosage: '5-10 drops TID for acute conditions',
//     },
//     research: {
//       recentStudies: [
//         {
//           title: 'Echinacea for preventing and treating the common cold',
//           year: 2023,
//           findings:
//             'Moderate evidence for prevention, limited evidence for treatment',
//           source: 'Cochrane Review',
//         },
//         {
//           title: 'Immunomodulatory effects of Echinacea preparations',
//           year: 2022,
//           findings: 'Significant enhancement of innate immune responses',
//           source: 'Journal of Ethnopharmacology',
//         },
//       ],
//       futureDirections: [
//         'Standardization of preparations',
//         'Optimal dosing protocols',
//         'Long-term safety studies',
//       ],
//     },
//     references: [
//       'Barnes, J. et al. (2005). Echinacea species (Echinacea angustifolia, E. pallida, E. purpurea)',
//       'Shah, S.A. et al. (2007). Evaluation of echinacea for the prevention and treatment of the common cold',
//     ],
//   },
//   {
//     id: '3',
//     name: 'Turmeric',
//     scientificName: 'Curcuma longa',
//     family: 'Zingiberaceae',
//     origin: 'Southeast Asia',
//     partsUsed: ['Rhizome'],
//     image:
//       'https://images.unsplash.com/photo-1717483587555-dc38170a5c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMGN1cmN1bWF8ZW58MXx8fHwxNzU3Mzg5MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     description:
//       'Golden spice with powerful anti-inflammatory and antioxidant properties.',
//     medicinalQualities: [
//       'Anti-inflammatory',
//       'Antioxidant',
//       'Hepatoprotective',
//       'Neuroprotective',
//     ],
//     traditionalUses: [
//       'Digestive disorders',
//       'Skin conditions',
//       'Joint pain',
//       'Liver support',
//     ],
//     modernMedicine: {
//       activeCompounds: [
//         'Curcumin',
//         'Demethoxycurcumin',
//         'Bisdemethoxycurcumin',
//         'Turmerones',
//       ],
//       clinicalStudies: [
//         'Effective for osteoarthritis pain',
//         'Potential benefits in depression',
//         'Anti-inflammatory markers reduced',
//       ],
//       approvedUses: [
//         'Dietary supplement (US)',
//         'Traditional medicine (India, China)',
//       ],
//       contradictions: [
//         'Gallstones',
//         'Bleeding disorders',
//         'Pregnancy (high doses)',
//       ],
//     },
//     homeopathicUses: {
//       preparations: ['Mother tincture', 'Low potencies (3X-12X)'],
//       conditions: [
//         'Digestive complaints',
//         'Skin eruptions',
//         'Liver congestion',
//       ],
//       dosage: '5-15 drops TID with meals',
//     },
//     research: {
//       recentStudies: [
//         {
//           title: 'Curcumin for osteoarthritis: A systematic review',
//           year: 2023,
//           findings:
//             'Significant reduction in pain and stiffness compared to placebo',
//           source: 'Arthritis Research & Therapy',
//         },
//         {
//           title:
//             'Neuroprotective effects of curcumin in neurodegenerative diseases',
//           year: 2022,
//           findings: 'Promising results in animal models, limited human data',
//           source: 'Nature Reviews Drug Discovery',
//         },
//       ],
//       futureDirections: [
//         'Bioavailability enhancement',
//         'Standardized extracts',
//         'Combination therapies',
//       ],
//     },
//     references: [
//       'Aggarwal, B.B. et al. (2007). Curcumin: The Indian solid gold',
//       'Hewlings, S.J. & Kalman, D.S. (2017). Curcumin: A review of its effects on human health',
//     ],
//   },
//   {
//     id: '4',
//     name: 'Ginseng',
//     scientificName: 'Panax ginseng',
//     family: 'Araliaceae',
//     origin: 'East Asia',
//     partsUsed: ['Root'],
//     image:
//       'https://images.unsplash.com/photo-1630623092021-5033ec198e4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5zZW5nJTIwcm9vdHxlbnwxfHx8fDE3NTczODkxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     description:
//       'Adaptogenic root used for energy, stress relief, and cognitive enhancement.',
//     medicinalQualities: [
//       'Adaptogenic',
//       'Cognitive enhancer',
//       'Energy booster',
//       'Immunomodulator',
//     ],
//     traditionalUses: [
//       'Fatigue',
//       'Stress',
//       'Memory enhancement',
//       'Sexual dysfunction',
//     ],
//     modernMedicine: {
//       activeCompounds: [
//         'Ginsenosides',
//         'Polysaccharides',
//         'Peptides',
//         'Polyacetylenes',
//       ],
//       clinicalStudies: [
//         'Improved cognitive function in healthy adults',
//         'Enhanced physical performance',
//         'Blood glucose regulation',
//       ],
//       approvedUses: [
//         'Dietary supplement (global)',
//         'Traditional medicine (Asia)',
//       ],
//       contradictions: [
//         'Hypertension',
//         'Insomnia',
//         'Pregnancy',
//         'Hormone-sensitive cancers',
//       ],
//     },
//     homeopathicUses: {
//       preparations: ['Mother tincture', 'Low to medium potencies (6X-30C)'],
//       conditions: ['Mental exhaustion', 'Physical weakness', 'Sexual debility'],
//       dosage: '10-20 drops BID, morning and afternoon',
//     },
//     research: {
//       recentStudies: [
//         {
//           title: 'Ginseng for cognitive function: A systematic review',
//           year: 2023,
//           findings: 'Moderate evidence for memory and attention improvement',
//           source: 'Psychopharmacology',
//         },
//         {
//           title: 'Adaptogenic effects of Panax ginseng on stress',
//           year: 2022,
//           findings: 'Reduced cortisol levels and improved stress tolerance',
//           source: 'Journal of Ginseng Research',
//         },
//       ],
//       futureDirections: [
//         'Optimal ginsenoside ratios',
//         'Personalized dosing',
//         'Long-term cognitive studies',
//       ],
//     },
//     references: [
//       'Reay, J.L. et al. (2005). Single doses of Panax ginseng reduce blood glucose levels',
//       'Geng, J. et al. (2010). Ginseng for cognition: A systematic review',
//     ],
//   },
//   {
//     id: '5',
//     name: 'Lavender',
//     scientificName: 'Lavandula angustifolia',
//     family: 'Lamiaceae',
//     origin: 'Mediterranean',
//     partsUsed: ['Flowers', 'Essential oil'],
//     image:
//       'https://images.unsplash.com/photo-1541927634837-a7d5c4892527?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZsb3dlcnN8ZW58MXx8fHwxNzU3Mzg5MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     description:
//       'Calming aromatic herb used for relaxation, sleep, and anxiety relief.',
//     medicinalQualities: [
//       'Anxiolytic',
//       'Sedative',
//       'Antiseptic',
//       'Anti-inflammatory',
//     ],
//     traditionalUses: ['Insomnia', 'Anxiety', 'Minor burns', 'Headaches'],
//     modernMedicine: {
//       activeCompounds: [
//         'Linalool',
//         'Linalyl acetate',
//         'Camphor',
//         'Terpinen-4-ol',
//       ],
//       clinicalStudies: [
//         'Reduced anxiety in dental patients',
//         'Improved sleep quality',
//         'Wound healing acceleration',
//       ],
//       approvedUses: [
//         'Aromatherapy (global)',
//         'Traditional herbal medicine (EU)',
//       ],
//       contradictions: [
//         'Pregnancy (essential oil)',
//         'Allergic reactions',
//         'Drug interactions (sedatives)',
//       ],
//     },
//     homeopathicUses: {
//       preparations: ['Mother tincture', 'Low potencies (3X-12X)'],
//       conditions: ['Nervous tension', 'Sleep disorders', 'Restlessness'],
//       dosage: '5-10 drops before bedtime or TID for anxiety',
//     },
//     research: {
//       recentStudies: [
//         {
//           title: 'Lavender aromatherapy for anxiety: A meta-analysis',
//           year: 2023,
//           findings:
//             'Significant reduction in anxiety scores across multiple studies',
//           source: 'International Journal of Nursing Studies',
//         },
//         {
//           title: 'Lavender oil for sleep quality: Randomized controlled trial',
//           year: 2022,
//           findings:
//             'Improved sleep duration and quality in adults with insomnia',
//           source: 'Sleep Medicine',
//         },
//       ],
//       futureDirections: [
//         'Optimal delivery methods',
//         'Dosage standardization',
//         'Combination with other interventions',
//       ],
//     },
//     references: [
//       'Enshaieh, S. et al. (2007). The use of lavender aromatherapy to relieve stress',
//       'Lewith, G.T. et al. (2005). A single-blinded, randomized pilot study evaluating the aroma of Lavandula',
//     ],
//   },
//   {
//     id: '6',
//     name: 'Ginkgo',
//     scientificName: 'Ginkgo biloba',
//     family: 'Ginkgoaceae',
//     origin: 'China',
//     partsUsed: ['Leaves'],
//     image:
//       'https://images.unsplash.com/photo-1697985007583-e197e2b73bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5rZ28lMjBsZWF2ZXN8ZW58MXx8fHwxNzU3Mzg5MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//     description:
//       'Ancient tree species used for cognitive enhancement and circulation support.',
//     medicinalQualities: [
//       'Cognitive enhancer',
//       'Circulatory stimulant',
//       'Neuroprotective',
//       'Antioxidant',
//     ],
//     traditionalUses: [
//       'Memory problems',
//       'Circulation disorders',
//       'Tinnitus',
//       'Vertigo',
//     ],
//     modernMedicine: {
//       activeCompounds: [
//         'Flavonoids',
//         'Terpenoids',
//         'Ginkgolides',
//         'Bilobalide',
//       ],
//       clinicalStudies: [
//         'Mixed results for dementia',
//         'Improved peripheral circulation',
//         'Possible benefits for tinnitus',
//       ],
//       approvedUses: [
//         'Prescription medicine (Germany)',
//         'Dietary supplement (US)',
//       ],
//       contradictions: [
//         'Bleeding disorders',
//         'Surgery',
//         'Pregnancy',
//         'Epilepsy',
//       ],
//     },
//     homeopathicUses: {
//       preparations: ['Mother tincture', 'Low to medium potencies (6X-30C)'],
//       conditions: ['Memory weakness', 'Poor circulation', 'Vertigo'],
//       dosage: '10-15 drops BID for chronic conditions',
//     },
//     research: {
//       recentStudies: [
//         {
//           title: 'Ginkgo biloba for cognitive impairment and dementia',
//           year: 2023,
//           findings: 'Limited evidence for cognitive benefits in healthy adults',
//           source: 'Cochrane Database of Systematic Reviews',
//         },
//         {
//           title: 'Ginkgo extract for peripheral arterial disease',
//           year: 2022,
//           findings: 'Modest improvement in walking distance and symptoms',
//           source: 'European Journal of Vascular Surgery',
//         },
//       ],
//       futureDirections: [
//         'Biomarker identification',
//         'Personalized treatment',
//         'Combination therapies',
//       ],
//     },
//     references: [
//       'Diamond, B.J. et al. (2000). Ginkgo biloba extract: mechanisms and clinical indications',
//       'Ernst, E. & Pittler, M.H. (2000). Ginkgo biloba for dementia: a systematic review',
//     ],
//   },
// ];

// export const mockPlants2: MedicinalPlant[] = [
//   {
//     id: "hp001",
//     name: "Devil's Claw",
//     scientificName: "Harpagophytum procumbens",
//     otherNames: ["Wood Spider", "Grapple Plant"],
//     localNames: ["Sengaparile"],
//     family: "Pedaliaceae",
//     origin: "Southern Africa, Kalahari Desert region",
//     partsUsed: ["Roots", "Tuberous secondary roots"],
//     image: "/assets/botanical/Harpagophytum-procumbens.jpg",
//     description: "A perennial herb with distinctive hook-like fruits that give it the name 'Devil's Claw'. The plant grows in arid regions of southern Africa and is known for its medicinal root system.",
//     medicinalQualities: ["Analgesic", "Anti-inflammatory", "Antirheumatic", "Antibacterial", "Diuretic", "Hypotensive"],
//     traditionalUses: [
//       "Treatment of arthritis and rheumatic conditions",
//       "Digestive system disorders",
//       "Fever reduction",
//       "Wound healing with root ointments"
//     ],

//     modernMedicine: {
//       activeCompounds: ["Harpagoside", "Harpagide", "Procumbide", "Flavonoids", "Phytosterols"],
//       clinicalStudies: [
//         "Clinical studies have shown demonstrable benefits in the treatment of rheumatic conditions",
//         "Significant anti-inflammatory activity demonstrated in multiple trials"
//       ],
//       approvedUses: ["Osteoarthritis pain management", "Lower back pain relief"],
//       contradictions: ["Pregnancy", "Gastric ulcers", "Gallstones", "Heart conditions"]
//     },
//     homeopathicUses: {
//       preparations: ["Tincture", "Decoction", "Ointment", "Powdered root"],
//       conditions: ["Joint pain", "Muscle aches", "Digestive complaints"],
//       dosage: "Standard dose: 1-2g dried root extract daily, divided into 2-3 doses"
//     },
//       research: {
//     recentStudies: [
//         {
//           title: "Anti-inflammatory mechanisms of Harpagophytum procumbens extracts",
//           year: 2022,
//           findings: "Demonstrated significant inhibition of COX-2 and TNF-alpha pathways",
//           source: "Journal of Ethnopharmacology"
//         },
//         {
//           title: "Clinical efficacy in osteoarthritis treatment",
//           year: 2021,
//           findings: "60% reduction in pain scores compared to placebo in 12-week trial",
//           source: "Phytomedicine"
//         }
//       ],
//       futureDirections: [
//         "Development of standardized extracts for commercial use",
//         "Investigation of synergistic effects with conventional anti-inflammatories",
//         "Sustainable cultivation methods to protect wild populations"
//       ]
//     },
//         references: [
//       "Gxaba, N. (2022). The Fight against Infection and Pain: Devil's Claw",
//       "European Medicines Agency Monograph on Harpagophyti radix"
//     ],
//     creditors: {
//       creditor: [
//         {
//           name: "South African National Biodiversity Institute",
//           url: "https://www.sanbi.org"
//         },
//         {
//           name: "Medicinal Plant Conservation Database",
//           url: "https://medplantconservation.org"
//         }
//       ]
//     }

// },
// {
//     id: "aa002",
//     name: "African Wormwood",
//     scientificName: "Artemisia afra",
//     otherNames: ["Wild Wormwood", "Wilde Als"],
//     localNames: ["Lengana", "Musuzwane"],
//     family: "Asteraceae",
//     origin: "South Africa, widely distributed across eastern and southern Africa",
//     partsUsed: ["Leaves", "Stems", "Roots"],
//     image: "/assets/botanical/Artemisia-afra.jpg",
//     description: "A perennial shrub native to South Africa, commonly found in most areas of the country. It has a strong aromatic scent and silvery-green foliage.",
//     medicinalQualities: ["Antimalarial", "Antimicrobial", "Anti-inflammatory", "Antiseptic", "Expectorant"],
//     traditionalUses: [
//       "Treatment of malaria and fever",
//       "Respiratory conditions including coughs and colds",
//       "Digestive disorders and heartburn",
//       "External application for wound cleaning"
//     ],
//     modernMedicine: {
//       activeCompounds: ["Thujone", "Camphor", "Artemisinin derivatives", "Flavonoids", "Terpenoids"],
//       clinicalStudies: [
//         "In vitro studies showing activity against Plasmodium falciparum strains",
//         "Antimicrobial efficacy against common respiratory pathogens"
//       ],
//       approvedUses: ["Adjunct therapy for respiratory infections", "Traditional medicine preparations"],
//       contradictions: ["Pregnancy", "Breastfeeding", "Epilepsy", "Long-term use without supervision"]
//     },
//     homeopathicUses: {
//       preparations: ["Infusion", "Tincture", "Steam inhalation", "Poultice"],
//       conditions: ["Malaria prevention", "Respiratory infections", "Digestive complaints"],
//       dosage: "Infusion: 1-2 teaspoons dried leaves in boiling water, 2-3 times daily"
//     },
//     research: {
//       recentStudies: [
//         {
//           title: "Antimalarial potential of African Artemisia species",
//           year: 2020,
//           findings: "Demonstrated 78% inhibition of parasite growth in vitro at 50μg/ml concentration",
//           source: "Malaria Journal"
//         },
//         {
//           title: "Traditional medicine validation for respiratory conditions",
//           year: 2019,
//           findings: "Significant reduction in cough frequency and duration in clinical trial participants",
//           source: "Journal of Ethnopharmacology"
//         }
//       ],
//       futureDirections: [
//         "Standardization of active compound concentrations",
//         "Clinical trials for malaria treatment protocols",
//         "Investigation of antimicrobial resistance potential"
//       ]
//     },
//     references: [
//       "Liu, N.Q. (2009). Artemisia afra: A potential flagship for African medicinal plants",
//       "South African Herbal Science and Medicine Institute Guidelines"
//     ],
//     creditors: {
//       creditor: [
//         {
//           name: "Traditional Healers Organization of South Africa",
//           url: "https://www.traditionalhealersorganization.org/"
//         },
//         {
//           name: "African Traditional Medicine Database",
//           url: "https://atmdb.org"
//         }
//       ]
//     }
//   },
//   {
//     id: "ml003",
//     name: "Wild Mint",
//     scientificName: "Mentha longifolia",
//     otherNames: ["Horse Mint", "Long-leaved Mint"],
//     localNames: ["Mosukujane"],
//     family: "Lamiaceae",
//     origin: "Africa, Mediterranean region, naturalized across temperate zones",
//     partsUsed: ["Leaves", "Flowering tops"],
//     image: "/assets/botanical/Mentha-longifolia.jpg",
//     description: "A perennial herb with long, narrow leaves and a strong minty aroma. It grows wild in moist areas and is commonly used in traditional medicine across Africa.",
//     medicinalQualities: ["Antimicrobial", "Antispasmodic", "Diaphoretic", "Carminative", "Analgesic"],
//     traditionalUses: [
//       "Treatment of coughs, colds, and asthma",
//       "Digestive disorders including stomach cramps and indigestion",
//       "Headache relief",
//       "Topical application for skin conditions"
//     ],
//     modernMedicine: {
//       activeCompounds: ["Menthol", "Pulegone", "Menthone", "Rosmarinic acid", "Flavonoids"],
//       clinicalStudies: [
//         "Antimicrobial activity against Gram-positive and Gram-negative bacteria",
//         "Gastrointestinal effects demonstrated in animal models"
//       ],
//       approvedUses: ["Digestive aid preparations", "Topical analgesics", "Respiratory decongestants"],
//       contradictions: ["Pregnancy in high doses", "Gastroesophageal reflux disease", "Gallstones"]
//     },
//     homeopathicUses: {
//       preparations: ["Infusion", "Essential oil", "Poultice", "Steam inhalation"],
//       conditions: ["Respiratory congestion", "Digestive upset", "Headaches", "Muscle pain"],
//       dosage: "Infusion: 1-2g dried leaves per cup of boiling water, up to 3 times daily"
//     },
//     research: {
//       recentStudies: [
//         {
//           title: "Pharmacological and therapeutic effects of Mentha longifolia",
//           year: 2023,
//           findings: "Demonstrated significant antimicrobial and antioxidant properties in vitro",
//           source: "Journal of Ethnopharmacology"
//         },
//         {
//           title: "Neuropharmacological effects of wild mint extracts",
//           year: 2022,
//           findings: "Anxiolytic and sedative effects observed in rodent models at therapeutic doses",
//           source: "Phytomedicine"
//         }
//       ],
//       futureDirections: [
//         "Clinical trials for anxiety and sleep disorders",
//         "Development of standardized antimicrobial preparations",
//         "Investigation of synergistic effects with other medicinal plants"
//       ]
//     },
//     references: [
//       "Mikaili, P. (2013). Pharmacological and therapeutic effects of Mentha longifolia",
//       "World Health Organization Monograph on Selected Medicinal Plants"
//     ],
//     creditors: {
//       creditor: [
//         {
//           name: "African Herbal Pharmacopoeia",
//           url: "https://africanherbal.org"
//         },
//         {
//           name: "Mediterranean Medicinal Plant Database",
//           url: "https://medmedplants.org"
//         }
//       ]
//     }
//   },
//   {
//     id: "sb004",
//     name: "Marula",
//     scientificName: "Sclerocarya birrea",
//     otherNames: ["Elephant Tree", "Amarula Tree"],
//     localNames: ["Morula"],
//     family: "Anacardiaceae",
//     origin: "Sub-Saharan Africa, particularly regions south of the equator",
//     partsUsed: ["Bark", "Fruit", "Seeds", "Leaves", "Roots"],
//     image: "/assets/botanical/Marula.jpg",
//     description: "A medium-sized, deciduous tree native to Africa, known for its fruits and various medicinal applications. The tree is dioecious and can grow up to 18 meters tall.",
//     medicinalQualities: ["Antioxidant", "Antibacterial", "Anti-inflammatory", "Antidiabetic", "Antihypertensive"],
//     traditionalUses: [
//       "Treatment of stomach ailments using bark extracts",
//       "Wound healing with seed oil applications",
//       "Management of inflammatory disorders",
//       "Treatment of snakebite and parasitic infections"
//     ],
//     modernMedicine: {
//       activeCompounds: ["Vitamin C", "Flavonoids", "Tannins", "Saponins", "Essential fatty acids"],
//       clinicalStudies: [
//         "In vitro and in vivo studies indicating pro-health properties including antioxidant and antibacterial activities",
//         "Anti-inflammatory effects demonstrated in animal models"
//       ],
//       approvedUses: ["Nutritional supplements", "Cosmetic formulations", "Traditional medicine preparations"],
//       contradictions: ["Allergic reactions in sensitive individuals", "Interaction with blood pressure medications"]
//     },
//     homeopathicUses: {
//       preparations: ["Bark decoction", "Seed oil", "Fruit pulp extract", "Leaf infusion"],
//       conditions: ["Digestive disorders", "Skin conditions", "Inflammatory conditions", "Wound healing"],
//       dosage: "Bark decoction: 10-15g dried bark boiled in 500ml water, 2-3 times daily"
//     },
//     research: {
//       recentStudies: [
//         {
//           title: "Marula seed oil characterization and therapeutic potential",
//           year: 2025,
//           findings: "High oleic acid content (70-75%) with significant anti-inflammatory and wound healing properties",
//           source: "Journal of Agricultural and Food Chemistry"
//         },
//         {
//           title: "Antidiabetic effects of Sclerocarya birrea extracts",
//           year: 2024,
//           findings: "30% reduction in blood glucose levels in diabetic rat models after 4-week treatment",
//           source: "Journal of Ethnopharmacology"
//         }
//       ],
//       futureDirections: [
//         "Clinical trials for diabetes management",
//         "Development of sustainable harvesting protocols",
//         "Investigation of anti-parasitic properties for tropical disease treatment"
//       ]
//     },
//     references: [
//       "Mariod, A.A. (2012). Sclerocarya birrea (Marula), An African Tree of Nutritional and Medicinal Value",
//       "Olas, B. (2025). Marula products as a source of bioactive compounds"
//     ],
//     creditors: {
//       creditor: [
//         {
//           name: "African Forest Research Network",
//           url: "https://africforestresearch.org"
//         },
//         {
//           name: "Indigenous Knowledge Systems Database",
//           url: "https://iksdb.org.za"
//         }
//       ]
//     }
//   },
//   {
//     id: "ad005",
//     name: "Baobab",
//     scientificName: "Adansonia digitata",
//     otherNames: ["Monkey-bread Tree", "Cream of Tartar Tree"],
//     localNames: ["Mowana"],
//     family: "Malvaceae",
//     origin: "Tropical Africa, Madagascar, and Arabian Peninsula",
//     partsUsed: ["Leaves", "Bark", "Roots", "Fruit pulp", "Seeds"],
//     image: "/assets/botanical/Adansonia-digitata.jpg",
//     description: "A massive, iconic tree native to Africa, known for its longevity and distinctive swollen trunk. Every part of the baobab tree has been utilized in traditional medicine and nutrition for centuries.",
//     medicinalQualities: ["Antioxidant", "Anti-inflammatory", "Antipyretic", "Antiparasitic", "Antimicrobial"],
//     traditionalUses: [
//       "Treatment of malaria and fever using bark and leaf extracts",
//       "Management of diarrhea and digestive disorders",
//       "Wound healing with leaf poultices",
//       "Hydration and nutritional support using fruit pulp"
//     ],
//     modernMedicine: {
//       activeCompounds: ["Vitamin C", "Polyphenols", "Flavonoids", "Triterpenes", "Essential minerals"],
//       clinicalStudies: [
//         "Several plant parts have interesting antioxidant and anti-inflammatory properties demonstrated in multiple studies",
//         "Antimicrobial efficacy against common pathogenic bacteria and fungi"
//       ],
//       approvedUses: ["Food supplements", "Cosmetic ingredients", "Traditional medicine preparations"],
//       contradictions: ["Interactions with anticoagulant medications", "Pregnancy in high therapeutic doses"]
//     },
//     homeopathicUses: {
//       preparations: ["Leaf powder", "Bark decoction", "Fruit pulp extract", "Seed oil"],
//       conditions: ["Malaria prophylaxis", "Fever reduction", "Digestive health", "Immune support"],
//       dosage: "Leaf powder: 1-2 teaspoons daily mixed with water or food"
//     },
//     research: {
//       recentStudies: [
//         {
//           title: "Baobab (Adansonia digitata) products: A comprehensive review",
//           year: 2023,
//           findings: "Demonstrated significant antioxidant capacity (ORAC value of 15,000 μmol TE/100g) in fruit pulp",
//           source: "Food Chemistry"
//         },
//         {
//           title: "Anti-inflammatory mechanisms of baobab leaf extracts",
//           year: 2022,
//           findings: "Inhibition of NF-kB pathway and reduction of pro-inflammatory cytokines in vitro",
//           source: "Journal of Ethnopharmacology"
//         }
//       ],
//       futureDirections: [
//         "Clinical trials for inflammatory bowel disease treatment",
//         "Development of standardized extracts for commercial use",
//         "Sustainable cultivation and conservation strategies"
//       ]
//     },
//     references: [
//       "De Caluwé, E. (2023). Adansonia digitata L. – A review of traditional uses and pharmacological properties",
//       "Silva, M.L. (2023). Baobab Bioactive Compounds and Therapeutic Applications"
//     ],
//     creditors: {
//       creditor: [
//         {
//           name: "Baobab Conservation Initiative",
//           url: "https://baobabconservation.org"
//         },
//         {
//           name: "African Medicinal Plants Standards",
//           url: "https://amps.africa"
//         }
//       ]
//     }
//   },
//   {
//   id: "cm008",
//   name: "Mopane",
//   scientificName: "Colophospermum mopane",
//   otherNames: ["Turpentine Tree"],
//   localNames: ["Mopane"],
//   family: "Fabaceae",
//   origin: "Southern Africa, particularly Botswana, Zimbabwe, Mozambique, Namibia, and northern South Africa",
//   partsUsed: ["Bark", "Roots", "Leaves", "Wood"],
//   image: "/assets/botanical/Colophospermum-mopane.jpg",
//   description: "A distinctive medium to large tree with butterfly-shaped leaves, known for its hard reddish heartwood and significant ecological and cultural importance in southern Africa.",
//   medicinalQualities: ["Antibacterial", "Antiproliferative", "Anti-protease", "Antioxidant", "Anti-inflammatory"],
//   traditionalUses: [
//     "Treatment of eye infections using leaf preparations",
//     "Management of stomach ache and digestive disorders",
//     "Relief from gout and joint pain",
//     "Treatment of diarrhea and gastrointestinal issues",
//     "Toothache and dental pain relief",
//     "Menstrual pain management",
//     "Wound healing with bark extracts"
//   ],
//   modernMedicine: {
//     activeCompounds: ["Diterpene dihydrogrindelaldehyde", "Tannins", "Flavonoids"],
//     clinicalStudies: [
//       "Demonstrated antipseudomonal potential in respiratory and wound infection management",
//       "Antibacterial activity against various pathogenic bacteria",
//       "Antioxidant properties confirmed in laboratory studies"
//     ],
//     approvedUses: ["Traditional medicine preparations", "Antimicrobial formulations"],
//     contradictions: ["Limited scientific data on long-term use", "Potential interactions with conventional medications"]
//   },
//   homeopathicUses: {
//     preparations: ["Heated wood extracts", "Chewed leaf fibres", "Bark decoctions", "Root infusions"],
//     conditions: ["Wound infections", "Respiratory ailments", "Gastrointestinal disorders"],
//     dosage: "Traditional preparations vary by healer; typically 1-2 cups of decoction daily"
//   },
//   research: {
//     recentStudies: [
//       {
//         title: "Traditional Uses, Phytochemistry, and Pharmacology of Colophospermum mopane",
//         year: 2023,
//         findings: "Confirmed antibacterial, antiproliferation, anti-protease, and antioxidant activities of plant extracts",
//         source: "Journal of Ethnopharmacology"
//       },
//       {
//         title: "Antipseudomonal potential of Colophospermum mopane",
//         year: 2017,
//         findings: "Effective in traditional management of respiratory, gastrointestinal and wound infections",
//         source: "Journal of Medicinal Plants Research"
//       }
//     ],
//     futureDirections: [
//       "Standardization of antimicrobial extracts",
//       "Clinical trials for wound healing applications",
//       "Investigation of anti-cancer properties"
//     ]
//   },
//   references: [
//     "Makhado, R.A. (2016). Colophospermum mopane Wood Utilisation in the Traditional Medicine",
//     "Cheikhyoussef, A. (2023). Traditional Uses, Phytochemistry, and Pharmacology of Colophospermum mopane",
//     "Mashabane, L.G. (2001). The utilisation of Colophospermum mopane by rural communities"
//   ],
//   creditors: {
//     creditor: [
//       {
//         name: "South African National Biodiversity Institute",
//         url: "https://www.sanbi.org"
//       },
//       {
//         name: "Traditional Healers Organization of Southern Africa",
//         url: "https://thosa.org.za"
//       }
//     ]
//   }
// },
// {
//   id: "tc005",
//   name: "African Sage",
//   scientificName: "Tarchonanthus camphoratus",
//   otherNames: ["Camphor Bush"],
//   localNames: ["Mokgalo"],
//   family: "Asteraceae",
//   origin: "Southern and Eastern Africa, from South Africa to Ethiopia and Kenya",
//   partsUsed: ["Leaves", "Stems", "Roots"],
//   image: "/assets/botanical/Tarchonanthus-camphoratus.jpg",
//   description: "A fragrant evergreen shrub or small tree with silvery leaves and strong camphor-like aroma, highly valued in traditional African medicine for respiratory and inflammatory conditions.",
//   medicinalQualities: ["Anti-inflammatory", "Antibacterial", "Antifungal", "Expectorant", "Analgesic", "Antispasmodic"],
//   traditionalUses: [
//     "Treatment of bronchitis and chest ailments",
//     "Relief from blocked sinuses and headaches through smoke inhalation",
//     "Management of asthma and respiratory conditions",
//     "Treatment of chilblains, tired legs, and sore feet",
//     "Anxiety and stress relief",
//     "Stomach ache and heartburn treatment"
//   ],
//   modernMedicine: {
//     activeCompounds: ["Essential oils", "Tannins", "Flavonoids", "Terpenoids"],
//     clinicalStudies: [
//       "Demonstrated antimicrobial and antioxidant activities in laboratory tests",
//       "Anti-inflammatory effects confirmed in in vitro studies",
//       "Cytotoxic activity against certain cancer cell lines"
//     ],
//     approvedUses: ["Respiratory decongestants", "Tropical anti-inflammatory preparations"],
//     contradictions: ["Pregnancy and breastfeeding", "Liver conditions", "Photosensitivity reactions"]
//   },
//   homeopathicUses: {
//     preparations: ["Leaf tea", "Smoke inhalation", "Essential oil", "Poultices"],
//     conditions: ["Sinus congestion", "Respiratory infections", "Muscle pain", "Anxiety"],
//     dosage: "Tea: 1-2 teaspoons dried leaves in boiling water, 2-3 times daily; Smoke inhalation as needed"
//   },
//   research: {
//     recentStudies: [
//       {
//         title: "Unveiling the potential of Tarchonanthus camphoratus L.",
//         year: 2022,
//         findings: "Rich phytochemical composition with multiple therapeutic applications",
//         source: "Journal of Ethnopharmacology"
//       },
//       {
//         title: "Antimicrobial, Antioxidant, and Cytotoxic Activities of Tarchonanthus camphoratus",
//         year: 2021,
//         findings: "Essential oil demonstrated significant antimicrobial and antioxidant properties",
//         source: "Phytotherapy Research"
//       }
//     ],
//     futureDirections: [
//       "Standardization of essential oil preparations",
//       "Clinical trials for respiratory conditions",
//       "Investigation of neuroprotective effects"
//     ]
//   },
//   references: [
//     "Van Wyk, B.E. (2017). Medicinal Plants of South Africa",
//     "Germishuizen, G. (2003). Plants of Southern Africa: An Online Checklist",
//     "Pooley, E. (1998). A Field Guide to Wild Flowers of KwaZulu-Natal and the Eastern Region"
//   ],
//   creditors: {
//     creditor: [
//       {
//         name: "African Herbal Science and Medicine Institute",
//         url: "https://ahsmi.org.za"
//       },
//       {
//         name: "University of Pretoria Medicinal Plant Database",
//         url: "https://medplant.up.ac.za"
//       }
//     ]
//   }
// },
// {
//   id: "ba006",
//   name: "Shepherd's Tree",
//   scientificName: "Boscia albitrunca",
//   otherNames: ["Shepherd Tree", "Butter Tree"],
//   localNames: ["Motlopi"],
//   family: "Capparaceae",
//   origin: "Southern Africa, particularly arid regions of Botswana, Namibia, South Africa, and Zimbabwe",
//   partsUsed: ["Bark", "Leaves", "Roots", "Fruit"],
//   image: "/assets/botanical/Boscia-albitrunca.jpg",
//   description: "A medium-sized evergreen tree with distinctive grey bark and dense foliage, highly revered in African culture and considered a keystone species in arid ecosystems.",
//   medicinalQualities: ["Antimicrobial", "Anti-inflammatory", "Anticonvulsant", "Antihemorrhoidal", "Ophthalmic"],
//   traditionalUses: [
//     "Treatment of constipation and digestive disorders",
//     "Management of epilepsy and seizure disorders",
//     "Relief from headaches and migraines",
//     "Treatment of hemorrhoids and rectal disorders",
//     "Management of skin diseases and infections",
//     "Traditional treatment for syphilis and HIV-related symptoms",
//     "Eye lotion preparation for inflamed eyes in both humans and livestock"
//   ],
//   modernMedicine: {
//     activeCompounds: ["Alkaloids", "Flavonoids", "Tannins", "Saponins"],
//     clinicalStudies: [
//       "In vitro antimicrobial activity confirmed against various bacterial strains",
//       "Traditional use for eye-related ailments validated in ethnobotanical studies",
//       "Anti-hemorrhoidal properties documented in traditional medicine literature"
//     ],
//     approvedUses: ["Traditional eye care preparations", "Hemorrhoid treatments", "Antimicrobial formulations"],
//     contradictions: ["Limited clinical data", "Potential herb-drug interactions", "Not recommended during pregnancy"]
//   },
//   homeopathicUses: {
//     preparations: ["Cold leaf infusions", "Root decoctions", "Bark extracts", "Green fruit preparations"],
//     conditions: ["Eye inflammation", "Hemorrhoids", "Epilepsy", "Skin conditions"],
//     dosage: "Eye lotion: cold infusion applied externally; Internal use: 1 cup decoction daily under practitioner guidance"
//   },
//   research: {
//     recentStudies: [
//       {
//         title: "In vitro antimicrobial activity of extracts and an isolated compound from Boscia albitrunca",
//         year: 2015,
//         findings: "Demonstrated significant antimicrobial activity, particularly for eye-related ailments and hemorrhoid diseases",
//         source: "Journal of Ethnopharmacology"
//       },
//       {
//         title: "Boscia albitrunca: Review of its botany, medicinal uses and phytochemistry",
//         year: 2016,
//         findings: "Comprehensive review confirming traditional uses for constipation, epilepsy, hemorrhoids, headache, and HIV-related conditions",
//         source: "Journal of Medicinal Plants Research"
//       }
//     ],
//     futureDirections: [
//       "Clinical validation of anti-epileptic properties",
//       "Standardization of ophthalmic preparations",
//       "Investigation of antiviral activity against HIV"
//     ]
//   },
//   references: [
//     "Pendota, S.C. (2015). In vitro antimicrobial activity of extracts from Boscia albitrunca",
//     "Van der Walt, J.J. & Le Riche, C. (1999). Medicinal uses of Boscia albitrunca in Southern Africa",
//     "Palgrave, K.C. (2002). Trees of Southern Africa"
//   ],
//   creditors: {
//     creditor: [
//       {
//         name: "Botswana Traditional Medicine Council",
//         url: "https://btmc.org.bw"
//       },
//       {
//         name: "African Journal of Traditional and Complementary Medicine",
//         url: "https://ajtcam.org"
//       }
//     ]
//   }
// },
// {
//   id: "at009",
//   name: "Camelthorn",
//   scientificName: "Acacia tortilis",
//   otherNames: ["Umbrella Thorn", "Israeli Babool"],
//   localNames: ["Mosu"],
//   family: "Fabaceae",
//   origin: "Africa and the Middle East, widespread across arid and semi-arid regions from South Africa to the Arabian Peninsula",
//   partsUsed: ["Bark", "Leaves", "Gum", "Pods", "Roots"],
//   image: "/assets/botanical/Acacia-tortilis.jpg",
//   description: "A distinctive umbrella-shaped tree with twisted branches and thorns, known for its hardiness in arid conditions and significant cultural importance across Africa and the Middle East.",
//   medicinalQualities: ["Antimicrobial", "Analgesic", "Antioxidant", "Anti-diabetic", "Anti-inflammatory", "Anthelmintic"],
//   traditionalUses: [
//     "Treatment of colds, flu, and respiratory infections",
//     "Management of diarrhea and dysentery",
//     "Malaria treatment and prevention",
//     "Treatment of sexually transmitted infections",
//     "Management of diabetes and blood sugar regulation",
//     "Asthma and respiratory condition relief",
//     "Treatment of hepatitis and liver disorders",
//     "Burn treatment and wound healing",
//     "Use as disinfectant and anthelmintic"
//   ],
//   modernMedicine: {
//     activeCompounds: ["Tannins", "Flavonoids", "Alkaloids", "Saponins", "Gum polysaccharides"],
//     clinicalStudies: [
//       "Diazepam-like effects demonstrated on mouse locomotion, suggesting sedative properties",
//       "Antimicrobial activity against various pathogenic bacteria and fungi",
//       "Antioxidant properties confirmed in multiple laboratory studies",
//       "Anti-diabetic effects documented in animal models"
//     ],
//     approvedUses: ["Traditional antimicrobial preparations", "Wound healing formulations", "Anti-diarrheal medications"],
//     contradictions: ["Allergic reactions in sensitive individuals", "Potential interactions with diabetes medications", "Not recommended in large doses during pregnancy"]
//   },
//   homeopathicUses: {
//     preparations: ["Bark decoctions", "Gum preparations", "Leaf infusions", "Pod powders"],
//     conditions: ["Diarrhea", "Respiratory infections", "Wound healing", "Diabetes management"],
//     dosage: "Decoction: 10-15g dried bark in 500ml water, boiled for 15 minutes, 2-3 times daily"
//   },
//   research: {
//     recentStudies: [
//       {
//         title: "Diazepam-like effects of Acacia tortilis on mouse locomotion",
//         year: 2020,
//         findings: "Significant medicinal properties including antimicrobial, analgesic, antioxidant, and anti-diabetic activities confirmed",
//         source: "Journal of Ethnopharmacology"
//       },
//       {
//         title: "A Review On Acacia Tortilis",
//         year: 2019,
//         findings: "Beneficial in diarrhea treatment due to presence of tannins; useful for skin allergy, cough, and various other conditions",
//         source: "International Journal of Herbal Medicine"
//       }
//     ],
//     futureDirections: [
//       "Clinical trials for diabetes management",
//       "Standardization of antimicrobial extracts",
//       "Investigation of neuroprotective effects",
//       "Development of sustainable harvesting protocols"
//     ]
//   },
//   references: [
//     "Msimango, N.N.P. (2025). Ethnoveterinary Potential of Acacia (Vachellia and Senegalia) species",
//     "Van Wyk, B.E. & Gericke, N. (2000). People's Plants: A Guide to Useful Plants of Southern Africa",
//     "Hutchings, A. et al. (1996). Zulu Medicinal Plants: An Inventory"
//   ],
//   creditors: {
//     creditor: [
//       {
//         name: "African Traditional Medicine Database",
//         url: "https://atmdb.org"
//       },
//       {
//         name: "International Centre for Ethnobotanical Education, Research and Service",
//         url: "https://iceers.org"
//       }
//     ]
//   }
// }

// ];
