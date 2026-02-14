import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Camera, Star, Trash2, Plus, ImageIcon, Upload, LucideFile, FileText, Image, AlertCircle } from 'lucide-react';
import type { PlantFormDraft } from '@/lib/store/plantStore';
import type { PlantImages } from '@/lib/types/ethnobotanical';
import { useState } from 'react';
import { ExtendedFile } from '@/lib/types';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { isDragActive } from 'framer-motion'
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';

interface ImagesStepProps {
  draft: PlantFormDraft;
  onUpdate: (updates: Partial<PlantFormDraft>) => void;
}

export const ImagesStep = ({ draft, onUpdate }: ImagesStepProps) => {
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCredit, setNewCredit] = useState('');
  const [files, setFiles] = useState<ExtendedFile[]>([])
    const maxFiles = 5
    const maxSize = 10 * 1024 * 1024

   const { getRootProps, getInputProps, isDragReject } = useDropzone({
     accept: {
       'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
       'application/pdf': ['.pdf'],
       'application/msword': ['.doc'],
       'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
         ['.docx'],
     },
     onDrop: acceptedFiles => {
       setFiles(acceptedFiles)
        setNewUrl(acceptedFiles[0] ? URL.createObjectURL(acceptedFiles[0]) : '')
        addImage()
     },
   })

    const getFileIcon = (file: File) => {
       // eslint-disable-next-line jsx-a11y/alt-text
       if (file.type.startsWith('image/')) return <Image className="h-6 w-6" />
       if (file.type === 'application/pdf') return <FileText className="h-6 w-6" />
       return <LucideFile className="h-6 w-6" />
    }

  const addImage = () => {
    if (!newUrl.trim()) return;
    const newImage: PlantImages = {
      id: `img-${Date.now()}`,
      url: newUrl.trim(),
    //   caption: newCaption.trim() || undefined,
      credit: newCredit.trim() || undefined,
      isBanner: draft.galleryImages.length === 0,
      date_added: new Date().toISOString()
    };
    onUpdate({ galleryImages: [...draft.galleryImages, newImage] });
    setNewUrl('');
    setNewCaption('');
    setNewCredit('');
  };



  const removeImage = (id: string) => {
    const updated = draft.galleryImages.filter(img => img.id !== id);
    if (updated.length > 0 && !updated.some(img => img.isBanner)) {
      updated[0].isBanner = true;
    }
    onUpdate({ galleryImages: updated });
  };

  const setMainImage = (id: string) => {
    onUpdate({
      galleryImages: draft.galleryImages.map(img => ({
        ...img,
        isBanner: img.id === id
      }))
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Camera className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Plant Images</h2>
          <p className="text-sm text-muted-foreground">Add and manage gallery images</p>
        </div>
      </div>

      {/* Add Image Form */}
      <div className="p-4 border border-dashed border-border rounded-xl space-y-3 bg-muted/30">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Image
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <Label htmlFor="img-url">Image URL *</Label>
            <Input
              id="img-url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <Label htmlFor="img-caption">Caption</Label>
            <Input
              id="img-caption"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="Describe the image"
            />
          </div>
          <div>
            <Label htmlFor="img-credit">Credit / Attribution</Label>
            <Input
              id="img-credit"
              value={newCredit}
              onChange={(e) => setNewCredit(e.target.value)}
              placeholder="Photographer or source"
            />
          </div>
        </div>
        <Button onClick={addImage} disabled={!newUrl.trim()} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Image
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
                          <Badge variant="outline">JPG</Badge>
                          <Badge variant="outline">PNG</Badge>
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

      {/* Gallery Grid */}
      {draft.galleryImages.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {draft.galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative group rounded-lg border overflow-hidden ${
                img.isBanner ? 'border-primary ring-2 ring-primary/20' : 'border-border'
              }`}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={img.url}
                  alt={img.captions || 'Plant image'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              {img.isBanner && (
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" /> Banner
                </span>
              )}
              <div className="p-2 space-y-1">
                {img.captions && <p className="text-xs text-foreground/80 truncate">{img.captions}</p>}
                {img.credit && <p className="text-xs text-muted-foreground truncate">📷 {img.credit}</p>}
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!img.isBanner && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setMainImage(img.id)}
                    title="Set as main image"
                  >
                    <Star className="w-3 h-3" />
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeImage(img.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No images added yet</p>
          <p className="text-xs mt-1">Add images using URLs above</p>
        </div>
      )}
    </motion.div>
  );
};
