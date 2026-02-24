import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { FileText, File, FileSpreadsheet, Image, ExternalLink, X, Download, Eye, Icon } from 'lucide-react';
import type { PlantDocuments } from '@/lib/types/ethnobotanical';

interface DocumentViewerProps {
  documents: PlantDocuments[];
}

const DOC_ICONS: Record<string, typeof FileText> = {
  pdf: FileText,
  docx: File,
  xlsx: FileSpreadsheet,
  image: Image,
  other: File
};

const CATEGORY_COLORS: Record<string, string> = {
  research_paper: 'bg-primary/10 text-primary',
  consent_form: 'bg-green-500/10 text-green-600',
  benefit_agreement: 'bg-amber-500/10 text-amber-600',
  field_notes: 'bg-blue-500/10 text-blue-600',
  other: 'bg-muted text-muted-foreground'
};

const CATEGORY_LABELS: Record<string, string> = {
    research_paper: "Research Paper",
    consent_form: "Consent Form",
    benefit_agreement: "Benefit Agreement",
    field_notes: "Field Notes",
    other: "Other"
}

export const DocumentViewer = ({ documents }: DocumentViewerProps) => {
  const [previewDoc, setPreviewDoc] = useState<PlantDocuments | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...new Set(documents.map(d => d.category))];
  const filtered = activeCategory === 'all' ? documents : documents.filter(d => d.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      {/* <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div> */}

      {/* Documents List */}
      <div className="space-y-2">
        {filtered.map((doc, index) => {
          const Icon = DOC_ICONS[doc.doc_type || "other"] || FileText;
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{doc.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[doc.category || "other"]}`}>
                    {CATEGORY_LABELS[doc.category || "other"] || "Other"}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase">{doc.doc_type}</span>
                  {doc.doc_size && <span className="text-[10px] text-muted-foreground">{doc.doc_size}</span>}
                </div>
                {doc.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{doc.description}</p>}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPreviewDoc(doc)}
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => window.open(doc.url, '_blank')}
                  title="Open"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  {(() => {
                      const DocIcon = (docType: string) => DOC_ICONS[docType] || FileText;
                      const Icon = DocIcon(previewDoc.doc_type ? previewDoc.doc_type : "other");
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                  <div>
                    <h3 className="font-semibold text-sm">{previewDoc.title}</h3>
                    <p className="text-xs text-muted-foreground">

                      {CATEGORY_LABELS[previewDoc.category || "other"] || "Other"}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.open(previewDoc.url, '_blank')}>
                    <Download className="w-3 h-3 mr-1" /> Download
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPreviewDoc(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-6">
                {previewDoc.doc_type === 'pdf' ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-8 text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-primary/30" />
                      <p className="font-medium">{previewDoc.title}</p>
                      {previewDoc.description && (
                        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{previewDoc.description}</p>
                      )}
                      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                        {previewDoc.doc_size && <span>Size: {previewDoc.doc_size}</span>}
                        <span>Added: {new Date(previewDoc.date_added).toLocaleDateString()}</span>
                      </div>
                      <Button className="mt-4" onClick={() => window.open(previewDoc.url, '_blank')}>
                        <ExternalLink className="w-4 h-4 mr-2" /> Open PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-8 text-center">
                    <File className="w-16 h-16 mx-auto mb-4 text-primary/30" />
                    <p className="font-medium">{previewDoc.title}</p>
                    {previewDoc.description && (
                      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{previewDoc.description}</p>
                    )}
                    <Button className="mt-4" onClick={() => window.open(previewDoc.url, '_blank')}>
                      <ExternalLink className="w-4 h-4 mr-2" /> Open File
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
