/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionEnvironment } from '@/types/executor'
import { DeliverViaWebhookTask } from '../task/deliver-via-webhook'

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>,
): Promise<boolean> {
  try {
    const targetURL = environment.getInput('Target URL')
    if (!targetURL) {
      environment.log.error('input->targetURL not defined')
    }

    const body = environment.getInput('Body')
    if (!body) {
      environment.log.error('input->body not defined')
    }

    const response = await fetch(targetURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const statusCode = response.status
    if (statusCode !== 200) {
      environment.log.error(`statuscode: ${statusCode}`)
      return false
    }

    const responseBody = await response.json()
    environment.log.info(JSON.stringify(responseBody, null, 4))
    return true
  } catch (error: any) {
    environment.log.error(error.message)
    return false
  }
}
