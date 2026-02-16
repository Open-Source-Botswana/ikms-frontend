import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { PlantFormDraft } from "@/lib/store/plantStore";
import { DocumentCategory, PlantDocuments } from "@/lib/types/ethnobotanical";
import { AlertCircle, FileSpreadsheet, FileText, FolderOpen, LucideFile, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { ExtendedFile } from '@/lib/types';
import { useDropzone } from 'react-dropzone';
import { isDragActive } from 'framer-motion'
import { cn } from "@/lib/utils";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";


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

export const DocumentsStep = ({ draft, onUpdate }: DocumentsStepProps) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [docType, setDocType] = useState<PlantDocuments["doc_type"]>("pdf");
  const [category, setCategory] = useState<DocumentCategory>("research_paper");
  const [newUrl, setNewUrl] = useState('');

  // Files
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  const maxFiles = 5
  const maxSize = 10 * 1024 * 1024; // 10MB

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],

    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles)
      setNewUrl(acceptedFiles[0] ? URL.createObjectURL(acceptedFiles[0]) : "");
      addDocument();
    }
  })

  const getFileIcon = (file: File) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    if (file.type === 'application/pdf') return <FileText className="h-6 w-6" />
    return <LucideFile className="h-6 w-6" />
  }


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
    onUpdate({ documents: [...draft.documents, newDoc] });
    setName("");
    setUrl("");
    setDescription("");
  }
  const removeDocument = (id: string) => {
    onUpdate({ documents: draft.documents.filter(d => d.id !== id) });
  }

  return (
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


      <div className="p-4 border border-dashed border-border rounded-xl space-y-3 bg-muted/30">
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 transition-colors duration-300 ease-in-out',
            isDragActive() &&
            !isDragReject &&
            'border-primary bg-primary/5',
            isDragReject && 'border-destructive bg-destructive/5',
            !isDragActive &&
            !isDragReject &&
            'border-border hover:border-primary/50 hover:bg-accent/30',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center text-center">
            <Upload
              className={cn(
                'h-12 w-12 mb-4 transition-colors',
                isDragActive() &&
                !isDragReject &&
                'text-primary animate-pulse',
                isDragReject && 'text-destructive',
                !isDragActive() &&
                !isDragReject &&
                'text-muted-foreground'
              )}
            />

            {isDragReject ? (
              <div className="flex items-center text-destructive">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p className="font-medium">
                  Some files are not allowed
                </p>
              </div>
            ) : (
              <>
                <p className="text-lg font-medium mb-1">
                  {isDragActive()
                    ? 'Drop the files here'
                    : 'Drag & drop files here'}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse your fimles
                </p>
              </>
            )}
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline">PDF</Badge>
              <Badge variant="outline">DOCX</Badge>
              <Badge variant="outline">Excel</Badge>
              <Badge variant="outline">Other</Badge>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Max {maxFiles} files, up to{' '}
              {Math.round(maxSize / (1024 * 1024))}MB each
            </p>
          </div>


        </div>
        {/* files */}

        {files.length > 0 && (

          <div className='mt-6 space-y-4'>
            <h4 className="font-medium">
              {/* Files ({files.length}/{maxFiles}) */}
              Allowed Files {draft.galleryImages.length}/{maxFiles}
            </h4>

            <div className='space-y-3'>
              {files.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center bg-card rounded-lg p-3 shadow-sm'
                >

                  <div className="mr-3 text-primary">
                    {getFileIcon(file)}
                  </div>
                  <div className='flex-1 min-w-0'>

                    <div className="flex justify-between mb-1">
                      <p className="font-medium text-sm">
                        {file.name}
                      </p>
                      <p className="ml-2 text-xs text-muted-foreground ">
                        {(file.size / 1024).toFixed(1)}KB
                      </p>
                    </div>
                    <Progress
                      value={file.progress}
                      className="h-1"
                    />

                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      setFiles(files.filter((f) => f !== file))
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>

                </div>
              ))}

            </div>

          </div>
        )
        }

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
