import clientPromise from "../../lib/mongodb";
import { NextApiResponse, NextApiRequest } from "next";
import { getToken } from "next-auth/jwt"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req })
    console.log(token)
    if (!token) {
        try {
            const client = await clientPromise;
            const db = client.db();

            const movies = await db.collection("accounts").updateOne({ 'provider': 'google' }, {
                $set: {
                    expires_at: 1871636441
                }
            })

            res.json(movies);
        } catch (e) {
            console.error(e);
        }
    }
    else {
        res.json({ status: 'false' })
    }
};