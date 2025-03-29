/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskType } from '@/types/task'
import { WorkflowTask } from '@/types/workflow'
import { ExecutionEnvironment } from '@/types/executor'
import { FillInputExecutor } from './fill-input-executor'
import { PageToHtmlExecutor } from './page-to-html-executor'
import { ClickElementExecutor } from './click-element-executor'
import { LaunchBrowserExecutor } from './launch-browser-executor'
import { WaitForElementExecutor } from './wait-for-element-executor'
import { DeliverViaWebhookExecutor } from './deliver-via-webhook-executor'
import { ExtractTextFromElementExecutor } from './extract-text-from-element-executor'
import { ExtractDataWithAiExecutor } from './extract-data-with-ai-executor'
import { ReadPropertyFromJsonExecutor } from './read-property-from-json-executor'

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>,
) => Promise<boolean>

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>
}

export const ExecutorRegistry: RegistryType = {
  FILL_INPUT: FillInputExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiExecutor,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
}
