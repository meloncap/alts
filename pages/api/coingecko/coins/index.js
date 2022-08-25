import axios from "axios";

export default async function handler(req, res) {
    const url = `https://api.coingecko.com/api/v3/coins/list?include_platform=true`;
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
