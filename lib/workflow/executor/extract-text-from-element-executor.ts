/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionEnvironment } from '@/types/executor'
import { ExtractTextFromElementTask } from '../task/extract-text-from-element'

import * as cheerio from 'cheerio'

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput('Selector')
    if (!selector) {
      environment.log.error('Selector is not defined')
      return false
    }
    const html = environment.getInput('Html')
    if (!html) {
      environment.log.error('Html is not defined')
      return false
    }
    const $ = cheerio.load(html)
    const element = $(selector)

    if (!element) {
      environment.log.error('Element not found')
      return false
    }

    const extractedText = $.text(element)
    if (!extractedText) {
      environment.log.error('Element has not text')
      return false
    }

    environment.setOutput('Extracted text', extractedText)

    return true
  } catch (error: any) {
    environment.log.error(error.message)
    return false
  }
}
