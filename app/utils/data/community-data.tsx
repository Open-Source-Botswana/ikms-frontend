import type { CommunityCluster, ComplianceMetadata, KnowledgeRecord, CommunityMember, CulturalEvent, CommunityLocation, MigrationRoute } from '@/lib/types/community';

const defaultCompliance: ComplianceMetadata = {
  unDeclarationOnIndigenousRights: true,
  undpIndigenousPeoplePolicy: true,
  wipoTraditionalKnowledge: true,
  nagoyaProtocol: true,
  kunmingMontrealGBF: true,
  swakopmundProtocol: true,
  humanRightsCompliant: true,
  localContextsLabels: true,
  darwinCore: true,
  berneConvention: true,
  doi: '',
  docId: '',
  fpicObtained: true,
  benefitSharingAgreement: '',
  ipProtection: 'CC BY-NC-ND 4.0',
  consentExpiry: '2030-12-31',
};

// ─── San Community Clusters ─────────────────────────────────────────────

const sanKhoiRecords: KnowledgeRecord[] = [
  {
    id: 'kr-san-001', title: 'Healing Dance of the Khoisan', description: 'The trance healing dance is central to San spiritual life. Healers enter altered states of consciousness to heal the sick and communicate with the spirit world.', domain: 'ceremony', mediaType: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', accessLevel: 'public', language: 'Khoekhoegowab', narrator: 'Elder Xam', dateRecorded: '2023-06-15', dateAdded: '2024-01-10', tags: ['healing', 'dance', 'trance', 'spiritual'], communityId: 'san-khoi', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-khoi.001', docId: 'SAN-KHI-CER-001' }
  },
  {
    id: 'kr-san-002', title: 'San Rock Art at Tsodilo Hills', description: 'Tsodilo Hills contain over 4,500 rock paintings spanning 100,000 years, documenting San cosmology, daily life, and spiritual beliefs. UNESCO World Heritage Site.', domain: 'artifacts', mediaType: '3d_artifact', thumbnailUrl: 'https://images.unsplash.com/photo-1590845947698-dc1d35fda722?w=400&q=80', accessLevel: 'public', language: 'Khoekhoegowab', dateAdded: '2024-02-01', tags: ['rock art', 'UNESCO', 'Tsodilo', 'heritage'], communityId: 'san-khoi', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-khoi.002', docId: 'SAN-KHI-ART-001' }, modelUrl: '/models/tsodilo-rock.glb', modelFormat: '3d_glb'
  },
  {
    id: 'kr-san-003', title: 'Hoodia gordonii – Appetite Suppressant', description: 'The San have used Hoodia gordonii for millennia as an appetite and thirst suppressant during long hunting trips in the Kalahari. This knowledge was controversially commercialized.', domain: 'medicine', mediaType: 'text', accessLevel: 'public', language: 'Khoekhoegowab', dateAdded: '2024-01-15', tags: ['Hoodia', 'medicine', 'traditional knowledge', 'biopiracy'], communityId: 'san-khoi', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-khoi.003', docId: 'SAN-KHI-MED-001' }
  },
  {
    id: 'kr-san-004', title: 'Khoisan Click Languages', description: 'The Khoisan language family features the most extensive use of click consonants in any language group. These languages carry irreplaceable cultural knowledge.', domain: 'language', mediaType: 'audio', accessLevel: 'public', language: 'Khoekhoegowab', narrator: 'Linguist Dr. N!xau', dateRecorded: '2023-09-20', dateAdded: '2024-03-01', tags: ['click language', 'linguistics', 'endangered', 'heritage'], communityId: 'san-khoi', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-khoi.004', docId: 'SAN-KHI-LNG-001' }
  },
];

