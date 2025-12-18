/**
 *
 *
 * Total riddles
 * Approved vs pending riddles
 *
 * Riddles per language
 *
 * Riddles per category
 *
 * Average time to approval
 *
 * Most used tags
 *
 * New riddles this month
 *
 * Approval rate %
 */

'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  BookOpen,
  Globe,
  Leaf,
  Users,
  Loader2,
} from 'lucide-react';
import { RiddleMetricsService } from '@/app/utils/supabase/supabase';
import { RiddleMetrics } from '@/lib/types/folklore';




/* ---------- Small reusable metric card ---------- */

interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, subtitle, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
export default function RiddlesOverviewGridMetrics() {
  const [metrics, setMetrics] = useState<RiddleMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RiddleMetricsService.getOverviewMetrics()
      .then(setMetrics)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !metrics) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
      <MetricCard
        title="Total Riddles"
        value={metrics.totalRiddles}
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        subtitle={`${metrics.newThisMonth} added this month`}
      />

      <MetricCard
        title="Approved"
        value={metrics.approvedRiddles}
        icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
        subtitle={`${metrics.pendingRiddles} pending`}
      />

      <MetricCard
        title="Languages"
        value={metrics.languagesCount}
        icon={<Globe className="h-4 w-4 text-muted-foreground" />}
        subtitle="Active languages"
      />

      <MetricCard
        title="Needs Review"
        value={metrics.pendingRiddles}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        subtitle={`${metrics.rejectedRiddles} rejected`}
      />
    </div>
  );
}
