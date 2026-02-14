
import LabelCard from '@/app/components/shared/label-card';
import { loadLabelsData } from '@/lib/load-labels';

import { notFound } from 'next/navigation';
import { LABEL_TYPE_MAP, LabelTypeSlug } from '@/lib/types/labels';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ labelType: string }>;
}) {
  const { labelType } = await params;
  const slug = labelType;

  const titleMap: Record<LabelTypeSlug, string> = {
    'traditional-knowledge-labels': 'Traditional Knowledge Labels',
    'biocultural-labels': 'Biocultural Labels',
  };

  const title = titleMap[slug as LabelTypeSlug] || 'Labels';
  return { title };
}

export async function generateStaticParams() {
  return Object.keys(LABEL_TYPE_MAP).map((labelType) => ({
    labelType,
  }));
}


export default async function LabelTypePage({
  params,
}: {
  params: Promise<{ labelType: string }>;
}) {

  const { labelType } = await params;
  const slug = labelType;

  const domain = LABEL_TYPE_MAP[slug as LabelTypeSlug];
  if (!domain) {
    notFound();
  }

  const allLabels = await loadLabelsData();
  const filteredLabels = Object.values(allLabels).filter(
    (label) => label.label_domain === domain
  );

  const pageTitle =
    slug === 'traditional-knowledge-labels'
      ? 'Traditional Knowledge Labels'
      : 'Biocultural Labels';

  if (filteredLabels.length === 0) {
    return (
      <div className="p-6">
        No {pageTitle.toLowerCase()} available.
      </div>
    );
  }

  return (
    <div className="p-6 mt-28">
      <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLabels.map((label) => (
          <LabelCard key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
}
