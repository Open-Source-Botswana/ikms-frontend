'use client'
import FairUsageModal from '@/app/components/ui/modals/fair-usage-modal'
import { useEffect, useState } from 'react'
import { serialize } from 'v8'

const FAIR_USAGE_KEY = 'fairUsage'
const FairUsageProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => {
    setShowModal(false)
    localStorage.setItem(FAIR_USAGE_KEY, 'true')
  }

  useEffect(() => {
    const hasAcknowledged = localStorage.getItem(FAIR_USAGE_KEY)
    if (!hasAcknowledged) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 2000)

      return () => {
        clearTimeout(timer)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [])
  return (
    <>
      {children}
      <FairUsageModal isOpen={showModal} onClose={handleCloseModal} />
    </>
  )
}

export default FairUsageProvider
