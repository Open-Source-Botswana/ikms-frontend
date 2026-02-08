import { useCommunityCreationStore } from '@/lib/store/communityCreation'
import React from 'react'
import { CommunityTypeSelector } from './communityTypeSelector'
import { Badge } from '../ui/badge'
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
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { Label } from '../ui/label'
import { v4 as uuidv4 } from 'uuid'

import { useCommunityStore } from '@/lib/store/communityStore'
import {
  CommunityGovernance,
  CulturalProtocol,
} from '@/lib/constants/community'

interface CommunityCreationFlowProps {
  onComplete?: () => void
  onCancel?: () => void
}
export default function CommunityCreationFlow({
  onComplete,
  onCancel,
}: CommunityCreationFlowProps) {
  const {
    step,
    communityData,
    nextStep,
    prevStep,
    updateCommunityData,
    resetForm,
  } = useCommunityCreationStore()

  const generateCommunityIdentifier = () => {
    return uuidv4()
  }
  const { addCommunity } = useCommunityStore()
  const steps = [
    {
      key: 'TYPE',
      title: 'Governance Type',
      description: 'Select community governance model',
    },
    {
      key: 'BASIC',
      title: 'Basic Information',
      description: 'Community details and identity',
    },
    {
      key: 'GOVERNANCE',
      title: 'Leadership',
      description: 'Define leadership structure',
    },
    {
      key: 'PROTOCOLS',
      title: 'Cultural Protocols',
      description: 'Set access and sharing protocols',
    },
    {
      key: 'REVIEW',
      title: 'Review',
      description: 'Confirm and create community',
    },
  ]

  const currentStepIndex = steps.findIndex(s => s.key === step)
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100
  const canProceed = () => {
    switch (step) {
      case 'TYPE':
        return !!communityData.governanceModel
      case 'BASIC':
        return !!(
          communityData.title &&
          communityData.description &&
          communityData.region &&
          communityData.language
        )
      case 'GOVERNANCE':
        return !!communityData.leadership?.primaryContact
      case 'PROTOCOLS':
        return true // Protocols are optional initially
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 'TYPE':
        return (
          <CommunityTypeSelector
            selectedType={communityData.governanceModel || null}
            onSelect={type => updateCommunityData({ governanceModel: type })}
          />
        )

      case 'BASIC':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Community Information</h3>
              <p className="text-muted-foreground">
                Provide basic details about your community
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <Label>Community Name *</Label>
                <Input
                  id="title"
                  value={communityData.title || ''}
                  onChange={e => updateCommunityData({ title: e.target.value })}
                  placeholder="Enter your community's name"
                  className="font-cultural"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  id="description"
                  value={communityData.description || ''}
                  onChange={e =>
                    updateCommunityData({ description: e.target.value })
                  }
                  placeholder="Describe your community's mission and cultural focus"
                  rows={4}
                  className="font-cultural"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Region *</Label>
                  <Input
                    id="region"
                    value={communityData.region || ''}
                    onChange={e =>
                      updateCommunityData({ region: e.target.value })
                    }
                    placeholder="Geographic region or territory"
                  />
                </div>

                <div>
                  <Label>Languages *</Label>
                  <Input
                    id="language"
                    value={communityData.language || ''}
                    onChange={e =>
                      updateCommunityData({ language: e.target.value })
                    }
                    placeholder="Traditional and working languages"
                    className="font-cultural"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 'GOVERNANCE':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Leadership Structure</h3>
              <p className="text-muted-foreground">
                Define your community's leadership and governance
              </p>
            </div>

            <div className="space-y-6 max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Primary Contact</CardTitle>
                  <CardDescription>
                    Main representative and community coordinator
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input
                        id="contact-name"
                        value={
                          communityData.leadership?.primaryContact?.name || ''
                        }
                        onChange={e =>
                          updateCommunityData({
                            leadership: {
                              ...communityData.leadership,
                              primaryContact: {
                                ...communityData.leadership?.primaryContact,
                                id:
                                  communityData.leadership?.primaryContact
                                    ?.id || 'temp-id',
                                name: e.target.value,
                                email:
                                  communityData.leadership?.primaryContact
                                    ?.email || '',
                                role:
                                  communityData.leadership?.primaryContact
                                    ?.role || '',
                              },
                            },
                          })
                        }
                        placeholder="Contact person name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-email">Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={
                          communityData.leadership?.primaryContact?.email || ''
                        }
                        onChange={e =>
                          updateCommunityData({
                            leadership: {
                              ...communityData.leadership,
                              primaryContact: {
                                ...communityData.leadership?.primaryContact,
                                id:
                                  communityData.leadership?.primaryContact
                                    ?.id || 'temp-id',
                                name:
                                  communityData.leadership?.primaryContact
                                    ?.name || '',
                                email: e.target.value,
                                role:
                                  communityData.leadership?.primaryContact
                                    ?.role || '',
                              },
                            },
                          })
                        }
                        placeholder="contact@community.org"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-role">Role</Label>
                      <Input
                        id="contact-role"
                        value={
                          communityData.leadership?.primaryContact?.role || ''
                        }
                        onChange={e =>
                          updateCommunityData({
                            leadership: {
                              ...communityData.leadership,
                              primaryContact: {
                                ...communityData.leadership?.primaryContact,
                                id:
                                  communityData.leadership?.primaryContact
                                    ?.id || 'temp-id',
                                name:
                                  communityData.leadership?.primaryContact
                                    ?.name || '',
                                email:
                                  communityData.leadership?.primaryContact
                                    ?.email || '',
                                role: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="Cultural Coordinator, Elder, etc."
                      />
                    </div>

                    <div>
                      <Label htmlFor="cultural-title">Cultural Title</Label>
                      <Input
                        id="cultural-title"
                        value={
                          communityData.leadership?.primaryContact
                            ?.culturalTitle || ''
                        }
                        onChange={e =>
                          updateCommunityData({
                            leadership: {
                              ...communityData.leadership,
                              primaryContact: {
                                ...communityData.leadership?.primaryContact,
                                id:
                                  communityData.leadership?.primaryContact
                                    ?.id || 'temp-id',
                                name:
                                  communityData.leadership?.primaryContact
                                    ?.name || '',
                                email:
                                  communityData.leadership?.primaryContact
                                    ?.email || '',
                                role:
                                  communityData.leadership?.primaryContact
                                    ?.role || '',
                                culturalTitle: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="Traditional title or position"
                        className="font-cultural"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {communityData.governanceModel ===
                CommunityGovernance.ELDER_COUNCIL && (
                <Card className="border-secondary">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>Elder Council</span>
                      <Badge className="bg-secondary">Special Authority</Badge>
                    </CardTitle>
                    <CardDescription>
                      Elders with traditional authority and cultural guidance
                      responsibilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Elder council members can be added after community
                      creation
                    </p>
                    <Button variant="outline" disabled>
                      Add Elder Council Members (Available After Setup)
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )

      case 'PROTOCOLS':
        const protocolOptions = [
          {
            protocol: CulturalProtocol.PUBLIC,
            title: 'Public Access',
            description: 'Content available to all visitors',
            color: 'protocol-public',
          },
          {
            protocol: CulturalProtocol.COMMUNITY_ONLY,
            title: 'Community Members Only',
            description: 'Restricted to verified community members',
            color: 'protocol-community',
          },
          {
            protocol: CulturalProtocol.ELDER_APPROVAL_REQUIRED,
            title: 'Elder Approval Required',
            description: 'Content requires elder council approval',
            color: 'protocol-restricted',
          },
          {
            protocol: CulturalProtocol.GENDER_RESTRICTED,
            title: 'Gender-Specific Protocols',
            description: 'Traditional gender-based access restrictions',
            color: 'protocol-restricted',
          },
        ]

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Cultural Protocols</h3>
              <p className="text-muted-foreground">
                Configure access levels and cultural protection protocols
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {protocolOptions.map(option => (
                  <Card
                    key={option.protocol}
                    className="cursor-pointer hover:shadow-md transition-all"
                  >
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        {option.title}
                        <Badge className={option.color} variant="outline">
                          Protocol
                        </Badge>
                      </CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="w-full">
                        Configure
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <p className="text-sm text-orange-800">
                    <strong>Note:</strong> Detailed protocol configuration can
                    be completed after community creation. These settings
                    establish your community's approach to knowledge sharing and
                    cultural protection.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'REVIEW':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl mb-2">Review Community Setup</h3>
              <p className="text-muted-foreground">
                Verify all information before creating your community
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{communityData.title}</span>
                    <Badge
                      className={
                        communityData.governanceModel ===
                        CommunityGovernance.ELDER_COUNCIL
                          ? 'bg-secondary'
                          : 'bg-primary'
                      }
                    >
                      {communityData.governanceModel?.replace(/_/g, ' ')}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{communityData.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label>Region</Label>
                      <p>{communityData.region}</p>
                    </div>
                    <div>
                      <Label>Languages</Label>
                      <p className="font-cultural">{communityData.language}</p>
                    </div>
                  </div>

                  <div>
                    <Label>Primary Contact</Label>
                    <div className="text-sm">
                      <p className="font-medium">
                        {communityData.leadership?.primaryContact?.name}
                      </p>
                      <p className="text-muted-foreground">
                        {communityData.leadership?.primaryContact?.email}
                      </p>
                      <p className="text-muted-foreground">
                        {communityData.leadership?.primaryContact
                          ?.culturalTitle ||
                          communityData.leadership?.primaryContact?.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">
                      Ready to Create Community
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    Your community will be created with the selected governance
                    model and protocols. You can invite members and begin
                    sharing knowledge immediately after creation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-4">
          <h2 className="text-2xl">Create New Community</h2>
          <Badge variant="outline">
            {currentStepIndex + 1} of {steps.length}
          </Badge>
        </div>

        <Progress value={progressPercentage} className="mb-4" />

        <div className="flex items-center justify-between">
          {steps.map((stepInfo, index) => {
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex

            return (
              <div key={stepInfo.key} className="flex-1 text-center">
                <div
                  className={`text-sm ${isActive ? 'text-primary font-medium' : isCompleted ? 'text-green-600' : 'text-muted-foreground'}`}
                >
                  {stepInfo.title}
                </div>
                <div className="text-xs text-muted-foreground hidden md:block">
                  {stepInfo.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">{renderStepContent()}</CardContent>
      </Card>
      {/* Navigation */}
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
          onClick={() => {
            if (step === 'REVIEW') {
              // TODO: submit data to backend api
              const newCommunity = {
                communityIdentifier: generateCommunityIdentifier(),
                identity: {
                  ...communityData,
                  id: Date.now().toString(),
                  establishedDate: new Date(),
                },
                members: [],
                knowledgeItems: [],
                protocols: [],
                stats: {
                  totalItems: 0,
                  publicItems: 0,
                  restrictedItems: 0,
                  memberCount: 0,
                  collectionCount: 0,
                  subCommunityCount: 0,
                },
              }

              addCommunity(newCommunity)

              alert('Community created successfully!')
              resetForm()
              onComplete?.()
            } else {
              nextStep()
            }
          }}
          disabled={!canProceed()}
          className="flex items-center space-x-2"
        >
          <span>{step === 'REVIEW' ? 'Create Community' : 'Next'}</span>
          {step !== 'REVIEW' && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}
