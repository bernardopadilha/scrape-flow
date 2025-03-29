import { TaskType } from '@/types/task'
import { FillInputTask } from './fill-input'
import { WorkflowTask } from '@/types/workflow'
import { PageToHtmlTask } from './page-to-html'
import { ClickElementTask } from './click-element'
import { LaunchBrowserTask } from './launch-browser'
import { WaitForElementTask } from './wait-for-element'
import { DeliverViaWebhookTask } from './deliver-via-webhook'
import { ExtractTextFromElementTask } from './extract-text-from-element'
import { ExtractDataWithAiTask } from './extract-data-with-ai'
import { ReadPropertyFromJsonTask } from './read-property-from-json'

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K }
}

export const TaskRegistry: Registry = {
  FILL_INPUT: FillInputTask,
  PAGE_TO_HTML: PageToHtmlTask,
  CLICK_ELEMENT: ClickElementTask,
  LAUNCH_BROWSER: LaunchBrowserTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiTask,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
}
