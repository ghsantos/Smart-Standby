// https://api.coingecko.com/api/v3/coins/klever?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

let priceCached = {}

async function fetchCoinPrice(coin: string) {
  if (!!priceCached[coin] && priceCached[coin].expirationTime > Date.now()) {
    console.log('fetchCoinPrice cached', coin)
    return priceCached[coin].result
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
    )
    const json = await response.json()

    const result = {
      currentPrice: json.market_data.current_price,
      priceChange: {
        c1d: json.market_data.price_change_percentage_24h,
        c1s: json.market_data.price_change_percentage_7d,
        c1m: json.market_data.price_change_percentage_30d,
        c1y: json.market_data.price_change_percentage_1y,
      },
    }

    priceCached[coin] = {
      result,
      expirationTime: Date.now() + 1 * 60 * 1000,
    }

    // console.log(json.market_data ? json.market_data : json)

    return result
  } catch (error) {
    // console.error('fetchCoinPrice', error)
    return {
      error: true,
      currentPrice: {},
      priceChange: {
        c1d: 0,
        c1s: 0,
        c1m: 0,
        c1y: 0,
      },
    }
  }
}

let historyCached = {}

async function fetchCoinHistory(coin: string, currency: string, days: number) {
  const cacheId = `${coin}_${currency}_${days}`

  if (!!historyCached[cacheId] && historyCached[cacheId].expirationTime > Date.now()) {
    // console.log('cached', historyCached[cacheId].result)
    // console.log('fetchCoinHistory cached', cacheId)
    return historyCached[cacheId].result
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`,
    )
    const json = await response.json()
    // console.log('fetchCoinHistory __')

    if (json.status) {
      throw new Error(json.status.error_message)
    }

    const result = json.prices.map((item, index) => {
      return {
        date: new Date(
          new Date(item[0]).getTime() + 1000 * 60 * 60 * 24 * index,
        ),
        // date: new Date(item[0]),
        value: item[1],
      }
    })

    const minutesToExpire = days > 1 ? 10 : 2

    historyCached[cacheId] = {
      result,
      expirationTime: Date.now() + minutesToExpire * 60 * 1000,
    }

    return result
  } catch (error) {
    console.log(error)

    if (!!historyCached[cacheId]) {
      console.log('fetchCoinHistory error - cached', cacheId)
      return historyCached[cacheId].result
    }

    return []
  }
}

export { fetchCoinPrice, fetchCoinHistory }
