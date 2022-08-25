import axios from "axios";

export default async function handler(req, res) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false`;
    try {
        const result = await axios.get(url, { headers: { 'Content-Type': 'application/json' } });
        res.status(200).json(result.data);
    } catch (err) {
        if (err.response && err.response.status) {
            res.status(err.response.status).send({ error: err.response.data.error })
        } else {
            res.status(500).send();
        }

    }
}
