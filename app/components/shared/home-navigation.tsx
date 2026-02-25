'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import { navigation } from '@/lib/navigation'

import React from 'react'


export default function HomeNavigation() {
  const pathname = usePathname()
  return (
    <nav className="border-b text-black sticky z-20 top-0 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              {/* TODO: logo */}
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map(item => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center gap-2 border-b-2 px-1 pt-1 text-sm font-medium text-black',
                      pathname === item.href
                        ? 'border-primary text-foreground'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4 text-black" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
{/*
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </div> */}
        </div>
      </div>
    </nav>
  )
}
