import { GetPeriods } from '@/actions/analytics/get-periods'
import React, { Suspense } from 'react'
import { PeriodSelector } from './_components/period-selector'
import { Period } from '@/types/analytics'
import { Skeleton } from '@/components/ui/skeleton'
import { GetStatsCardsValues } from '@/actions/analytics/get-stats-card-values'
import { CirclePlayIcon, CoinsIcon, WaypointsIcon } from 'lucide-react'
import StatsCard from './_components/stats-card'

export default async function HomePage({
  searchParams,
}: {
  searchParams: { month?: string; year?: string }
}) {
  const currentDate = new Date()
  const { month, year } = searchParams
  const period: Period = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Home</h2>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatsCardsSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  )
}

async function PeriodSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Period
}) {
  const periods = await GetPeriods()

  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
  const data = await GetStatsCardsValues(selectedPeriod)
  return (
    <div className="grid gap-3 lg:grid-cols-3 lg:gap-8 min-h-[120px]">
      <StatsCard
        title="Workflow executions"
        value={data.workflowExecution}
        icon={CirclePlayIcon}
      />
      <StatsCard
        title="Phase executions"
        value={data.phaseExecutions}
        icon={WaypointsIcon}
      />
      <StatsCard
        title="Credits consumed"
        value={data.creditsConsumed}
        icon={CoinsIcon}
      />
    </div>
  )
}

function StatsCardsSkeleton() {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-full min-h-[120px]" />
      ))}
    </div>
  )
}
