'use client'

import { LucideIcon } from 'lucide-react'
import { DialogHeader, DialogTitle } from './ui/dialog'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'

interface CustomDialogHeaderProps {
  title?: string
  subTitle?: string
  icon?: LucideIcon

  iconClassName?: string
  titleClassName?: string
  subTitleClassName?: string
}

function CustomDialogHeader({
  icon,
  title,
  subTitle,
  iconClassName,
  titleClassName,
  subTitleClassName,
}: CustomDialogHeaderProps) {
  const Icon = icon

  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && (
            <Icon size={30} className={(cn('stroke-primary'), iconClassName)} />
          )}
          {title && (
            <p className={cn('text-xl text-primary', titleClassName)}>
              {title}
            </p>
          )}
          {subTitle && (
            <p
              className={cn('text-sm text-muted-foreground', subTitleClassName)}
            >
              {subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  )
}

export default CustomDialogHeader
