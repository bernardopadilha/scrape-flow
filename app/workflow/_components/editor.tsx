'use client'

import { Workflow } from '@prisma/client'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './flow-editor'
import Topbar from './topbar/topbar'
import TaskMenu from './task-menu'

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Topbar
          workflowId={workflow.id}
          title="Workflow editor"
          subtitle={workflow.name}
        />
        <section className="flex h-full overflow-auto">
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}

export default Editor
