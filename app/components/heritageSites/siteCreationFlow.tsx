
'use client'
import { useState } from 'react'
import { Progress } from '../ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight, CheckCircle, FileText, LucideFile, Image, Upload, AlertCircle, Trash2 } from 'lucide-react'
import { Label } from '../ui/label'
import { v4 as uuidv4 } from 'uuid'
import { Badge } from '../ui/badge'
import { SiteTypeSelector } from './siteTypeSelector'
import { useSiteCreationStore } from '@/lib/store/siteStore'
import { siteService } from '@/lib/services/api/sitesService'
import { useCreateSite, useSites } from '@/app/hooks/use-sites'
import { SensitivityLevel, SiteCategory } from '@/lib/types/sitesData'
import { ExtendedFile } from '@/lib/types'
import { isDragActive } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'

interface SiteCreationFlowProps {
  onComplete?: () => void
  onCancel?: () => void
}

export default function SiteCreationFlow({
  onComplete,
  onCancel,
}: SiteCreationFlowProps) {
  const {
    step,
    siteData,
    nextStep,
    prevStep,
    addSiteData,
    updateSiteData,
    resetForm,
  } = useSiteCreationStore()

  const { createSite, isCreating, errorCreating } = useCreateSite()
  const { refreshSites } = useSites();


  // media upload
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
    },
  })
  const getFileIcon = (file: File) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    if (file.type.startsWith('image/')) return <Image className="h-6 w-6" />
    if (file.type === 'application/pdf') return <FileText className="h-6 w-6" />
    return <LucideFile className="h-6 w-6" />
  }
  const [articleTermsAccepted, setArticleTermsAccepted] = useState(false)



  const steps = [
    { key: 'TYPE', title: 'Site Type', description: 'Select the site category' },
    { key: 'BASIC', title: 'Basic Information', description: 'Site details and identity' },
    { key: 'METADATA', title: 'Metadata', description: 'Cultural and contextual metadata' },
    { key: 'UPLOADS', title: 'Uploads', description: 'Images & file uploads' },
    { key: 'REVIEW', title: 'Review', description: 'Confirm before creation' },
  ]

  const options: { label: string; value: SensitivityLevel }[] = [
    { label: 'Public', value: 'public' },
    { label: 'Restricted', value: 'restricted' },
    { label: 'Closed', value: 'closed' },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step)
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100

  // ---------- VALIDATION PER STEP ----------
  const canProceed = () => {
    switch (step) {
      case 'TYPE':
        return !!siteData.category

      case 'BASIC':
        return (
          !!siteData.site_name &&
          !!siteData.description &&
          siteData.latitude !== undefined &&
          siteData.longitude !== undefined
        )

      case 'METADATA':
        return (
          !!siteData.metadata?.local_context &&
          !!siteData.metadata?.indigenous_system &&
          !!siteData.metadata?.rights &&
          !!siteData.metadata?.ip_metadata &&
          !!siteData.metadata?.access_protocol
        )

      case 'UPLOADS':
        return true

      case 'REVIEW':
        return true

      default:
        return true
    }
  }

  // ---------- RENDER STEPS ----------
  const renderStepContent = () => {
    switch (steps[currentStepIndex].key) {
      case 'TYPE':
        return (
          <SiteTypeSelector
            selectedType={siteData.category || 'heritage'}
            onSelect={(type) => updateSiteData({ category: type as SiteCategory })}
          />
        )

      case 'BASIC':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Site Information</h3>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <Label>Site Name *</Label>
                <Input
                  value={siteData.site_name || ''}
                  onChange={e => updateSiteData({ site_name: e.target.value })}
                  placeholder="Enter Site name"
                  className="font-cultural"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={siteData.description || ''}
                  onChange={e => updateSiteData({ description: e.target.value })}
                  placeholder="Describe the site"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Latitude *</Label>
                  <Input
                    value={siteData.latitude || ''}
                    onChange={e =>
                      updateSiteData({ latitude: Number(e.target.value) })
                    }
                    placeholder="Latitude"
                  />
                </div>

                <div>
                  <Label>Longitude *</Label>
                  <Input
                    value={siteData.longitude || ''}
                    onChange={e =>
                      updateSiteData({ longitude: Number(e.target.value) })
                    }
                    placeholder="Longitude"
                  />
                </div>

                <div>
                  <Label>Population Density</Label>
                  <Input
                    value={siteData.population_density || ''}
                    onChange={e =>
                      updateSiteData({ population_density: Number(e.target.value) })
                    }
                    placeholder="Population density"
                  />
                </div>

                <div>
                  <Label>Migration Route *</Label>
                  <Input
                    value={siteData.migration_route || ''}
                    onChange={e => updateSiteData({ migration_route: e.target.value })}
                    placeholder="Migration Route"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'METADATA':
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Metadata</h3>
            </div>

            <div className="space-y-4">
              {/* UNESCO */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={siteData.metadata?.unesco || false}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        unesco: e.target.checked,
                      },
                    })
                  }
                />
                <Label>UNESCO Site</Label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={siteData.metadata?.unicef || false}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        unicef: e.target.checked,
                      },
                    })
                  }
                />
                <Label>UNICEF Site</Label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={siteData.metadata?.undp || false}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        undp: e.target.checked,
                      },
                    })
                  }
                />
                <Label>UNDP Site</Label>
              </div>



              <div>
                <Label>Local Context *</Label>
                <Input
                  value={siteData.metadata?.local_context || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        local_context: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label>Indigenous System *</Label>
                <Input
                  value={siteData.metadata?.indigenous_system || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        indigenous_system: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label>Rights *</Label>
                <Input
                  value={siteData.metadata?.rights || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        rights: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label>IP Metadata *</Label>
                <Input
                  value={siteData.metadata?.ip_metadata || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        ip_metadata: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <Label>Sensitivity Level *</Label>

                <div className="space-y-3">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center ps-4 border border-default bg-neutral-primary-soft rounded-base"
                    >
                      <input
                        id={`sensitivity-${option.value}`}
                        type="radio"
                        name="sensitivity_level"
                        value={option.value}
                        checked={siteData.metadata?.sensitivity_level === option.value}
                        onChange={() =>
                          updateSiteData({
                            metadata: {
                              ...(siteData.metadata as any),
                              sensitivity_level: option.value,
                            },
                          })
                        }
                        className="
              w-4 h-4
              text-neutral-primary
              border-default-medium
              bg-neutral-secondary-medium
              rounded-full
              checked:border-brand
              focus:ring-2
              focus:outline-none
              focus:ring-brand-subtle
              border
              border-default
              appearance-none
            "
                      />
                      <label
                        htmlFor={`sensitivity-${option.value}`}
                        className="w-full py-4 select-none ms-2 text-sm font-medium text-heading"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>

              </div>



              <div>
                <Label>Access Protocol *</Label>
                <Input
                  value={siteData.metadata?.access_protocol || ''}
                  onChange={e =>
                    updateSiteData({
                      metadata: {
                        ...(siteData.metadata as any),
                        access_protocol: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )

      case 'UPLOADS':
        return (
          <div className="text-center py-10">
            <h3 className="text-xl mb-2">Media Uploads</h3>
            <div className="mt-12 bg-muted p-10 rounded-lg mb-12">
              <h3 className="text-xl font-bold mb-4">Submission Guidelines</h3>
              <ul className="list-disc md:list-decimal space-y-2">
                <li>
                  All submissions must be original or properly attributed with
                  citations.
                </li>
                <li>
                  Content should be fact-checked and verified from reliable
                  sources.
                </li>
                <li>
                  Supporting files should be clear, relevant and under 10MB each.
                </li>
                <li>
                  Submissions will undergo a review process before publication.
                </li>
                <li>
                  As a contributor you retain copyright of your work but grant us
                  a license to display it.
                </li>
              </ul>
            </div>
            <Label>Supporting files</Label>
            <div className="flex flex-col items-center justify-center text-center">
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
                        or click to browse your files
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
                    Files ({files.length}/{maxFiles})
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

            <div className="pt-4 border-t">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mr-2 mt-1"
                  checked={articleTermsAccepted}
                  onChange={e =>
                    setArticleTermsAccepted(e.target.checked)
                  }
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I confirm that this content is original or properly
                  attributed and I agree to the
                  <a
                    href="#"
                    className="ml-1 hover:underline text-primary"
                  >
                    {' '}
                    Terms and Conditions
                  </a>
                </Label>
              </div>
            </div>
          </div>
        )

      case 'REVIEW':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Review Site</h3>
              <p className="text-muted-foreground">Confirm all information</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>{siteData.site_name}</CardTitle>
                  <CardDescription>{siteData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Latitude</Label>
                      <p>{siteData.latitude}</p>
                    </div>
                    <div>
                      <Label>Longitude</Label>
                      <p>{siteData.longitude}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Ready to Create Site</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  async function handleCreateSite() {

    // console.error(" 🚀 View File: ", file['name'])

    const properFiles = files.map(file => new File([file], file.name))

    updateSiteData({ uploaded_images: properFiles })


    try {

      await createSite(siteData);
      await refreshSites();

      alert("Site created successfully!");

      resetForm();
      onComplete?.();
    } catch (err) {
      console.error("❌ Failed to create site:", err);
      alert("Failed to create site. Check logs and backend.");
    }
  }

  // ---------- MAIN RETURN ----------
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-4">
          <h2 className="text-2xl">Create New Site</h2>
          <Badge variant="outline">
            {currentStepIndex + 1} of {steps.length}
          </Badge>
        </div>

        <Progress value={progressPercentage} className="mb-4" />

        <div className="flex items-center justify-between">
          {steps.map((stepInfo, index) => (
            <div key={stepInfo.key} className="flex-1 text-center">
              <div
                className={`text-sm ${index === currentStepIndex
                  ? 'text-primary font-medium'
                  : index < currentStepIndex
                    ? 'text-green-600'
                    : 'text-muted-foreground'
                  }`}
              >
                {stepInfo.title}
              </div>
              <div className="text-xs text-muted-foreground hidden md:block">
                {stepInfo.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 'TYPE'}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <Button
          disabled={isCreating || !canProceed()}
          onClick={() => {
            if (step === "REVIEW") {
              handleCreateSite();
            } else {
              nextStep();
            }
          }}
          className="flex items-center space-x-2"
        >
          <span>
            {step === "REVIEW" ? (isCreating ? "Creating..." : "Create Site") : "Next"}
          </span>
          {step !== "REVIEW" && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
