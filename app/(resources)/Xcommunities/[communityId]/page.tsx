'use client'

import { Alert, AlertDescription } from '@/app/components/ui/alert'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs'
import { CommunityGovernance } from '@/lib/constants/community'
import { useCommunityStore } from '@/lib/store/communityStore'
import { SubCommunityData } from '@/lib/types/community'
import {
  cn,
  formatGovernanceText,
  formatProtocolText,
  getProtocolColor,
} from '@/lib/utils'
import {
  BookOpen,
  Calendar,
  Crown,
  Database,
  Globe,
  Info,
  Languages,
  LucideArrowLeft,
  MapPin,
  Plus,
  Settings,
  Shield,
  ShieldBanIcon,
  Trash2,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function CommunityView() {
  const { currentCommunity, setCurrentSubCommunity } = useCommunityStore()
  const [showContributeDialog, setShowContributeDialog] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()
  const getGovernanceIcon = (model: CommunityGovernance) => {
    switch (model) {
      case CommunityGovernance.ELDER_COUNCIL:
        return <Crown className="w-4 h-4" />
      case CommunityGovernance.INDIGENOUS_COUNCIL:
        return <Users className="w-4 h-4" />
      case CommunityGovernance.STEWARDSHIP_CIRCLE:
        return <Shield className="w-4 h-4" />
    }
  }

  if (!currentCommunity) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          No community selected. Please select a community from the directory.
        </AlertDescription>
      </Alert>
    )
  }
  const handleViewSubCommunity = (community: Partial<SubCommunityData>) => {
    setCurrentSubCommunity(community)
  }
  return (
    <div className="p-6 space-y-6">
      <Button
        onClick={() => router.back()}
        variant={'ghost'}
        size="icon"
        className="mb-9"
      >
        <LucideArrowLeft size={20} />
      </Button>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          IKMS Communities. For full community governance, user authentication,
          and secure knowledge storage please contact the relevant authorities
          using our community contact list.
        </AlertDescription>
      </Alert>
      {/* community header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl">{currentCommunity.identity.title}</h1>
            <Badge variant="secondary" className="flex items-center space-x-1">
              {currentCommunity.identity.governanceModel !== undefined &&
                getGovernanceIcon(currentCommunity.identity.governanceModel)}
              <span>
                {' '}
                {currentCommunity.identity.governanceModel !== undefined &&
                  formatGovernanceText(
                    currentCommunity.identity.governanceModel
                  )}
              </span>
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            {currentCommunity.identity.description}
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{currentCommunity.identity.region}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Languages className="w-4 h-4" />
              <span>{currentCommunity.identity.language}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>
                Est.{' '}
                {currentCommunity.identity.establishedDate
                  ? typeof currentCommunity.identity.establishedDate ===
                    'string'
                    ? currentCommunity.identity.establishedDate
                    : currentCommunity.identity.establishedDate.toLocaleDateString()
                  : ''}
              </span>
            </div>
          </div>
        </div>
        {/* action menu */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Primary actions */}
          <div className="flex items-center space-x-2">
            <Button onClick={() => setShowContributeDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Contribute
            </Button>
            <Button onClick={() => setShowContributeDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Request to join.
            </Button>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-2xl">
                  {currentCommunity.stats.subCommunityCount}
                </p>
                <p className="text-sm text-muted-foreground">Sub-Communities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-secondary" />
              <div>
                <p className="text-2xl">
                  {currentCommunity.stats.collectionCount}
                </p>
                <p className="text-sm text-muted-foreground">Collections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-2xl">{currentCommunity.stats.memberCount}</p>
                <p className="text-sm text-muted-foreground">Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-2xl">{currentCommunity.stats.totalItems}</p>
                <p className="text-sm text-muted-foreground">Knowledge Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-2xl">{currentCommunity.stats.publicItems}</p>
                <p className="text-sm text-muted-foreground">Public Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShieldBanIcon className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-2xl">
                  {currentCommunity.stats.restrictedItems}
                </p>
                <p className="text-sm text-muted-foreground">
                  Restricted Items
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full rounded-sm space-y-4"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="community">Sub Commmunities</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="protocols">Protocols&Processes</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4>Primary Contact</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {
                        currentCommunity.identity.leadership?.primaryContact
                          .name
                      }
                    </p>
                    <p>
                      {
                        currentCommunity.identity.leadership?.primaryContact
                          .role
                      }
                    </p>
                    {currentCommunity.identity.leadership?.primaryContact
                      .culturalTitle && (
                      <p className="font-cultural italic">
                        {
                          currentCommunity.identity.leadership.primaryContact
                            .culturalTitle
                        }
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4>Cultural Protocols</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentCommunity.protocols.map((protocol, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={getProtocolColor(protocol)}
                      >
                        {formatProtocolText(protocol)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest community activities and contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Plus className="w-4 h-4 text-green-600" />
                    <span>
                      New Protocol item added: "Traditional Healing Practices"
                    </span>
                    <span className="text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>New member joined: Sam Kenpachi</span>
                    <span className="text-muted-foreground">1 day1 ago</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Shield className="w-4 h-4 text-yellow-600" />
                    <span>Protocol updated: Elder approval required</span>
                    <span className="text-muted-foreground">1 ady ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* {currentCommunity.subCommunities?.map((subCommunity) => ( */}
              {(currentCommunity?.subCommunities?.length ?? 0) > 0 ? (
                currentCommunity.subCommunities?.map(subCommunity => {
                  const linkUrl = `/communities/${currentCommunity.communityIdentifier}/${subCommunity.communityIdentifier}`
                  const isActive = subCommunity.isActive

                  return (
                    <Link
                      onClick={() => handleViewSubCommunity(subCommunity)}
                      href={linkUrl}
                      className={cn(
                        'block',
                        'group relative overflow-hidden transition-all duration-300',
                        isActive && 'border-primary shadow-lg hover:shadow-xl'
                      )}
                    >
                      <Card
                        key={subCommunity.communityIdentifier}
                        className="hover:shadow-lg transition-shadow border-secondary/20"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <Users className="w-5 h-5 text-secondary" />
                            <span>{subCommunity.title}</span>
                          </CardTitle>
                          <CardDescription>
                            {subCommunity.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Crown className="w-4 h-4" />
                              <span>
                                Authority:{' '}
                                {subCommunity.indigenousAuthority?.name ||
                                  currentCommunity.identity.leadership
                                    ?.primaryContact.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{subCommunity.geographicRegion}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center text-sm">
                              <div>
                                {/* <p className="text-lg">{subCommunity.stats.memberCount}</p> */}
                                <p className="text-lg">100</p>
                                <p className="text-muted-foreground text-xs">
                                  Members
                                </p>
                              </div>
                              <div>
                                {/* <p className="text-lg">{subCommunity.stats.collectionCount}</p> */}
                                <p className="text-lg">10</p>
                                <p className="text-muted-foreground text-xs">
                                  Collections
                                </p>
                              </div>
                              <div>
                                {/* <p className="text-lg">{subCommunity.stats.totalItems}</p> */}
                                <p className="text-lg">200</p>
                                <p className="text-muted-foreground text-xs">
                                  Items
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Shield className="w-4 h-4" />
                              {subCommunity.protocols &&
                                subCommunity.protocols.length > 0 && (
                                  <Badge
                                    variant="outline"
                                    className={getProtocolColor(
                                      subCommunity.protocols[0]
                                    )}
                                  >
                                    {formatProtocolText(
                                      subCommunity.protocols[0]
                                    )}
                                  </Badge>
                                )}
                            </div>
                            <Button
                              className="w-full"
                              variant="outline"
                              onClick={() => {}}
                            >
                              View Community
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })
              ) : (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center">
                    <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg mb-2">No Sub-Community Yet</h3>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
