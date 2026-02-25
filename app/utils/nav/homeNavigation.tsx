'use client'

import { Button } from '@/app/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-use'

export default function HomeNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    // { href: '/analytics', label: 'Analytics'},
    // { href: '/dashboard', label: 'Dashboard' },
    // { href: '/games', label: 'Games' },
    { href: '/contribute', label: 'Contribute' },
    { href: '/publications', label: 'Publications' },
    { href: '/botanical', label: 'Botanical-Explorer' },
    { href: '/learn', label: 'LanguageLearn' },
    { href: '/nlp', label: 'NLP' },
    // { href: '/admin/patents', label: 'Patents' },
  ]
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // close the mobile menu
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'py-3 bg-white/80 dark:bg-background/80 backdrop-blur-lg shadow-sm'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-primary transition-opacity duration-200 hover:opacity-80"
        >
          kitso<span className="text-foreground">Hub</span>
        </Link>
        {/* desktop nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                location.href === link.href
                  ? 'text-primary-foreground bg-primary'
                  : 'text-foreground/80 hover:text-foreground hover:bg-blue-100/10 dark:hover:bg-blue-950/10'
              )}
            >
              {link.label}
            </Link>
          ))}
          {/* <Button variant="outline" size="icon" className="ml-2">
                        <Search className="h-4 w-4" />
                    </Button> */}
          {/* <Button asChild className="ml-4">
                        <Link href="/sign-in">SignIn</Link>
                    </Button> */}
        </nav>
        {/* mobile menu button */}

        <div className="flex items-center md:hidden">
          {/* add other buttons eg search */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* mobile nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-4 space-y-1 bg-background/95 backdrop-blur-lg border-b">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-3 rounded-md text-base font-medium transition-colors',
                  location.pathname === link.href
                    ? 'text-primary-foreground bg-primary'
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-4">
              <Link href="/sign-in">SingIn</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
