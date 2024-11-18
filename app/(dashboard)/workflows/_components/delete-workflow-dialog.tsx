'use client'

import { DeleteWorkflow } from '@/actions/workflows/delete-workflow'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'

import React, { useState } from 'react'
import { toast } from 'sonner'

interface DeleteWorkflowDialogProps {
  isOpen: boolean
  workflowId: string
  workflowName: string
  setIsOpen: (open: boolean) => void
}

function DeleteWorkflowDialog({
  isOpen,
  setIsOpen,
  workflowId,
  workflowName,
}: DeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState('')

  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success('Workflow deletado com sucesso!', { id: workflowId })
      setConfirmText('')
    },
    onError: () => {
      toast.error('Algo deu errado!', { id: workflowId })
    },
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>
            Você tem certeza que deseja excluir?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Se você deletar este workflow, você não será capaz de recuperá-lo
            <div className="flex flex-col py-4 gap-2">
              <p>
                Se você tem certeza enter <b>{workflowName}</b> para confirmar:
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
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            onClick={() => {
              toast.loading('Deletando workflow...', { id: workflowId })
              deleteMutation.mutate(workflowId)
            }}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog
