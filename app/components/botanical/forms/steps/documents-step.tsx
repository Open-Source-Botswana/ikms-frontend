import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { PlantFormDraft } from "@/lib/store/plantStore";
import { DocumentCategory, PlantDocuments } from "@/lib/types/ethnobotanical";
import { set } from "date-fns";
import { motion } from "framer-motion";
import { FileSpreadsheet, FileText, FolderOpen, Plus, Trash2 } from "lucide-react";
import { Doc } from "prettier";
import { useState } from "react";


interface DocumentsStepProps {
    draft: PlantFormDraft;
    onUpdate: (updatedDraft: Partial<PlantFormDraft>) => void;
}

const DOC_TYPE_ICONS: Record<string, typeof FileText> = {
    pdf: FileText,
    docx: FileText,
    xlsx: FileSpreadsheet
}

const CATEGORY_LABELS: Record<string, string> = {
    research_paper: "Research Paper",
    consent_form: "Consent Form",
    benefit_agreement: "Benefit Agreement",
    field_notes: "Field Notes",
    other: "Other"
}

export const DocumentsStep = ({draft,onUpdate}: DocumentsStepProps)=>{

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [docType, setDocType] = useState<PlantDocuments["doc_type"]>("pdf");
    const [category, setCategory] = useState<DocumentCategory>("research_paper");


    const DocIcon = (docType: string) => DOC_TYPE_ICONS[docType] || FileText;
    const addDocument = () => {
        if (!name.trim() || !url.trim()) return;
        const newDoc: PlantDocuments = {
            id: `doc-${Date.now()}-${crypto.randomUUID()}`,
            title: name,
            description,
            url,
            doc_type: docType,
            date_added: new Date().toISOString(),
            category
        }
        onUpdate({documents: [...draft.documents, newDoc]});
        setName("");
        setUrl("");
        setDescription("");
    }
    const removeDocument = (id: string) => {
        onUpdate({documents: draft.documents.filter(d =>d.id !== id)});
    }


    return(
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6">

                 <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Documents</h2>
          <p className="text-sm text-muted-foreground">Attach research papers, consent forms, and related files</p>
        </div>
      </div>

            {/* Add Document Form */}
      <div className="p-4 border border-dashed border-border rounded-xl space-y-3 bg-muted/30">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Document
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="doc-name">Document Name *</Label>
            <Input id="doc-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Research Paper 2024" />
          </div>
          <div>
            <Label htmlFor="doc-url">URL / File Path *</Label>
            <Input id="doc-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/doc.pdf" />
          </div>
          <div>
            <Label>File Type</Label>
            <Select value={docType} onValueChange={(v) => setDocType(v as PlantDocuments['doc_type'])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="docx">Word Document</SelectItem>
                <SelectItem value="xlsx">Spreadsheet</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as DocumentCategory)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="research_paper">Research Paper</SelectItem>
                <SelectItem value="consent_form">Consent Form</SelectItem>
                <SelectItem value="benefit_agreement">Benefit Agreement</SelectItem>
                <SelectItem value="field_notes">Field Notes</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="doc-desc">Description</Label>
            <Input id="doc-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the document" />
          </div>
        </div>
        <Button onClick={addDocument} disabled={!name.trim() || !url.trim()} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Document
        </Button>
      </div>
      {/* Documents List */}
      {draft.documents.length > 0 ? (
        <div className="space-y-3">
          {draft.documents.map((doc, index) => {
            const Icon = DocIcon(doc.doc_type || "other");
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{doc.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                      {CATEGORY_LABELS[doc.category || "other"] || "Other"}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase">{doc.doc_type}</span>
                    {doc.doc_size && <span className="text-xs text-muted-foreground">{doc.doc_size}</span>}
                  </div>
                  {doc.description && <p className="text-xs text-muted-foreground mt-1 truncate">{doc.description}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                  onClick={() => removeDocument(doc.id ?? '')}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
          <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No documents added yet</p>
          <p className="text-xs mt-1">Add documents using the form above</p>
        </div>
      )}

        </motion.div>
    )
}

// export default DocumentsStep;
