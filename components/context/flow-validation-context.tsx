import { AppNodeMissingInputs } from '@/types/app-node'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

type FlowValidationContextType = {
  invalidInputs: AppNodeMissingInputs[]
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>
  clearErrors: () => void
}

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null)

export function FlowValidationContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>([])

  function clearErrors() {
    setInvalidInputs([])
  }

  return (
    <FlowValidationContext.Provider
      value={{
        invalidInputs,
        setInvalidInputs,
        clearErrors,
      }}
    >
      {children}
    </FlowValidationContext.Provider>
  )
}