const sanNaroRecords: KnowledgeRecord[] = [
  {
    id: 'kr-naro-001', title: 'Naro Storytelling Traditions', description: 'The Naro maintain a rich oral tradition with stories about the creation, the mantis deity, and moral teachings passed through generations around evening fires.', domain: 'oral_tradition', mediaType: 'audio', accessLevel: 'public', language: 'Naro', narrator: 'Elder Kgao', dateRecorded: '2023-08-10', dateAdded: '2024-01-20', tags: ['storytelling', 'oral tradition', 'creation myths', 'Naro'], communityId: 'san-naro', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-naro.001', docId: 'SAN-NAR-ORL-001' }
  },
  {
    id: 'kr-naro-002', title: 'Naro Traditional Hunting Techniques', description: 'Persistence hunting and tracking expertise passed down through generations. The Naro are known for their extraordinary ability to read animal spoor.', domain: 'biodiversity', mediaType: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80', accessLevel: 'public', language: 'Naro', dateAdded: '2024-02-15', tags: ['hunting', 'tracking', 'biodiversity', 'survival'], communityId: 'san-naro', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-naro.002', docId: 'SAN-NAR-BIO-001' }
  },
];

const sanGwiRecords: KnowledgeRecord[] = [
  {
    id: 'kr-gwi-001', title: 'Gǀui Water Knowledge', description: 'The Gǀui possess profound knowledge of water sources in the Central Kalahari. They can locate underground water using plant indicators and terrain reading.', domain: 'biodiversity', mediaType: 'text', accessLevel: 'public', language: 'Gǀui', dateAdded: '2024-01-25', tags: ['water', 'survival', 'ecology', 'Kalahari'], communityId: 'san-gwi', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-gwi.001', docId: 'SAN-GWI-BIO-001' }
  },
  {
    id: 'kr-gwi-002', title: 'Gǁana & Gǀui Music and Dance', description: 'Traditional songs and dances that accompany healing ceremonies, celebrations, and rites of passage. Rhythmic clapping and vocal harmonies are distinctive features.', domain: 'music', mediaType: 'audio', accessLevel: 'public', language: 'Gǀui', narrator: 'Community singers', dateRecorded: '2023-11-05', dateAdded: '2024-03-10', tags: ['music', 'dance', 'ceremony', 'harmony'], communityId: 'san-gwi', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-gwi.002', docId: 'SAN-GWI-MUS-001' }
  },
  {
    id: 'kr-gwi-003', title: 'Kalahari Melon Cultivation', description: 'The Gǁana have cultivated and managed tsamma melons (Citrullus lanatus) as a critical water source in the arid Kalahari for thousands of years.', domain: 'agriculture', mediaType: 'text', accessLevel: 'public', language: 'Gǁana', dateAdded: '2024-02-20', tags: ['agriculture', 'melon', 'water source', 'Kalahari'], communityId: 'san-gwi', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-gwi.003', docId: 'SAN-GWI-AGR-001' }
  },
];

// ─── Batlokwa ────────────────────────────────────────────────────────────

