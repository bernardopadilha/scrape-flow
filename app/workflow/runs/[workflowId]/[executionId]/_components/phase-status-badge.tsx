import { ExecutionPhaseStatus } from '@/types/workflow'
import {
  CheckCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  Loader2Icon,
} from 'lucide-react'

export default function PhaseStatusBadge({
  status,
}: {
  status: ExecutionPhaseStatus
}) {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashedIcon className="size-5 stroke-muted-foreground" />
    case ExecutionPhaseStatus.RUNNING:
      return <Loader2Icon className="size-5 animate-spin stroke-yellow-500" />
    case ExecutionPhaseStatus.FAILED:
      return <CircleXIcon className="size-5  stroke-destructive" />
    case ExecutionPhaseStatus.COMPLETED:
      return <CheckCheckIcon className="size-5  stroke-green-500 " />
    default:
      return <div className="rounded-full">{status}</div>
  }
}
