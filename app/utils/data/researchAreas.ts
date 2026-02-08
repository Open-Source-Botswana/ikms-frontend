import { NavigationItem, ResearchArea } from "@/lib/types/botanical";


export const researchAreas: ResearchArea[] = [
  {
    id: "ecosystem-resilience",
    title: "Ecosystem Resilience",
    subtitle: "Understanding biodiversity under pressure",
    description: "Our unique indigenous biodiversity has been, and continues to be, under pressure from numerous endogenous and exogenous factors.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    fullDescription: "Ecosystem resilience research focuses on understanding how natural systems respond to disturbances and maintain their essential functions. Our scientists study the intricate relationships between species and their environments to develop strategies that protect and restore biodiversity across diverse landscapes.",
    keyFindings: [
      "Native species adaptation patterns under climate stress",
      "Ecosystem recovery timelines after disturbance events",
      "Biodiversity indicators for monitoring ecosystem health",
      "Restoration techniques for degraded habitats"
    ],
    relatedTopics: ["Biodiversity", "Conservation", "Climate Adaptation", "Native Species"]
  },
  {
    id: "invasive-species",
    title: "Managing Invasive Species",
    subtitle: "Protecting native ecosystems",
    description: "Invasive species are a key pressure on our unique biodiversity and ecosystems, requiring innovative management strategies.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    fullDescription: "Invasive species management involves developing and implementing strategies to control non-native organisms that threaten native ecosystems. Our research combines field studies with advanced modeling to predict invasion patterns and evaluate control methods.",
    keyFindings: [
      "Early detection methods for emerging invasive threats",
      "Biological control agents for established pests",
      "Landscape-scale management approaches",
      "Community engagement in pest control programs"
    ],
    relatedTopics: ["Pest Control", "Biosecurity", "Native Species Protection", "Ecological Modeling"]
  },
  {
    id: "catalysing-change",
    title: "Catalysing Change",
    subtitle: "Enabling sustainable transitions",
    description: "Supporting communities to understand, manage, and enact change in response to societal and regulatory shifts.",
    image: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?w=800&q=80",
    fullDescription: "Our catalysing change research supports the transition to sustainable practices across communities and industries. We work collaboratively with stakeholders to develop practical tools and frameworks that enable meaningful environmental action.",
    keyFindings: [
      "Stakeholder engagement frameworks for environmental projects",
      "Decision-support tools for land management",
      "Policy effectiveness evaluation methods",
      "Community-based conservation models"
    ],
    relatedTopics: ["Sustainability", "Policy", "Community Engagement", "Land Management"]
  },
  {
    id: "climate-resources",
    title: "Land Resources & Climate",
    subtitle: "Adapting to a changing world",
    description: "Our scientists are working to ensure we can manage risks and respond to opportunities that climate change presents.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    fullDescription: "Climate change research addresses both the challenges and opportunities presented by shifting environmental conditions. Our work spans from soil science to atmospheric monitoring, providing critical data for adaptation planning.",
    keyFindings: [
      "Carbon sequestration potential in native forests",
      "Soil health indicators under changing rainfall patterns",
      "Climate projection models for regional planning",
      "Adaptation strategies for primary industries"
    ],
    relatedTopics: ["Climate Science", "Soil Research", "Carbon Storage", "Adaptation Planning"]
  },
  {
    id: "algae-identification",
    title: "Algae Identification",
    subtitle: "Freshwater ecosystem indicators",
    description: "Comprehensive tools for identifying and monitoring algae species in aquatic environments.",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80",
    fullDescription: "Algae serve as important indicators of freshwater ecosystem health. Our identification tools and research support water quality monitoring and ecological assessments across diverse aquatic habitats.",
    keyFindings: [
      "Algal bloom prediction models",
      "Species diversity indicators for water quality",
      "Toxic algae identification protocols",
      "Monitoring frameworks for freshwater systems"
    ],
    relatedTopics: ["Water Quality", "Freshwater Ecology", "Monitoring", "Species Identification"]
  },
  {
    id: "fungi-research",
    title: "Fungi & Decomposition",
    subtitle: "The hidden ecosystem engineers",
    description: "Understanding the vital role of fungi in nutrient cycling and ecosystem function.",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    fullDescription: "Fungi play essential roles in decomposition, nutrient cycling, and plant health. Our research explores fungal diversity and their ecological functions to support forest management and conservation efforts.",
    keyFindings: [
      "Mycorrhizal networks in native forests",
      "Decomposition rates under climate change",
      "Fungal biodiversity assessment methods",
      "Forest health indicators using fungal communities"
    ],
    relatedTopics: ["Mycology", "Forest Ecology", "Nutrient Cycling", "Biodiversity"]
  }
];


// TODO: update to set base a botanical
export const navigationItems: NavigationItem[] = [
  { label: "Research", href: "/" },
  { label: "Tools & Resources", href: "/tools" },
  { label: "Publications", href: "/publications" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const categoryFilters = [
  "All",
  "Ecosystems",
  "Climate",
  "Species",
  "Tools"
];
