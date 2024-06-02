// https://console.hgbrasil.com/documentation/weather
// https://api.hgbrasil.com/weather?woeid=456526
// http://erikflowers.github.io/weather-icons/

const weatherConditions = {
  '0': {
    name: 'Tempestade forte',
    icon: 'wi-storm-showers',
  },
  '1': {
    name: 'Tempestade tropical',
    icon: 'wi-thunderstorm',
  },
  '2': {
    name: 'Furacão',
    icon: 'wi-hurricane',
  },
  '3': {
    name: 'Tempestades severas',
    icon: 'wi-lightning',
  },
  '4': {
    name: 'Tempestades',
    icon: 'wi-day-rain-mix',
  },
  '5': {
    name: 'Misto de neve e chuva',
    icon: 'wi-sleet',
  },
  '6': {
    name: 'Misto chuva e gelo',
    icon: 'wi-day-sleet-storm',
  },
  '7': {
    name: 'Misto neve e gelo',
    icon: 'wi-day-snow-thunderstorm',
  },
  '8': {
    name: 'Geada fina',
    icon: 'wi-thermometer-exterior',
  },
  '9': {
    name: 'Chuviscos',
    icon: 'wi-day-showers',
  },
  '10': {
    name: 'Congelamento chuva',
    icon: 'wi-day-rain-mix',
  },
  '11': {
    name: 'Alguns chuviscos',
    icon: 'wi-day-showers',
  },
  '12': {
    name: 'Alguns chuviscos',
    icon: 'wi-day-showers',
  },
  '13': {
    name: 'Neve baixa',
    icon: 'wi-day-snow',
  },
  '14': {
    name: 'Tempestade com neve',
    icon: 'wi-day-snow-thunderstorm',
  },
  '15': {
    name: 'Ventania com neve',
    icon: 'wi-day-snow-wind',
  },
  '16': {
    name: 'Neve',
    icon: 'wi-day-snow',
  },
  '17': {
    name: 'Granizo',
    icon: 'wi-day-hail',
  },
  '18': {
    name: 'Gelo',
    icon: 'wi-snowflake-cold',
  },
  '19': {
    name: 'Poeira',
    icon: 'wi-dust',
  },
  '20': {
    name: 'Neblina',
    icon: 'wi-fog',
  },
  '21': {
    name: 'Tempestade de areia',
    icon: 'wi-sandstorm',
  },
  '22': {
    name: 'Fumacento',
    icon: 'wi-smoke',
  },
  '23': {
    name: 'Vento acentuado',
    icon: 'wi-strong-wind',
  },
  '24': {
    name: 'Ventania',
    icon: 'wi-cloudy-gusts',
  },
  '25': {
    name: 'Tempo frio',
    icon: 'wi-snowflake-cold',
  },
  '26': {
    name: 'Tempo nublado',
    icon: 'wi-cloudy',
  },
  '27': {
    name: 'Tempo limpo',
    icon: 'wi-day-sunny',
  },
  '28': {
    name: 'Tempo nublado',
    icon: 'wi-cloudy',
  },
  '29': {
    name: 'Parcialmente nublado',
    icon: 'wi-day-cloudy',
  },
  '30': {
    name: 'Parcialmente nublado',
    icon: 'wi-day-cloudy',
  },
  '31': {
    name: 'Tempo limpo',
    icon: 'wi-night-clear',
  },
  '32': {
    name: 'Ensolarado',
    icon: 'wi-day-sunny',
  },
  '33': {
    name: 'Estrelado',
    icon: 'wi-stars',
  },
  '34': {
    name: 'Ensolarado com muitas nuvens',
    icon: 'wi-day-cloudy',
  },
  '35': {
    name: 'Misto chuva e granizo',
    icon: 'wi-day-rain-mix',
  },
  '36': {
    name: 'Ar quente',
    icon: 'wi-hot',
  },
  '37': {
    name: 'Tempestades isoladas',
    icon: 'wi-day-storm-showers',
  },
  '38': {
    name: 'Trovoadas dispersas',
    icon: 'wi-day-thunderstorm',
  },
  '39': {
    name: 'Trovoadas dispersas',
    icon: 'wi-day-thunderstorm',
  },
  '40': {
    name: 'Chuvas esparsas',
    icon: 'wi-day-showers',
  },
  '41': {
    name: 'Pesados neve',
    icon: 'wi-day-snow',
  },
  '42': {
    name: 'Chuviscos com neve',
    icon: 'wi-day-snow',
  },
  '43': {
    name: 'Neve pesada',
    icon: 'wi-day-snow',
  },
  '44': {
    name: 'Sol com poucas nuvens',
    icon: 'wi-day-sunny-overcast',
  },
  '45': {
    name: 'Chuva',
    icon: 'wi-day-rain',
  },
  '46': {
    name: 'Queda de neve',
    icon: 'wi-day-snow',
  },
  '47': {
    name: 'Tempestades isoladas',
    icon: 'wi-day-storm-showers',
  },
  '48': {
    name: 'Serviço não disponível',
    icon: 'wi-na',
  },
}

const forecastCondition = {
  storm: 'wi-thunderstorm', // tempestade
  snow: 'wi-snow', // neve
  hail: 'wi-sleet', // granizo
  rain: 'wi-rain', // chuva
  fog: 'wi-fog', // neblina
  clear_day: 'wi-day-sunny', // dia limpo
  clear_night: 'wi-night-clear', // noite limpa
  cloud: 'wi-cloudy', // nublado
  cloudly_day: 'wi-day-cloudy', // nublado de dia
  cloudly_night: 'wi-night-alt-cloudy', // nublado de noite
  none_day: 'wi-na', // erro ao obter mas está de dia
  none_night: 'wi-na', // erro ao obter mas está de noite
}

async function fetchWeather() {
  try {
    const response = await fetch(
      'https://api.hgbrasil.com/weather?woeid=456526',
    )
    const json = await response.json()
    // console.log('json', json) // json {"error": true, "message": "IP bloqueado: Limite diario sem chave excedido, acesse console.hgbrasil.com para criar uma chave de API.", "results": {}}

    return json.results
  } catch (error) {
    console.error(error)
  }
}

export { fetchWeather, weatherConditions, forecastCondition }
