import { TaskParam, TaskParamType } from '@/types/task'
import StringParam from './param/string-param'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/app-node'
import { useCallback } from 'react'
import BrowserInstanceParam from './param/browser-instance-param'
import SelectParam from './param/select-param'
import CredentialsParam from './param/credentials-param'

export function NodeParamField({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam
  nodeId: string
  disabled: boolean
}) {
  const { updateNodeData, getNode } = useReactFlow()
  const node = getNode(nodeId) as AppNode
  const value = node?.data.inputs?.[param.name]
  console.log('@value', value)

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      })
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs],
  )

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      )
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={''}
          updateNodeParamValue={updateNodeParamValue}
        />
      )
    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      )
    case TaskParamType.CREDENTIAL:
      return (
        <CredentialsParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      )
    default:
      return (
        <div className="w-full">
          <p className="text-muted-foreground text-xs"> Not implemented</p>
        </div>
      )
  }
}
