export type LabelCategory = "Provenance" | "Protocol" | "Permission"

export type LabelDomain = "traditional" | "biocultural"

export const LABEL_TYPE_MAP: Record<string, LabelDomain | undefined> = {
  'traditional-knowledge-labels': 'traditional',
  'biocultural-labels': 'biocultural',

};

export type LabelTypeSlug = keyof typeof LABEL_TYPE_MAP;


export interface IKMSLabelMetadata {
    id: string
    apid?:string
    label_domain: LabelDomain //👈 Explicit domain
    title: string
    short_code: string
    category: LabelCategory
    description: string
    template_text: string
    label_image_url: string
    is_custom_label:string
    is_local_context_label:string
}

export type LabelsData = Record<string, IKMSLabelMetadata>
