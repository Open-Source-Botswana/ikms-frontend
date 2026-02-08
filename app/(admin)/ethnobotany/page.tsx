import React from 'react'
import StatusDistributionChart from '@/app/components/shared/patent/StatusDistributionChart'
import ProductivityTrendsChart from '@/app/components/shared/patent/ProductivityTrendsChart'
import EthnobotanyMetrics from '@/app/components/ethnobotany/ethnobotany-metrics'

export default function DashboardOverview() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <EthnobotanyMetrics />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatusDistributionChart />
          <ProductivityTrendsChart />
        </div>
      </main>
    </div>
  )
}
