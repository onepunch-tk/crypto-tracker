const BASE_URL = "https://api.coinpaprika.com/v1";
const COIN_URL = `${BASE_URL}/coins`;
const PRICE_URL = `${BASE_URL}/tickers`;
const CHART_URL = "https://ohlcv-api.nomadcoders.workers.dev"

export const fetchCoins = async () => {
    const response = await (await fetch(COIN_URL)).json();
    return response.slice(0,100);
}

export const fetchCoinDetail = async (coinId:string) => await (await fetch(`${COIN_URL}/${coinId}`)).json();

export const fetchPrice = async (coinId:string) => await (await fetch(`${PRICE_URL}/${coinId}`)).json();

export const fetchChart = async (coinId:string) => await (await fetch(`${CHART_URL}?coinId=${coinId}`)).json();