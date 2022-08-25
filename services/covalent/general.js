import axios from 'axios';
import supportedDEXesCovalent from '../../public/supportedDEXesCovalent.json';

export async function getPancakeswapPoolsByAddress(address) {

    const url = `https://api.covalenthq.com/v1/56/networks/pancakeswap_v2/tokens/${address}/?quote-currency=USD&format=JSON&key=${API_KEY}`;
    console.log(url)
    return axios.get(url)
        .then(response => {
            return response.data.data.items;
        })
        .catch(error => {
            console.log(error);
            return -1;
        });
}

export async function getDEXChartData(chain_id, dexname) {

    const url = `https://api.covalenthq.com/v1/${chain_id}/xy=k/${dexname}/ecosystem/?quote-currency=USD&format=JSON&&key=${API_KEY}`;
    return axios.get(url)
        .then(response => {
            return response.data.data.items[0];
        })
        .catch(error => {
            console.log(error);
            return -1;
        });
}

export async function getAllSupportedDEXes() {

    const url = `https://api.covalenthq.com/v1/xy=k/supported_dexes/?quote-currency=USD&format=JSON&key=${API_KEY}`;
    return axios.get(url)
        .then(response => {
            return response.data.data.items;
        })
        .catch(error => {
            console.log(error);
            return -1;
        });
}

export async function getAllDexCharts(supportedDEXEs) {

    var DEXEsChartsData = new Array();

    if (supportedDEXEs == -1 || supportedDEXEs == undefined || supportedDEXEs.length < 1) return;

    for (let index = 0; index < supportedDEXEs.length; index++) {
        var DEXData = await getDEXChartData(supportedDEXEs[index].chain_id, supportedDEXEs[index].dex_name);
        if (DEXData != -1 && DEXData.volume_chart_30d.length > 0 && DEXData) {
            var volume30dCounter = 0;
            for (let index2 = 0; index2 < DEXData.volume_chart_30d.length; index2++) {
                volume30dCounter += DEXData.volume_chart_30d[index2].volume_quote;
            }
            DEXData.my_total_volume_30d = volume30dCounter;
            DEXData.chain_name = supportedDEXesCovalent.find(dex => dex.chain_id == DEXData.chain_id).chain_name;
            DEXEsChartsData.push(DEXData);
        }
    }
    DEXEsChartsData.sort(function (a, b) { return b.my_total_volume_30d - a.my_total_volume_30d });
    console.log(DEXEsChartsData)
    return DEXEsChartsData;

}

export async function getTokenHolders(chain_id, address) {
    const url = `https://api.covalenthq.com/v1/${chain_id}/tokens/${address}/token_holders/?quote-currency=USD&format=JSON&page-size=20&key=${API_KEY}`;
    console.log(url);
    return axios.get(url)
        .then(response => {
            return response.data.data.items;
        })
        .catch(error => {
            console.log(error);
            return -1;
        });

}

export async function getTokenPools(chain_id, address) {

    const dexName = getCovalentDEXName(chain_id);
    if (dexName == null) return -1;

    var tokenPools = new Array();

    for (let index = 0; index < dexName.length; index++) {
        const url = `https://api.covalenthq.com/v1/${chain_id}/xy=k/${dexName[index]}/tokens/address/${address}/?quote-currency=USD&format=JSON&key=${API_KEY}`;
        await axios.get(url)
            .then(response => {
                if (response.data.data.items.length > 0) {
                    for (let index = 0; index < response.data.data.items.length; index++) {
                        tokenPools.push(response.data.data.items[index]);
                    }
                }
            })
            .catch(error => {
                console.log(error);
                // return -1;
            });

    }
    return tokenPools;
}

function getCovalentDEXName(chain_id) {

    var DEXesNames = new Array();

    Object.keys(supportedDEXesCovalent).map(key => {
        if (supportedDEXesCovalent[key].chain_id == chain_id) DEXesNames.push(supportedDEXesCovalent[key].dex_name);
    })

    return DEXesNames;
}


export async function getTokenTransfers(chain_id, address) {

    const url = `https://api.covalenthq.com/v1/${chain_id}/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&&key=${API_KEY}`;
    console.log(url);
    return axios.get(url)
        .then(response => {
            return response.data.data.items;
        })
        .catch(error => {
            console.log(error);
            return -1;
        });

}