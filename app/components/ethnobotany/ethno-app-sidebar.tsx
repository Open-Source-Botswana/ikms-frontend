'use client'

import { useState, useEffect } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarGroupLabel,
} from '@/app/components/ui/sidebar'

import {
  LayoutDashboard,
  Briefcase,
  ShieldBanIcon,
  Settings,
  HelpCircle,
  User,
  Database,
  FileArchive,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpenIcon,
  ChevronRightIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { ModeToggle } from '../ui/mode-toggle'

export function EthnobotanyAppSidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()
  const [mounted, setMounted] = useState(false)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Sidebar collapsible="icon">
        <SidebarContent />
        <SidebarFooter />
      </Sidebar>
    )
  }

  const isCollapsed = state === 'collapsed'

  const toggleWorkspace = () => {
    setWorkspaceOpen(prev => !prev)
  }

  const isOpen = state === 'expanded' ? false : true

  const workSpaceActive =
    pathname.startsWith('/workspace') ||
    pathname.startsWith('/flora') ||
    pathname.startsWith('/applications')

  return (
    <Sidebar collapsible="icon">
      {/* Header with logo / title and collapse toggle */}
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold group-data-[collapsible=icon]:hidden">
            Ethnobotany
          </span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="group-data-[collapsible=icon]:hidden"
          onClick={toggleSidebar}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        {isOpen && (
          <Button
            size="icon"
            variant="ghost"
            className="group-data-[collapsible=icon]:visible "
            onClick={toggleSidebar}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        )}
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>{/* (Optional) admin-only items */}</SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/community'}
                  tooltip="Dashboard"
                >
                  <Link href="/community">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* AdminOverview */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/community/admin'}
                  tooltip="AdminOverview"
                >
                  <Link href="/community/admin">
                    <ShieldBanIcon />
                    <span>AdminOverview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* WorkSpace parent with toggler */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={toggleWorkspace}
                  tooltip="WorkSpace"
                  isActive={workspaceOpen || workSpaceActive}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center space-x-2">
                    <Briefcase />
                    <span>WorkSpace</span>
                  </div>
                  {workspaceOpen ? (
                    <ChevronUp className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>

                {workspaceOpen && (
                <>
                  <SidebarMenuItem className="pl-6">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/patents/applications'}
                      tooltip="Aapplications"
                    >
                      <Link href="/patents/applications">
                        <span>Applications</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="pl-6">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === '/ethnobotany/flora'}
                      tooltip="flora"
                    >
                      <Link href="/ethnobotany/flora">
                        <span>flora</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools & Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Enquiries">
                  <Link href="/dashboard/enquery">
                    <HelpCircle />
                    <span>Enquiry</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Documents">
                  <Link href="/dashboard/documents">
                    <FileArchive />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Analytics">
                  <Link href="/dashboard/analytics">
                    <Database />
                    <span>Regulatory Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="AI Assistant">
                  <Link href="/dashboard/assistant">
                    <Database />
                    <span>AI Assistant</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help & Docs">
              <Link href="/help">
                <HelpCircle />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link href="/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="p-4 flex justify-center">
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