const batlokwaRecords: KnowledgeRecord[] = [
  {
    id: 'kr-btl-001', title: 'Batlokwa Iron Smelting Heritage', description: 'The Batlokwa ba ga Modimosana were renowned iron workers. Their smelting techniques and tools represent a significant metallurgical tradition in southern Africa.', domain: 'crafts', mediaType: '3d_artifact', thumbnailUrl: 'https://images.unsplash.com/photo-1534349762230-e1d0b5b2b8cf?w=400&q=80', accessLevel: 'public', language: 'Setswana', dateAdded: '2024-01-30', tags: ['iron smelting', 'metallurgy', 'crafts', 'heritage'], communityId: 'batlokwa', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.batlokwa.001', docId: 'BTL-CRF-001' }, modelUrl: '/models/iron-bellows.glb', modelFormat: '3d_glb'
  },
  {
    id: 'kr-btl-002', title: 'Batlokwa Migration from Magaliesberg', description: 'Historical account of the Batlokwa migration from the Magaliesberg mountains in South Africa to southeastern Botswana during the Difaqane period.', domain: 'history', mediaType: 'text', accessLevel: 'public', language: 'Setswana', dateAdded: '2024-02-05', tags: ['migration', 'Difaqane', 'history', 'Magaliesberg'], communityId: 'batlokwa', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.batlokwa.002', docId: 'BTL-HIS-001' }
  },
  {
    id: 'kr-btl-003', title: 'Setswana Proverbs & Wisdom', description: 'A collection of Setswana proverbs (maele) that encode moral teachings, ecological wisdom, and social governance principles of the Batlokwa.', domain: 'oral_tradition', mediaType: 'audio', accessLevel: 'public', language: 'Setswana', narrator: 'Kgosi Modimosana', dateRecorded: '2023-07-20', dateAdded: '2024-03-15', tags: ['proverbs', 'wisdom', 'oral tradition', 'Setswana'], communityId: 'batlokwa', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.batlokwa.003', docId: 'BTL-ORL-001' }
  },
  {
    id: 'kr-btl-004', title: 'Traditional Agriculture: Sorghum & Millet', description: 'Batlokwa agricultural practices centered on drought-resistant sorghum and millet cultivation, adapted to the semi-arid conditions of southeastern Botswana.', domain: 'agriculture', mediaType: 'text', accessLevel: 'public', language: 'Setswana', dateAdded: '2024-02-28', tags: ['agriculture', 'sorghum', 'millet', 'drought-resistant'], communityId: 'batlokwa', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.batlokwa.004', docId: 'BTL-AGR-001' }
  },
];

// ─── Balete ──────────────────────────────────────────────────────────────

const baleteRecords: KnowledgeRecord[] = [
  {
    id: 'kr-blt-001', title: 'Balete Rain-Making Ceremony', description: 'The Balete maintain ancient rain-making ceremonies (go fetlha pula) led by the chief and traditional doctors, connecting spiritual authority with ecological knowledge.', domain: 'ceremony', mediaType: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&q=80', accessLevel: 'community_only', language: 'Setswana', dateAdded: '2024-01-28', tags: ['rain-making', 'ceremony', 'spiritual', 'ecology'], communityId: 'balete', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.balete.001', docId: 'BLT-CER-001' }
  },
  {
    id: 'kr-blt-002', title: 'Balete Pottery Traditions', description: 'Traditional pottery-making techniques using local clay, fired in open pits. Pottery styles carry symbolic meanings related to clan identity and ritual use.', domain: 'crafts', mediaType: '3d_artifact', thumbnailUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80', accessLevel: 'public', language: 'Setswana', dateAdded: '2024-02-10', tags: ['pottery', 'crafts', 'clay', 'symbolism'], communityId: 'balete', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.balete.002', docId: 'BLT-CRF-001' }, modelUrl: '/models/balete-pottery.glb', modelFormat: '3d_glb'
  },
  {
    id: 'kr-blt-003', title: 'Traditional Healing with Morula', description: 'The Balete use Morula (Sclerocarya birrea) extensively - fruit for nutrition and fermented beverages, bark and roots for medicinal preparations treating various ailments.', domain: 'medicine', mediaType: 'text', accessLevel: 'public', language: 'Setswana', dateAdded: '2024-03-05', tags: ['Morula', 'medicine', 'nutrition', 'healing'], communityId: 'balete', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.balete.003', docId: 'BLT-MED-001' }
  },
  {
    id: 'kr-blt-004', title: 'Balete Initiation Songs (Bojale & Bogwera)', description: 'Sacred songs performed during male (bogwera) and female (bojale) initiation rites. These encode cultural values, history, and social responsibilities.', domain: 'music', mediaType: 'audio', accessLevel: 'restricted', language: 'Setswana', narrator: 'Initiation Elders', dateRecorded: '2023-12-01', dateAdded: '2024-03-20', tags: ['initiation', 'songs', 'bogwera', 'bojale'], communityId: 'balete', compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.balete.004', docId: 'BLT-MUS-001' }
  },
];

