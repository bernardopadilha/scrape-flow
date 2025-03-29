import { GetCredentialsForUser } from '@/actions/credentials/get-credentials-for-user'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LockKeyholeIcon, ShieldIcon, ShieldOffIcon } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateCredentialDialog from './_components/create-credential-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import DeleteCredentialDialog from './_components/delete-credential-dialog'

export default function CredentialsPage() {
  return (
    <div className="flex flex-1 flex-col w-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Credenciais</h1>
          <p className="text-muted-foreground">Configure suas credenciais</p>
        </div>

        <CreateCredentialDialog />
      </div>

      <div className="h-full py-6 space-y-8">
        <Alert>
          <ShieldIcon className="size-4 stroke-primary" />
          <AlertTitle className="text-primary">Criptografia</AlertTitle>
          <AlertDescription>
            Todas as informações criptografadas com segurança, garantindo que
            seus dados permaneçam seguros
          </AlertDescription>
        </Alert>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <UserCredentials />
        </Suspense>
      </div>
    </div>
  )
}

async function UserCredentials() {
  const credentials = await GetCredentialsForUser()

  if (!credentials) {
    return <div>Algo deu errado</div>
  }

  if (credentials.length === 0) {
    return (
      <Card className="w-full p-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="rounded-full bg-accent size-20 flex items-center justify-center">
            <ShieldOffIcon className="stroke-primary size-10" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">Nenhuma credencial criada ainda</p>
            <p className="text-sm text-muted-foreground">
              Clique no botão abaixo para criar sua primeira credencial
            </p>
          </div>

          <CreateCredentialDialog triggerText="Cria sua primeira credencial" />
        </div>
      </Card>
    )
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {credentials.map((credential) => {
        const createdAt = formatDistanceToNow(credential.createdAt, {
          addSuffix: true,
          locale: ptBR,
        })

        return (
          <Card key={credential.id} className="w-full p-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="rounded-full bg-primary/10 size-8 flex items-center justify-center">
                <LockKeyholeIcon className="size-[18px] stroke-primary" />
              </div>
              <div>
                <p className="font-bold">{credential.name}</p>
                <p className="text-xs text-muted-foreground">{createdAt}</p>
              </div>
            </div>

            <DeleteCredentialDialog name={credential.name} />
          </Card>
        )
      })}
    </div>
  )
}
