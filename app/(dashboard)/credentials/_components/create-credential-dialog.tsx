'use client'

import { useCallback, useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Plus, ShieldEllipsisIcon } from 'lucide-react'
import CustomDialogHeader from '@/components/custom-dialog-header'
import { useForm } from 'react-hook-form'
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
import { toast } from 'sonner'
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from '@/schema/credential'
import { CreateCredential } from '@/actions/credentials/create-credential'

function CreateCredentialDialog({ triggerText }: { triggerText?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<createCredentialSchemaType>({
    resolver: zodResolver(createCredentialSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCredential,
    onSuccess: () => {
      toast.success('Credential created!', { id: 'create-credential' })
      form.reset()
      setIsOpen(false)
    },
    onError: () => {
      toast.error('Failed to create credential!', { id: 'create-credential' })
    },
  })

  const onSubmit = useCallback(
    (values: createCredentialSchemaType) => {
      toast.loading('Criando credencial...', { id: 'create-credential' })
      mutate(values)
    },
    [mutate],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="size-5" />
          {triggerText ?? 'Create'}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={ShieldEllipsisIcon}
          title="Criar credencial"
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
                      Nome
                      <p className="text-xs text-primary">(Obrigatório)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Insira um valor unico e descritivo para esta credencial
                      <br />
                      Esse nome será usado para identificar a credencial
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Valor
                      <p className="text-xs text-primary">(Obrigatório)</p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Insira o valor associado com está credencial <br />
                      Este valor será criptografado e armazenado com seg urança
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

export default CreateCredentialDialog