// ─── Members ─────────────────────────────────────────────────────────────

const sanMembers: CommunityMember[] = [
  { id: 'mem-001', name: 'Qhaqhoo Xam', role: 'elder', title: 'Knowledge Keeper', bio: 'A custodian of San healing traditions and storytelling for over 40 years.', languages: ['Khoekhoegowab', 'Setswana', 'English'], specialization: 'Healing ceremonies', isPublic: true },
  { id: 'mem-002', name: 'Dr. Keikabile Mogodu', role: 'researcher', title: 'Ethnolinguist', bio: 'Documenting endangered Khoisan languages with San communities.', languages: ['English', 'Setswana', 'Naro'], specialization: 'Language documentation', isPublic: true },
];

const batlokwaMembers: CommunityMember[] = [
  { id: 'mem-003', name: 'Kgosi Modimosana III', role: 'chief', title: 'Paramount Chief', bio: 'Traditional leader of the Batlokwa ba ga Modimosana.', languages: ['Setswana', 'English'], specialization: 'Governance & heritage', isPublic: true },
  { id: 'mem-004', name: 'Mma Kebonye', role: 'healer', title: 'Traditional Doctor', bio: 'Renowned traditional healer specializing in herbal medicine.', languages: ['Setswana'], specialization: 'Herbal medicine', isPublic: true },
];

const baleteMembers: CommunityMember[] = [
  { id: 'mem-005', name: 'Kgosi Mosadi Seboko', role: 'chief', title: 'Paramount Chief', bio: 'First female paramount chief of the Balete, breaking centuries of tradition.', languages: ['Setswana', 'English'], specialization: 'Cultural governance', isPublic: true },
  { id: 'mem-006', name: 'Rra Masego', role: 'custodian', title: 'Heritage Custodian', bio: 'Guardian of Balete pottery traditions and initiation ceremonies.', languages: ['Setswana'], specialization: 'Pottery & ceremonies', isPublic: true },
];

// ─── Events ──────────────────────────────────────────────────────────────

