import axios from "axios";
import supportedDEXesCovalent from '../../../../../public/supportedDEXesCovalent.json';

export default async function handler(req, res) {

    var DEXEsChartsData = new Array();

    for (let index = 0; index < supportedDEXesCovalent.length; index++) {

        var DEXData = await axios.get(`https://api.covalenthq.com/v1/${supportedDEXesCovalent[index].chain_id}/xy=k/${supportedDEXesCovalent[index].dex_name}/ecosystem/?quote-currency=USD&format=JSON&&key=${process.env.COVALENT_KEY}`)
            .then(response => {
                return response.data.data.items[0];
            }).catch(error => {
                console.log(error);
            });

        if (DEXData != -1 && DEXData && DEXData.volume_chart_30d.length > 0 && DEXData) {
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

    res.status(200).json(DEXEsChartsData);

}
