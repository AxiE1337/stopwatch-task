import { reactive } from 'vue'
import { IStopwatch } from '../types'

export const stopwatchesState =
  (reactive([{ id: 12312, interval: 0, seconds: 0 }]) as IStopwatch[]) || []
