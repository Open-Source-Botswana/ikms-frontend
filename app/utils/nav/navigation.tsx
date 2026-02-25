'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/app/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { memo, useState } from 'react'
import Image from 'next/image'
import LogoImg from '@/assets/partnerLogos/WeThemba.jpeg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { Button } from '@/app/components/ui/button'
import {
  BookOpen,

  GraduationCap,
  Landmark,
  Library,
  Menu,
  PenTool,
  ScrollText,
  Settings,
  Shield,
  UploadCloud,
  Users
} from 'lucide-react'
import { useAdmin } from '@/app/hooks/use-admin'


const NavLink = memo(
  ({
    href,
    children,
    className = '',
  }: {
    href: string
    children: React.ReactNode
    className?: string
  }) => (
    <a href={href} className={`transition-colors duration-200 ${className}`}>
      {children}
    </a>
  )
)
NavLink.displayName = 'NavLink'

const MenuItemCard = memo(
  ({
    href,
    title,
    description,
    className = '',
  }: {
    href: string
    title: string
    description: string
    className?: string
  }) => (
    <NavigationMenuLink asChild>
      <NavLink
        href={href}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900',
          className
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-slate-600">
          {description}
        </p>
      </NavLink>
    </NavigationMenuLink>
  )
)

MenuItemCard.displayName = 'MenuItemCard'

const CulturalProtocol = {
  COMMUNITY_ONLY: 'community_only',
  ELDERS_APPROVAL: 'elders_approval',
  SEASONAL_RESTRICTIONS: 'seasonal_restrictions',
  GENDER_RESTRICTED: 'gender_restricted',
}

const TKLabel = {
  SECRET_SACRED: 'secret_sacred',
  CULTURAL_INFLUENCE: 'cultural_influence',
  FAMILY_SOCIETY: 'family_society',
  LOCALIZED_TO_PLACE: 'localized_to_place',
}

const ContentType = {
  AUDIO: 'audio',
  VIDEO: 'video',
  TEXT: 'text',
  IMAGE: 'image',
  DOCUMENT: 'document',
}

