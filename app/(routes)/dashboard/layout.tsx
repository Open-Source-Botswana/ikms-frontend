'use client'

import Sidebar from '@/app/utils/nav/sidebar1'
import Topbar from '@/app/utils/nav/topbar'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
}
const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Topbar */}
        <Topbar
          username="Testuser"
          accountHostname="localhost"
          toggleSidebar={toggleSidebar}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 ">{children}</main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} IKMS Botswana | Version 1.0.0
        </footer>
      </div>
    </div>
  )
}

export default AppLayout
