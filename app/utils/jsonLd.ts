// import { EthnobotanicalMetadata } from "@/lib/types/botanical";

// // lib/utils/jsonld.ts
// export function generateJSONLD(record: EthnobotanicalMetadata): string {
//   // Only generate for published records
//   if (record.status !== 'published') {
//     throw new Error('JSON-LD can only be generated for published records');
//   }

//   const jsonLd = {
//     "@context": {
//       "dwc": "http://rs.tdwg.org/dwc/terms/",
//       "lc": "http://localcontexts.org/terms/",
//       "schema": "https://schema.org/",
//       "geo": "http://www.opengis.net/ont/geosparql#"
//     },
//     "@type": "schema:Dataset",
//     "@id": record.docId || `https://ethnoflora.org/record/${record.id}`,

//     // Darwin Core fields
//     "dwc:scientificName": record.scientificName,
//     "dwc:family": record.family,
//     "dwc:kingdom": "Plantae",
//     "dwc:country": record.origin,

//     // Local Contexts extension
//     "lc:tkLabels": record.tkLabels,
//     "lc:bcLabels": record.bcLabels,
//     "lc:culturalAuthority": record.culturalAuthority.communityName,
//     "lc:customCulturalId": record.customCulturalId,
//     "lc:consentStatus": record.consentStatus,

//     // Schema.org for SEO/discovery
//     "schema:name": record.name,
//     "schema:description": record.description,
//     "schema:license": record.copyrightNotice,
//     "schema:datePublished": record.publishedAt,
//     "schema:provider": {
//       "@type": "schema:Organization",
//       "schema:name": record.culturalAuthority.communityName
//     },

//     // Geospatial (sensitivity-aware)
//     "schema:spatialCoverage": {
//       "@type": "schema:Place",
//       "schema:name": record.associatedTerritory,
//       "schema:geo": record.sensitivityLevel === 'public'
//         ? {
//             "@type": "schema:GeoCoordinates",
//             "schema:latitude": record.location.latitude,
//             "schema:longitude": record.location.longitude
//           }
//         : {
//             "@type": "schema:GeoShape",
//             "schema:polygon": record.location.bufferZone // Fuzzy boundary for sensitive records
//           }
//     },

//     // Provenance
//     "schema:version": record.verificationStages.length.toString(),
//     "schema:creator": record.verificationStages[0].userName,
//     "schema:contributor": record.verificationStages
//       .filter((e: { action: string; }) => e.action === 'approved')
//       .map((e: { userName: any; }) => e.userName)
//   };

//   // Validate against schemas before returning
//   //validateJSONLD(jsonLd);

//   return JSON.stringify(jsonLd, null, 2);
// }
