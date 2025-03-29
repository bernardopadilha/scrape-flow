import { useContext } from 'react'
import { FlowValidationContext } from '../context/flow-validation-context'

export default function UseFlowValidation() {
  const context = useContext(FlowValidationContext)
  if (!context) {
    throw new Error(
      'useFlowValidation must used within a FlowValidationContext',
    )
  }

  return context
}
