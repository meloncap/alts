import axios from 'axios';

export async function getContractABI(address) {

    const url = `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${process.env.BSCSCAN_KEY}`;

    return axios.get(url)
        .then(response => {
            return response.data.result;
        })
        .catch(error => {
            return error;
        });

}

export async function getContractCode(address) {

    const url = `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=${BSCSCAN_KEY}`;

    return axios.get(url)
        .then(response => {
            return response.data.result[0].SourceCode;
        })
        .catch(error => {
            return error;
        });

}