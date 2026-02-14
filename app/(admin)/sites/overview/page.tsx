'use client'

import SiteCreationFlow from '@/app/components/heritageSites/siteCreationFlow'
import { SitesDirectory } from '@/app/components/heritageSites/sitesDirectory'
import { Alert, AlertDescription } from '@/app/components/ui/alert'
import { Button } from '@/app/components/ui/button'
import { Info, Plus } from 'lucide-react'
import React, { useState } from 'react'

export default function CommunityPage() {
  const [currentView, setCurrentView] = useState('directory')
  const [showCreateSite, setShowCreateSite] = useState(false)

  const handleBackToMain = () => {
    setShowCreateSite(false)
    setCurrentView('directory')
  }

  const renderCurrentView = () => {
    if (showCreateSite) {
      return (
        <SiteCreationFlow
          onComplete={() => setShowCreateSite(false)}
          onCancel={() => setShowCreateSite(false)}
        />
      )
    }

    switch (currentView) {
      case 'directory':
        return <SitesDirectory onNavigate={setCurrentView} />

      default:
        return <SitesDirectory />
    }
  }
  return (
    <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          IKMS demonstrates. For full community governance, user authentication,
          and secure knowledge storage.
        </AlertDescription>
      </Alert>

      {!showCreateSite && currentView === 'directory' && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={() => setShowCreateSite(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Site</span>
          </Button>

        </div>
      )}

      {renderCurrentView()}
    </main>
  )
}
