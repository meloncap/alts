import axios from "axios";

export default async function handler(req, res) {

    const { chain_id, address } = req.query;
    const url = `https://api.covalenthq.com/v1/${chain_id}/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&&key=${process.env.COVALENT_KEY}`;
    try {
        const result = await axios.get(url, { headers: { 'Content-Type': 'application/json' } });
        res.status(200).json(result.data.data.items);
    } catch (err) {
        console.log(err)
        if (err.response && err.response.status) {
            res.status(err.response.status).send({ error: err.response.data.error })
        } else {
            res.status(500).send();
        }

    }
}
