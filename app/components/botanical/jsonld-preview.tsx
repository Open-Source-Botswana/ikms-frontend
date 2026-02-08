// components/admin/JSONLDPreview.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Alert, AlertDescription } from '@/app/components/ui/alert';

interface JSONLDPreviewProps {
  jsonLd: string ;
}

export function JSONLDPreview({ jsonLd }: JSONLDPreviewProps) {
  const [copied, setCopied] = useState(false);

  const jsonLd2 = JSON.stringify({
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
  })

  if (!jsonLd2) {
    return (
      <Alert>
        <AlertDescription>
          JSON-LD metadata will be generated automatically upon publication
        </AlertDescription>
      </Alert>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonLd2);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format JSON for display
  let formattedJson = '';
  try {
    // const parsed = JSON.parse(jsonLd);
    formattedJson = JSON.stringify(jsonLd2, null, 2);
  } catch (e) {
    // Keep as-is if invalid
  }



  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3 w-full">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Schema.org</Badge>
          <Badge variant="outline">Darwin Core</Badge>
          <Badge variant="outline">Local Contexts</Badge>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="gap-1"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy JSON-LD
            </>
          )}
        </Button>
      </div>

      <div className="bg-zinc-900 text-emerald-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-[300px] w-full">
        <pre className="whitespace-pre-wrap break-words w-full">
          {jsonLd2}
        </pre>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        This machine-readable metadata enables interoperability with global biodiversity databases (GBIF),
        cultural heritage systems, and research repositories.
      </p>
    </div>
  );
}
