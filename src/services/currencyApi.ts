async function fetchCurrencyPrice(from: string, to: string) {
  try {
    const response = await fetch(
      `https://economia.awesomeapi.com.br/last/${from}-${to}`,
    )
    const json = await response.json()

    const result = {
      price: json[`${from}${to}`].bid,
      variation: json[`${from}${to}`].pctChange,
    }
    // console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}

export { fetchCurrencyPrice }
