import { NextApiRequest, NextApiResponse } from "next"
import transact from "../../lib/transact"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body = JSON.parse(req.body)

    const action = [body]

    const result = await transact(action)

    res.status(200).json(result)
}

/*{
        "account": "eosio",
        "name": "buyram",
        "data": {
            "payer": process.env.WALLET,
            "receiver": process.env.WALLET,
            "quant": "1.00000000 WAX"
        },
        "authorization": [
            {
                "actor": "sanisidro123",
                "permission": "owner"
            }
        ]
    }
*/