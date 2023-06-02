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

export { getDate, generateRandomGraphData }
