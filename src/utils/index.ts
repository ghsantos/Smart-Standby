import gaussian from 'gaussian'

const dayName = [
  'domingo',
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sábado',
]

const monthName = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'Maio',
  'junho',
  'agosto',
  'outubro',
  'novembro',
  'dezembro',
]

const getDate = (date: Date) => {
  return `${dayName[date.getDay()]}, ${date.getDate()} de ${
    monthName[date.getMonth()]
  }`
}

function weightedRandom(mean: number, variance: number): number {
  var distribution = gaussian(mean, variance)
  // Take a random sample using inverse transform sampling method.
  return distribution.ppf(Math.random())
}

function generateRandomGraphData(length: number): GraphPoint[] {
  return Array<number>(length)
    .fill(0)
    .map((_, index) => ({
      date: new Date(
        new Date(2000, 0, 1).getTime() + 1000 * 60 * 60 * 24 * index,
      ),
      value: weightedRandom(10, Math.pow(index + 1, 2)),
    }))
}

function formatTime(progressSeconds: number): string {
  if (progressSeconds === undefined || progressSeconds < 0) {
    return '00:00'
  }

  const progressSecondsWithoutMilliseconds: number = Math.floor(progressSeconds)

  const hours: number = Math.floor(
    progressSecondsWithoutMilliseconds / (60 * 60),
  )
  const minutes: number =
    Math.floor(progressSecondsWithoutMilliseconds / 60) % 60

  const seconds: number = progressSecondsWithoutMilliseconds % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

function formatTimeToName(progressSeconds: number): string {
  if (progressSeconds === undefined || progressSeconds < 0) {
    return '0 minutos'
  }

  const progressSecondsWithoutMilliseconds: number = Math.floor(progressSeconds)

  const hours: number = Math.floor(
    progressSecondsWithoutMilliseconds / (60 * 60),
  )
  const minutes: number =
    Math.floor(progressSecondsWithoutMilliseconds / 60) % 60

  const seconds: number = progressSecondsWithoutMilliseconds % 60

  const hourName = hours > 1 ? 'horas' : 'hora'
  const minuteName = minutes > 1 ? 'minutos' : 'minuto'

  if (hours > 0 && minutes === 0) {
    return `${hours.toString()} ${hourName}`
  }

  if (hours > 0) {
    return `${hours.toString()} ${hourName} e ${minutes.toString()} ${minuteName}`
  }

  if (minutes > 0) {
    return `${minutes.toString()} ${minuteName}`
  }

  return `${seconds} segundos`
}

export { getDate, generateRandomGraphData, formatTime, formatTimeToName }
