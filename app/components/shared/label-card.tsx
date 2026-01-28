"use client"
import { IKMSLabelMetadata } from '@/lib/types/labels';

export default function LabelCard({ label }: { label: IKMSLabelMetadata }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-4">
        {label.label_image_url && (
          <img
            src={label.label_image_url}
            alt={`${label.title} label`}
            className="w-16 h-16 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <div>
          <h2 className="font-semibold text-lg">{label.title}</h2>
          <p className="text-sm text-gray-600 mt-1">{label.short_code}</p>
          <p className="mt-2 text-gray-800">{label.description}</p>
          <blockquote className="mt-3 italic text-gray-700 border-l-2 pl-3">
            {label.template_text}
          </blockquote>
        </div>
      </div>
    </div>
  );
}
