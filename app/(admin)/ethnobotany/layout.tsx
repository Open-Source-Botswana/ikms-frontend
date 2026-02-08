'use client'

import { EthnobotanyAppSidebar } from '@/app/components/ethnobotany/ethno-app-sidebar'
import EthnoBase from '@/app/components/ethnobotany/ethnoBase'
import { SidebarProvider } from '@/app/components/ui/sidebar'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}
const AdminAppLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex-1 flex min-h-screen">
          <EthnobotanyAppSidebar />
          <div className="flex-1 flex flex-col bg-card ">
            <EthnoBase>
              <main className="flex-1 h-full overflow-y-auto p-4 ">
                {children}
              </main>
            </EthnoBase>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default AdminAppLayout
