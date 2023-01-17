import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prismadb"
import transact from "../../lib/transact"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const student = await prisma.feedBack.findMany()

    console.log(student)

    res.status(200).json(student)
}
