import ReactCountUpWrapper from '@/components/react-count-up-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface Props {
  title: string
  value: number
  icon: LucideIcon
}

function StatsCard({ icon, title, value }: Props) {
  const Icon = icon

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon
          size={120}
          className="text-muted-foreground absolute -bottom-4 -right-8 stroke-primary/10"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          <ReactCountUpWrapper value={value} />
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard
