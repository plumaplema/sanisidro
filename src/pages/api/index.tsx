import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prismadb"
import transact from "../../lib/transact"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const criteria = await prisma.criteriaCategories.findMany()
    const transact = await prisma.transactionCategories.findMany()
    const customer = await prisma.customerCategories.findMany()

    res.status(200).json({ criteria, transact, customer })
}
