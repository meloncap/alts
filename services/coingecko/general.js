import axios from 'axios';

export async function getAllCoins() {
    const url = `https://api.coingecko.com/api/v3/coins/list?include_platform=true`;
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {            
            return response.data;
        })
        .catch(error => {
            return error;
        });
}

export async function getAllAssetPlatforms() {
    const url = `https://api.coingecko.com/api/v3/asset_platforms`;
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
}

export async function getImgAllCoins(allCoinsLength) {

    console.log("allCoinsLength: " + allCoinsLength / 250)

    var allCoinsNewArray = new Array();
    for (let index = 0; index < Math.ceil(allCoinsLength / 250); index++) {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=id_asc&per_page=250&page=${index}&sparkline=false`;

        allCoinsNewArray.push(await axios.get(url, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error;
            }));
    }

    // console.log("allCoinsNewArray")
    // console.log(allCoinsNewArray)
    return allCoinsNewArray;
}

export async function getTopByMarketCap(per_page) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=1&sparkline=false`;
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
}

export async function getTokenInfoByPlatformAndContract(platform, contract_address) {
    const url = `https://api.coingecko.com/api/v3/coins/${platform}/contract/${contract_address}`;
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
}

export async function getHistoricalTokenPriceByContract(platform, contract_address) {
    const url = `https://api.coingecko.com/api/v3/coins/${platform}/contract/${contract_address}/market_chart/?vs_currency=usd&days=91`;
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            var prices = new Array();
            var volumes = new Array();
            var sizeArray = response.data.prices.length >= 30 ? 30 : response.data.prices.length;
            for (let index = (response.data.prices.length - sizeArray); index < response.data.prices.length; index++) {
                prices.push(response.data.prices[index][1]);
                volumes.push(response.data.total_volumes[index][1]);
            }
            return { prices, volumes };
        })
        .catch(error => {
            return error;
        });
}

export async function getHistoricalTokenPriceRangeByContract(platform, contract_address, from, to) {
    const url = `https://api.coingecko.com/api/v3/coins/${platform}/contract/${contract_address}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`;
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
            return response.data.prices;
        })
        .catch(error => {
            return error;
        });
}