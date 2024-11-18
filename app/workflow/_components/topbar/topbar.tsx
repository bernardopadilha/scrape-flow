'use client'

import TooltipWrapper from '@/components/tooltip-wrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import SaveBtn from './save-btn'

interface Props {
  title: string
  subtitle?: string
  workflowId: string
}

function Topbar({ title, subtitle, workflowId }: Props) {
  const router = useRouter()

  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full sticky top-0 bg-background z-10">
      <div className="flex flex-1 gap-1">
        <TooltipWrapper content="Back">
          <Button variant={'ghost'} size={'icon'} onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-1 flex-1 justify-end">
        <SaveBtn workflowId={workflowId} />
      </div>
    </header>
  )
}

export default Topbar
