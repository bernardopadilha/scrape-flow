'use client'

import { DeleteCredential } from '@/actions/credentials/delete-credential'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { XIcon } from 'lucide-react'

import React, { useState } from 'react'
import { toast } from 'sonner'

interface DeleteCredentialDialogProps {
  name: string
}

function DeleteCredentialDialog({ name }: DeleteCredentialDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const deleteMutation = useMutation({
    mutationFn: DeleteCredential,
    onSuccess: () => {
      toast.success('Credencial deletada com sucesso!', {
        id: 'delete-credential',
      })
      setConfirmText('')
    },
    onError: () => {
      toast.error('Algo deu errado!', { id: 'delete-credential' })
    },
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'} size={'icon'}>
          <XIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>
            Você tem certeza que deseja excluir?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Se você deletar esta credencial, você não será capaz de recuperá-la
            <div className="flex flex-col py-4 gap-2">
              <p>
                Se você tem certeza, digite <b>{name}</b> para confirmar:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                onPaste={(e) => e.preventDefault()}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText('')}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={confirmText !== name || deleteMutation.isPending}
            onClick={() => {
              toast.loading('Deletando credencial...', {
                id: 'delete-credential',
              })
              deleteMutation.mutate(name)
            }}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCredentialDialog
