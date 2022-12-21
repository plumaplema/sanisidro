import { NextApiRequest, NextApiResponse } from "next"
import transact from "../../lib/transact"
var CryptoJS = require("crypto-js");
import { Action } from 'eosjs/dist/eosjs-serialize'
import { ADDSTUDENT } from "../../lib/Interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body: { hash: string } = JSON.parse(req.body)
    const hash: string = body['hash']

    const bytes = await CryptoJS.AES.decrypt(hash, "loyogoy")

    const data: ADDSTUDENT = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const params = [{
        "account": process.env.WALLET,
        "name": "addstudent",
        data,
        "authorization": [
            {
                "actor": process.env.WALLET,
                "permission": "owner"
            }
        ]
    }]

    console.log(params)
    const result = await transact(params)
    res.status(200).json(result)
}
