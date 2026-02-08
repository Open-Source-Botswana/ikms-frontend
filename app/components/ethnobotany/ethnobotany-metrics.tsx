"use client"
import { getSummaryData } from '@/app/utils/mock/patent-data'
import React from 'react'

import { ClipboardList, Clock, FileCheck, FileText } from 'lucide-react'
import PatentMetricCard from '../shared/patent/metric-card' //TODO: add this to shared

export default function EthnobotanyMetrics() {
  const summaryData = getSummaryData()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <PatentMetricCard
        title="Applications in Queue"
        value={summaryData.applicationsInQueue}
        icon={<ClipboardList className="h-5 w-5" />}
        trend={{ value: 12, positive: true }}
      />

      <PatentMetricCard
        title="Applications in My Workspace"
        value={summaryData.myWorkspace}
        icon={<FileText className="h-5 w-5" />}
        trend={{ value: 8, positive: true }}
      />
      <PatentMetricCard
        title="Average Processing Time"
        value={`${summaryData.averageProcessingTime} days`}
        icon={<Clock className="h-5 w-5" />}
        trend={{ value: 5, positive: false }}
      />
      <PatentMetricCard
        title="Office Actions This Month"
        value={summaryData.officeActionsThisMonth}
        icon={<FileCheck className="h-5 w-5" />}
        trend={{ value: 15, positive: true }}
      />
    </div>
  )
}
