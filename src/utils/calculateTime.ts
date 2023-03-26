const calculateTime = (seconds: number): string => {
  let textSeconds: number | string = seconds % 60
  let textMinutes: number | string = Math.floor(seconds / 60) % 60
  let textHours: number | string = Math.floor(seconds / 3600)
  textSeconds = textSeconds < 10 ? '0' + textSeconds : textSeconds
  textMinutes = textMinutes < 10 ? '0' + textMinutes : textMinutes
  textHours = textHours < 10 ? '0' + textHours : textHours

  return `${textHours !== '00' ? textHours + ':' : ''}${
    textMinutes !== '00' ? textMinutes + ':' : ''
  }${textSeconds === '00' ? '0' : textSeconds}`
}

export default calculateTime
