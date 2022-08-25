import axios from "axios";
import supportedDEXesCovalent from '../../../../../../../public/supportedDEXesCovalent.json'

export default async function handler(req, res) {

    const { chain_id, address } = req.query;

    var DEXesNames = new Array();

    Object.keys(supportedDEXesCovalent).map(key => {
        if (supportedDEXesCovalent[key].chain_id == chain_id) DEXesNames.push(supportedDEXesCovalent[key].dex_name);
    })

    if (DEXesNames.length == 0) res.status(404).send();

    var tokenPools = new Array();

    for (let index = 0; index < DEXesNames.length; index++) {
        const url = `https://api.covalenthq.com/v1/${chain_id}/xy=k/${DEXesNames[index]}/tokens/address/${address}/?quote-currency=USD&format=JSON&key=${process.env.COVALENT_KEY}`;
        await axios.get(url)
            .then(response => {
                if (response.data.data.items.length > 0) {
                    for (let index = 0; index < response.data.data.items.length; index++) {
                        tokenPools.push(response.data.data.items[index]);
                    }
                }
            })
            .catch(error => {
                // console.log(error);
                // return -1;
            });
    }

    res.status(200).send(tokenPools);

}
