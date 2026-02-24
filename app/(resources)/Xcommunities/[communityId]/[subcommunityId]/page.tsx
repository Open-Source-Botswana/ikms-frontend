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
import { Dialog } from '@/app/components/ui/dialog'
import { Label } from '@/app/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs'
import { useCommunityStore } from '@/lib/store/communityStore'
import { Collection } from '@/lib/types/community'
import { cn, formatProtocolText, getProtocolColor } from '@/lib/utils'
import {
  ArrowLeft,
  BookOpen,
  Crown,
  Database,
  FolderOpen,
  Globe,
  Info,
  MapPin,
  Settings,
  Shield,
  ShieldBanIcon,
  UserPlus,
  Users,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'

export default function SubCommunityView() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const {
    currentCommunity,
    currentSubCommunity,
    setCurrentCollectionMetaData,
  } = useCommunityStore()

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

  const handleViewCollection = (collection: Partial<Collection>) => {
    setCurrentCollectionMetaData(collection)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {currentCommunity?.identity.title}
        </Button>
      </div>
      <Alert className="border-secondary">
        <Crown className="h-4 w-4 text-secondary" />
        <AlertDescription>
          {/* TODO: update to use the proper subcommunity */}
          This sub-community operates under the authority of{' '}
          {currentSubCommunity?.indigenousAuthority?.name ||
            currentCommunity?.identity.leadership?.primaryContact.name}{' '}
          {currentSubCommunity?.communityIdentifier} and follows traditional
          protocols for {currentCommunity?.identity.description}.
        </AlertDescription>
      </Alert>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-6 h-6 text-secondary" />
            <h1 className="text-3xl font-cultural">
              {currentSubCommunity?.title}
            </h1>
          </div>
          <p className="text-muted-foreground mb-2">
            {currentSubCommunity?.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Crown className="w-4 h-4" />
              <span>
                {currentSubCommunity?.indigenousAuthority?.name ||
                  currentCommunity?.identity.leadership?.primaryContact.name}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{currentSubCommunity?.geographicRegion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* stats */}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div>
                {/* <p className="text-2xl">{currentSubCommunity?.stats.memberCount}</p> */}
                <p className="text-2xl">100</p>
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
                {/* <p className="text-2xl">{subCommunity.stats.totalItems}</p> */}
                <p className="text-2xl">200</p>
                <p className="text-sm text-muted-foreground">Knowledge Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-secondary" />
              <div>
                {/* <p className="text-2xl">{subCommunity.stats.collectionCount}</p> */}
                <p className="text-2xl">2</p>
                <p className="text-sm text-muted-foreground">Collections</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-green-600" />
              <div>
                {/* <p className="text-2xl">{subCommunity.stats.publicItems}</p> */}
                <p className="text-2xl">170</p>
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
                {/* <p className="text-2xl">{subCommunity.stats.restrictedItems}</p> */}
                <p className="text-2xl">13</p>
                <p className="text-sm text-muted-foreground">
                  Restricted Items
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content area */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Indigenous Authority</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Responsible for maintaining cultural protocols and community
                  governance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{currentCommunity?.identity.region}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>
                    Community ID: {currentCommunity?.communityIdentifier}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This sub-community represents specific cultural and geographic
                  traditions within the larger community.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>TK Labels & Protocols</CardTitle>
              <CardDescription>
                Traditional Knowledge labels and cultural protocols in use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Local Context Labels</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSubCommunity?.localContextLabels?.map(label => (
                      <Badge
                        key={label}
                        variant="outline"
                        className="tk-cultural"
                      >
                        {label.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Access Protocols</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSubCommunity?.protocols?.map(protocol => (
                      <Badge
                        key={protocol}
                        className={getProtocolColor(protocol)}
                      >
                        {formatProtocolText(protocol)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          {/* Collections Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(currentSubCommunity?.collections?.length ?? 0) > 0 ? (
                currentSubCommunity?.collections?.map(collection => {
                  const linkUrl = `/collections/${collection.collectionMetadataIdentifier}/`
                  const isActive = collection.isActive
                  return (
                    <Link
                      onClick={() => handleViewCollection(collection)}
                      href={linkUrl}
                      className={cn(
                        'block',
                        'group relative overflow-hidden transition-all duration-300',
                        isActive && 'border-primary shadow-lg hover:shadow-xl'
                      )}
                    >
                      <Card
                        key={collection.collectionMetadataIdentifier}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {collection.title}
                          </CardTitle>
                          <CardDescription>
                            {collection.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Database className="w-4 h-4" />
                              <span>
                                {collection?.collectionType?.replace(/_/g, ' ')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>Curator: {collection?.curator?.name}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {collection?.subjects
                                ?.slice(0, 3)
                                .map((subject, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {subject}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                          <Button
                            className="w-full mt-4"
                            variant="outline"
                            onClick={() => handleViewCollection(collection)}
                          >
                            <FolderOpen className="w-4 h-4 mr-2" />
                            View Collection
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })
              ) : (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center">
                    <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg mb-2">No Collections Yet</h3>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3>Sub-Community Members</h3>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Join as a Member
            </Button>
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg mb-2">Member management coming soon</h3>
              <p className="text-muted-foreground">
                This feature will allow you to manage sub-community membership
                and roles.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Authority Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Indigenous Authority
                    </Label>
                    <p className="text-sm">
                      {currentSubCommunity?.indigenousAuthority?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentSubCommunity?.indigenousAuthority?.culturalTitle}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Parent Community
                    </Label>
                    <p className="text-sm">
                      {currentCommunity?.identity.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultural Protocols</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentCommunity?.protocols?.map(protocol => (
                    <div key={protocol} className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {formatProtocolText(protocol)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
