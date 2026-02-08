'use client'

import { ReactNode } from 'react'
// { useUser } from "@clerk/nextjs";

interface EthnoBaseProps {
  children: ReactNode
  allowedRoles?: string[]
}

export default function EthnoBase({
  children,
  allowedRoles,
}: EthnoBaseProps) {
  //const { user } = useUser();

  return (
    <div className="flex-1 flex-col space-y-4 p-4 pt-6 md:p-8">{children}</div>
  )
}