const sampleEvents: CulturalEvent[] = [
  { id: 'evt-001', title: 'Kuru Dance Festival', description: 'Annual celebration of San culture through dance, music, and storytelling from multiple San groups across southern Africa.', date: '2025-08-15', location: "D'kar, Ghanzi District", type: 'festival', accessLevel: 'public', image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80' },
  { id: 'evt-002', title: 'Indigenous Language Documentation Workshop', description: 'Collaborative workshop to document and preserve endangered Khoisan languages using modern recording technology.', date: '2025-05-20', location: 'University of Botswana, Gaborone', type: 'workshop', accessLevel: 'public' },
  { id: 'evt-003', title: 'Domboshaba Heritage Festival', description: 'Celebration of Bakalanga and related cultural heritage at the historic Domboshaba ruins.', date: '2025-07-01', location: 'Domboshaba, North-East District', type: 'festival', accessLevel: 'public' },
];

// ─── Locations & Migration Routes ────────────────────────────────────────

const sanLocations: CommunityLocation[] = [
  { id: 'loc-001', name: 'Central Kalahari Game Reserve', description: 'Home to Gǁana and Gǀui San communities', coordinates: [-21.5, 24.5], type: 'current_habitation', population: '~5,000' },
  { id: 'loc-002', name: "D'kar Settlement", description: 'Naro San community center in Ghanzi District', coordinates: [-21.78, 23.75], type: 'current_habitation', population: '~3,000' },
  { id: 'loc-003', name: 'Tsodilo Hills', description: 'UNESCO World Heritage Site - sacred San rock art', coordinates: [-18.75, 21.73], type: 'sacred_site' },
  { id: 'loc-004', name: 'Kuru Art Project, Ghanzi', description: 'San art and cultural preservation center', coordinates: [-21.7, 21.65], type: 'research_station' },
];

const batlokwaLocations: CommunityLocation[] = [
  { id: 'loc-005', name: 'Tlokweng', description: 'Primary settlement of Batlokwa near Gaborone', coordinates: [-24.62, 25.97], type: 'current_habitation', population: '~40,000' },
  { id: 'loc-006', name: 'Ramotswa', description: 'Historical Batlokwa settlement area', coordinates: [-24.87, 25.87], type: 'historical' },
];

const baleteLocations: CommunityLocation[] = [
  { id: 'loc-007', name: 'Ramotswa (Balete Section)', description: 'Primary settlement of the Balete people', coordinates: [-24.87, 25.87], type: 'current_habitation', population: '~30,000' },
  { id: 'loc-008', name: 'Otse', description: 'Balete community area near Otse Hill', coordinates: [-24.97, 25.75], type: 'current_habitation' },
];

const sanMigrationRoutes: MigrationRoute[] = [
  {
    id: 'mig-001', name: 'Ancient San Migration (Southern Expansion)', description: 'Historical San migration from East Africa southward through the Kalahari over thousands of years', period: '~100,000 - 2,000 years ago',
    coordinates: [[-5.0, 30.0], [-10.0, 28.0], [-15.0, 26.0], [-18.75, 21.73], [-21.5, 24.5], [-25.0, 22.0]],
    color: 'hsl(45, 90%, 55%)',
  },
  {
    id: 'mig-002', name: 'Ghanzi Corridor Settlement', description: 'Naro movement into the Ghanzi corridor area', period: '1800s - present',
    coordinates: [[-21.5, 24.5], [-21.78, 23.75], [-21.7, 21.65]],
    color: 'hsl(30, 85%, 50%)',
  },
];

const batlokwaMigrationRoutes: MigrationRoute[] = [
  {
    id: 'mig-003', name: 'Batlokwa Difaqane Migration', description: 'Migration from Magaliesberg region in South Africa to southeastern Botswana during the Difaqane upheaval', period: '1820s - 1840s',
    coordinates: [[-25.8, 27.8], [-25.5, 27.0], [-25.2, 26.5], [-24.87, 25.87], [-24.62, 25.97]],
    color: 'hsl(200, 80%, 55%)',
  },
];

const baleteMigrationRoutes: MigrationRoute[] = [
  {
    id: 'mig-004', name: 'Balete Settlement Route', description: 'Balete migration from the east into the Ramotswa area', period: '1700s - 1800s',
    coordinates: [[-24.5, 28.0], [-24.7, 27.0], [-24.8, 26.5], [-24.87, 25.87], [-24.97, 25.75]],
    color: 'hsl(340, 70%, 55%)',
  },
];

// ─── Community Clusters ──────────────────────────────────────────────────

export const communities: CommunityCluster[] = [
  {
    id: 'san-khoi',
    name: 'Khoi-San',
    subGroups: ['Khoi', 'Naro', 'Gǁana', 'Gǀui (G/wi)'],
    description: 'The San people are the oldest inhabitants of southern Africa, with a cultural heritage spanning over 100,000 years. Their deep ecological knowledge, click languages, rock art, and spiritual practices represent some of humanity\'s earliest cultural expressions.',
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=80',
    region: 'Kalahari Desert & Central Botswana',
    country: 'Botswana',
    languages: ['Khoekhoegowab', 'Naro', 'Gǁana', 'Gǀui', 'Setswana'],
    population: '~55,000 in Botswana',
    culturalPractices: ['Trance healing dance', 'Rock art', 'Storytelling', 'Tracking & hunting', 'Gathering', 'Music & clapping songs'],
    knowledgeDomains: ['biodiversity', 'medicine', 'music', 'artifacts', 'oral_tradition', 'ceremony', 'language'],
    locations: sanLocations,
    migrationRoutes: sanMigrationRoutes,
    knowledgeRecords: [...sanKhoiRecords, ...sanNaroRecords, ...sanGwiRecords],
    members: sanMembers,
    events: [sampleEvents[0], sampleEvents[1]],
    compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.san-clusters', docId: 'SAN-CLUSTER-2024' },
    governanceStructure: 'Consensus-based decision making through community gatherings. No centralized chief system; elders and healers guide community decisions.',
    tkLabels: ['TK Verified', 'TK Attribution', 'TK Non-Commercial'],
    bcLabels: ['BC Consent Verified', 'BC Provenance'],
    totalRecords: 9,
    publicRecords: 8,
    dateEstablished: 'Time immemorial (~100,000+ years)',
    lastUpdated: '2024-03-20',
  },
  {
    id: 'batlokwa',
    name: 'Batlokwa',
    subGroups: ['Batlokwa ba ga Modimosana'],
    description: 'The Batlokwa ba ga Modimosana are a Sotho-Tswana group who migrated from the Magaliesberg region of South Africa to southeastern Botswana during the Difaqane period. Known for their iron-working skills, agricultural practices, and rich oral traditions.',
    heroImage: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1920&q=80',
    region: 'South-East District',
    country: 'Botswana',
    languages: ['Setswana', 'English'],
    population: '~40,000',
    culturalPractices: ['Iron smelting', 'Bogwera/Bojale initiation', 'Kgotla governance', 'Traditional agriculture', 'Herbal medicine'],
    knowledgeDomains: ['history', 'crafts', 'agriculture', 'medicine', 'oral_tradition'],
    locations: batlokwaLocations,
    migrationRoutes: batlokwaMigrationRoutes,
    knowledgeRecords: batlokwaRecords,
    members: batlokwaMembers,
    events: [sampleEvents[2]],
    compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.batlokwa', docId: 'BTL-2024' },
    governanceStructure: 'Hereditary chieftainship (bogosi) with traditional council (kgotla). The chief presides over disputes and cultural matters.',
    tkLabels: ['TK Verified', 'TK Community Voice'],
    bcLabels: ['BC Consent Verified'],
    totalRecords: 4,
    publicRecords: 4,
    dateEstablished: 'Pre-1800s in current territory',
    lastUpdated: '2024-03-15',
  },
  {
    id: 'balete',
    name: 'Balete',
    subGroups: ['Balete ba ga Mokgosi'],
    description: 'The Balete are a Sotho-Tswana group settled in the Ramotswa area of southeastern Botswana. They are known for rain-making ceremonies, pottery traditions, and being led by one of Botswana\'s first female paramount chiefs, Kgosi Mosadi Seboko.',
    heroImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1920&q=80',
    region: 'South-East District',
    country: 'Botswana',
    languages: ['Setswana', 'English'],
    population: '~30,000',
    culturalPractices: ['Rain-making ceremonies', 'Pottery', 'Initiation rites', 'Morula harvesting', 'Traditional governance'],
    knowledgeDomains: ['ceremony', 'crafts', 'medicine', 'music', 'agriculture'],
    locations: baleteLocations,
    migrationRoutes: baleteMigrationRoutes,
    knowledgeRecords: baleteRecords,
    members: baleteMembers,
    events: [sampleEvents[2]],
    compliance: { ...defaultCompliance, doi: 'doi:10.5281/ik.balete', docId: 'BLT-2024' },
    governanceStructure: 'Hereditary chieftainship with traditional kgotla system. Notable for progressive female leadership under Kgosi Mosadi Seboko.',
    tkLabels: ['TK Verified', 'TK Community Voice'],
    bcLabels: ['BC Consent Verified', 'BC Multiple Communities'],
    totalRecords: 4,
    publicRecords: 3,
    dateEstablished: 'Pre-1700s in current territory',
    lastUpdated: '2024-03-20',
  },
];

export const getCommunityById = (id: string): CommunityCluster | undefined => {
  return communities.find(c => c.id === id);
};

export const getAllKnowledgeRecords = (): KnowledgeRecord[] => {
  return communities.flatMap(c => c.knowledgeRecords);
};
