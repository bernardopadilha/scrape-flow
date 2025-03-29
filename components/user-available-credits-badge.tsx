import { GetAvailableCredits } from '@/actions/billing/get-available-credits'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { CoinsIcon, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import ReactCountUpWrapper from './react-count-up-wrapper'
import { buttonVariants } from './ui/button'

export default function UserAvailableCreditsBadge() {
  const query = useQuery({
    queryKey: ['user-available-credits'],
    queryFn: () => GetAvailableCredits(),
    refetchInterval: 30 * 1000, // 30 seconds
  })

  return (
    <Link
      href={'/billing'}
      className={cn(
        'w-full space-x-2 items-center',
        buttonVariants({ variant: 'outline' }),
      )}
    >
      <CoinsIcon className="size-5 stroke-primary" />
      <span>
        {query.isLoading && (
          <Loader2Icon className="size-4 animate-spin stroke-primary" />
        )}
        {!query.isLoading && query.data && (
          <ReactCountUpWrapper value={query.data} />
        )}
        {!query.isLoading && query.data === undefined && '-'}
      </span>
    </Link>
  )
}
