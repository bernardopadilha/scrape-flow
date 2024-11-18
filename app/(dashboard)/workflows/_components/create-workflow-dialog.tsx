'use client'

import { useCallback, useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Layers2Icon, Loader2Icon, Plus } from 'lucide-react'
import CustomDialogHeader from '@/components/custom-dialog-header'
import { useForm } from 'react-hook-form'
import { createWorkflowSchema, createWorkflowType } from '@/schema/workflow'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '@/actions/workflows/create-workflow'
import { toast } from 'sonner'

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<createWorkflowType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success('Workflow criado com sucesso!', { id: 'create-workflow' })
    },
    onError: () => {
      toast.error('Falha ao criar o workflow!', { id: 'create-workflow' })
    },
  })

  const onSubmit = useCallback(
    (values: createWorkflowType) => {
      toast.loading('Criando workflow...', { id: 'create-workflow' })
      mutate(values)
    },
    [mutate],
  )

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        form.reset()
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="size-5" />
          {triggerText ?? 'Criar workflow'}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Crie um workflow"
          subTitle="Comece a constuir seu workflow"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(Obrigatório)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Escolha um nome descritivo e único
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Descrição
                      <p className="text-xs text-muted-foreground">
                        (Opcional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Forneça uma breve descrição do que seu fluxo de trabalho
                      faz. Isso é opcional, mas pode ajudar você a lembrar o
                      propósito do workflow&apos;s
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="flex items-center gap-1 w-full"
                type="submit"
                disabled={isPending}
              >
                {!isPending && (
                  <>
                    <Plus className="size-4" /> Criar
                  </>
                )}
                {isPending && <Loader2Icon className="size-4 animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog
