import axios from "axios";

export default async function handler(req, res) {

    const { network, address } = req.query;
    const url = `https://api.coingecko.com/api/v3/coins/${network}/contract/${address}/market_chart/?vs_currency=usd&days=91`;
    try {
        const result = await axios.get(url, { headers: { 'Content-Type': 'application/json' } });
        var prices = new Array()
        var volumes = new Array()
        var sizeArray = result.data.prices.length >= 30 ? 30 : result.data.prices.length;
        for (let index = (result.data.prices.length - sizeArray); index < result.data.prices.length; index++) {
            prices.push(result.data.prices[index][1])
            volumes.push(result.data.total_volumes[index][1])
        }
        res.status(200).json({ prices, volumes })
    } catch (err) {
        console.log(err)
        if (err.response && err.response.status) {
            res.status(err.response.status).send({ error: err.response.data.error })
        } else {
            res.status(500).send()
        }

    }
}
