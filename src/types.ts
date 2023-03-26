export interface IStopwatch {
  id: number
  interval: ReturnType<typeof setInterval>
  seconds: number
}