const Navigation = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isAdmin } = useAdmin();
  return (
    <>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ease-in-out p-6 bg-transparent">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/assets/communityvector.jpeg"
            alt="WeThemba Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
          />
          {/* <Image className="rounded-full aspect-square object-cover" src="assets/partnerLogos/WeThemba.jpeg" alt="logo" width={50} height={50} /> */}
          <span className="text-xl font-bold text-slate-900">IKMS</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-sky-100">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900">
                    Browse
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <NavLink
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-sky-500 to-sky-600 p-6 no-underline outline-none focus:shadow-md hover:from-sky-600 hover:to-sky-700 transition-all duration-300"
                            href="#featured"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Featured Events
                            </div>
                            <p className="text-sm leading-tight text-sky-50">
                              Discover special recommendations
                            </p>
                          </NavLink>
                        </NavigationMenuLink>
                      </div>
                      <MenuItemCard
                        href="#"
                        title="Indigenous Knowledge"
                        description="Preservation, documentation & promotion"
                      />
                      <MenuItemCard
                        href="/botanical"
                        title="Plants"
                        description="Medicinal plants, herbs & traditional remedies"
                      />
                      <MenuItemCard
                        href="/apia"
                        title="Patents"
                        description="Automated Patents Identification Authority "
                      />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Communities (with cultural structure) */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900">
                    Communities
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto">
                    <div className="grid gap-6 p-6 w-[650px] grid-cols-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="col-span-2 space-y-6">
                        {/* Community Structure */}
                        <div className="grid gap-4 grid-cols-3">
                          <NavigationMenuLink asChild>
                            <a
                              href="/communities"
                              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-sky-50 transition-colors group border border-gray-200 hover:border-sky-300"
                            >
                              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200">
                                <Users className="h-6 w-6 text-sky-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 mb-1">
                                  Communities
                                </div>
                                <p className="text-sm text-slate-600">
                                  Nation-level knowledge systems
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <a
                              href="/communities/map"
                              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-sky-50 transition-colors group border border-gray-200 hover:border-sky-300"
                            >
                              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200">
                                <Landmark className="h-6 w-6 text-sky-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 mb-1">
                                  Communities Map
                                </div>
                                <p className="text-sm text-slate-600">
                                  Cultural Migration Map
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <a
                              href="/collections"
                              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-sky-50 transition-colors group border border-gray-200 hover:border-sky-300"
                            >
                              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200">
                                <Library className="h-6 w-6 text-sky-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 mb-1">
                                  Collections
                                </div>
                                <p className="text-sm text-slate-600">
                                  Curated knowledge repositories
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </div>

                        {/* Cultural Protocols */}
                        <div>
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 mt-2">
                            CULTURAL PROTOCOLS
                          </h4>
                          <div className="space-y-2">
                            {Object.values(CulturalProtocol).map(protocol => (
                              <NavigationMenuLink key={protocol} asChild>
                                <a
                                  href={`/protocols?protocol=${protocol}`}
                                  className="flex items-center space-x-3 p-2.5 rounded-md hover:bg-sky-50 transition-colors group"
                                >
                                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-sky-200">
                                    <Shield className="h-4 w-4 text-sky-600" />
                                  </div>
                                  <span className="text-sm font-medium text-slate-800 capitalize">
                                    {protocol.replace(/_/g, ' ')}
                                  </span>
                                </a>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Knowledge Resources */}
                {/* <NavigationMenuItem>
                                <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900">
                                    Knowledge Resources
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out md:absolute md:w-auto">
                                    <div className="grid gap-6 p-6 w-[650px] grid-cols-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <div className="col-span-2 space-y-6">

                                            <div className="grid gap-4 grid-cols-3">
                                                {Object.values(ContentType).map((type) => (
                                                    <NavigationMenuLink key={type} asChild>
                                                        <a
                                                            href={`/resources?type=${type}`}
                                                            className="flex flex-col items-start space-y-3 p-4 rounded-lg hover:bg-sky-50 transition-colors group border border-gray-200 hover:border-sky-300"
                                                        >
                                                            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200">
                                                                {type === 'audio' && <Mic className="h-6 w-6 text-sky-600" />}
                                                                {type === 'video' && <Video className="h-6 w-6 text-sky-600" />}
                                                                {type === 'text' && <BookOpen className="h-6 w-6 text-sky-600" />}
                                                                {type === 'image' && <ImagesIcon className="h-6 w-6 text-sky-600" />}
                                                                {type === 'document' && <FileText className="h-6 w-6 text-sky-600" />}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-900 capitalize mb-1">
                                                                    {type} Resources
                                                                </div>
                                                                <p className="text-sm text-slate-600">
                                                                    {type === 'audio' && 'Oral histories and songs'}
                                                                    {type === 'video' && 'Ceremonial recordings'}
                                                                    {type === 'text' && 'Written knowledge'}
                                                                    {type === 'image' && 'Cultural documentation'}
                                                                    {type === 'document' && 'Academic materials'}
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </NavigationMenuLink>
                                                ))}
                                            </div>

                                            <div>
                                                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                                    TRADITIONAL KNOWLEDGE LABELS
                                                </h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {Object.values(TKLabel).map((label) => (
                                                        <NavigationMenuLink key={label} asChild>
                                                            <a
                                                                href={`/tk-labels?label=${label}`}
                                                                className="flex items-center space-x-2 p-2.5 rounded-md hover:bg-sky-50 transition-colors group"
                                                            >
                                                                <div className="w-2 h-2 rounded-full bg-sky-500" />
                                                                <span className="text-sm text-slate-700 capitalize">
                                                                    {label.replace(/_/g, ' ')}
                                                                </span>
                                                            </a>
                                                        </NavigationMenuLink>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem> */}

                {/* Publications */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-sky-50/50 data-[state=open]:bg-sky-50/50">
                    Publications
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto">
                    <div className="grid gap-6 p-6 w-[650px] grid-cols-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {/* Main Documentation Sections */}
                      <div className="col-span-2 space-y-6">
                        {/* Top Categories: Books, Articles, Journals */}
                        <div className="grid gap-4 grid-cols-3">
                          <NavigationMenuLink asChild>
                            <a
                              href="/publications"
                              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-sky-50 transition-colors group border border-gray-200 hover:border-sky-300"
                            >
                              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors flex-shrink-0">
                                <BookOpen className="h-6 w-6 text-sky-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 mb-1">
                                  Books
                                </div>
                                <p className="text-sm text-slate-600">
                                  Indigenous knowledge books, collections, and
                                  traditional wisdom.
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <a
                              href="/publications"
                              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-sky-50 transition-colors group border border-gray-200 hover:border-sky-300"
                            >
                              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors flex-shrink-0">
                                <GraduationCap className="h-6 w-6 text-sky-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 mb-1">
                                  Articles
                                </div>
                                <p className="text-sm text-slate-600">
                                  Research articles, case studies, and indigenous
                                  practices.
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>

                          <NavigationMenuLink asChild>
                            <a
                              href="/publications"
                              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-sky-50 transition-colors group border border-gray-200 hover:border-sky-300"
                            >
                              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors flex-shrink-0">
                                <ScrollText className="h-6 w-6 text-sky-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 mb-1">
                                  Journals
                                </div>
                                <p className="text-sm text-slate-600">
                                  Academic and peer-reviewed journals on
                                  indigenous knowledge.
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </div>

                        {/* Supporting Guides */}
                        <div>
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                            RESEARCH SUPPORT
                          </h4>
                          <div className="space-y-3">
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-sky-50 transition-colors group"
                              >
                                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors flex-shrink-0 mt-1">
                                  <PenTool className="h-5 w-5 text-sky-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900 mb-1">
                                    Citation Standards
                                  </div>
                                  <p className="text-sm text-slate-600">
                                    Guidelines on referencing indigenous sources
                                    and oral traditions.
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-sky-50 transition-colors group"
                              >
                                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors flex-shrink-0 mt-1">
                                  <Settings className="h-5 w-5 text-sky-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900 mb-1">
                                    Metadata Policies
                                  </div>
                                  <p className="text-sm text-slate-600">
                                    Standards for classifying documents by type,
                                    region, and source.
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>

                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-sky-50 transition-colors group"
                              >
                                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-200 transition-colors flex-shrink-0 mt-1">
                                  <UploadCloud className="h-5 w-5 text-sky-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900 mb-1">
                                    Submission Guidelines
                                  </div>
                                  <p className="text-sm text-slate-600">
                                    How to contribute books, articles, or journals
                                    to the IKMS.
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {/* Languages */}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900">
                    Languages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <NavLink
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-sky-500 to-sky-600 p-6 no-underline outline-none focus:shadow-md hover:from-sky-600 hover:to-sky-700 transition-all duration-300"
                            href="#featured"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Our Local Languages
                            </div>
                            <p className="text-sm leading-tight text-sky-50">
                              Discover our rooted dialects
                            </p>
                          </NavLink>
                        </NavigationMenuLink>
                      </div>
                      <MenuItemCard
                        href="/languages/khoekhoegowab"
                        title="Khoekhoegowab"
                        description="One of the indigenous languages of Southern Africa"
                      />
                      <MenuItemCard
                        href="/languages/ikalanga"
                        title="Ikalanga"
                        description="A Bantu language spoken in Botswana and Zimbabwe"
                      />

                      <MenuItemCard
                        href="/learn"
                        title="View More"
                        description="Explore all languages"
                      />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Games */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-sky-50/50 data-[state=open]:bg-sky-50/50">
                    Games
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto">
                    <div className="grid gap-3 p-6 w-[650px] grid-cols-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <MenuItemCard
                        href="/games/maele"
                        title="Idioms"
                        description="Idioms games"
                      />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-sky-50 hover:text-sky-900 focus:bg-sky-50 focus:text-sky-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    asChild
                  >
                    <NavLink href="/about">AboutUs </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" onClick={() => setIsModalOpen(true)}>
            Contact-US
          </Button>

          {/* {isAdmin && (<>
        <Button
          variant="ghost"
          className="text-slate-700 hover:text-sky-600 hover:bg-sky-50"
        >
          <Link href="/sign-in">Sign-In</Link>
        </Button>
        <Button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Link href="/sign-up">Register-Now</Link>
        </Button></>)} */}
        </div>

        {/* Mobile Menu Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-sky-50"
            >
              <Menu className="h-6 w-6 text-slate-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white/95 backdrop-blur-sm border-sky-200"
          >
            <DropdownMenuItem className="hover:bg-sky-50">
              <NavLink href="/" className="w-full text-slate-700">
                Home
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-sky-100" />
            <DropdownMenuItem className="hover:bg-sky-50">
              <NavLink
                href="/publications"
                className="w-full pl-4 text-slate-600"
              >
                Publications
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-sky-50">
              <NavLink href="/botanical" className="w-full pl-4 text-slate-600">
                Botanical
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-sky-50">
              <NavLink href="/learn" className="w-full pl-4 text-slate-600">
                LocalLanguages
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-sky-100" />
            <DropdownMenuItem className="hover:bg-sky-50">
              <NavLink href="/games" className="w-full text-slate-700">
                Games
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-sky-50">
              <NavLink href="#story" className="w-full pl-4 text-slate-600">
                Our Story
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-sky-50">
              <NavLink href="#team" className="w-full pl-4 text-slate-600">
                Meet the Team
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-sky-100" />
            <DropdownMenuItem className="hover:bg-sky-50">
              <NavLink href="#contact" className="w-full text-slate-700">
                Contact
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-sky-100" />
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

    </>
  )

})

Navigation.displayName = 'Navigation'
export default Navigation
