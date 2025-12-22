"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FolkloreRiddlesService } from '../utils/supabase/supabase'

export default function UseDeleteRiddle() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const deleteRiddle = async (riddleId: string) =>{
        setIsLoading(true);
        await FolkloreRiddlesService.softDeleteItemById(riddleId)
        router.push('/language/languageitems/riddles')
        router.refresh();
    }
  return {deleteRiddle, isLoading}
}
