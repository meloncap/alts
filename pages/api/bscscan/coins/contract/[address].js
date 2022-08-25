import axios from "axios";

export default async function handler(req, res) {

    const { address } = req.query;

    const url = `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.BSCSCAN_KEY}`;
    try {
        const result = await axios.get(url, { headers: { 'Content-Type': 'application/json' } })        
        res.status(200).json(result.data.result[0])
    } catch (err) {
        console.log(err)
        if (err.response && err.response.status) {
            res.status(err.response.status).send({ error: err.response.data.error })
        } else {
            res.status(500).send()
        }
    }
}
