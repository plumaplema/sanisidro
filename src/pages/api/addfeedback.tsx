import { NextApiRequest, NextApiResponse } from "next";
import { Criterias, FeedBackPostData, Transaction } from "../../lib/Interfaces";
import prisma from "../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body: FeedBackPostData = JSON.parse(req.body)
    const { Age, Gender, Name, customerName, feedback } = body

    const transactions: Transaction[] = feedback.map((value) => {

        const { criteriaNameIds, transactionNameId } = value

        const criteria: Criterias[] = criteriaNameIds.map(values => {
            const { CriteriaScore, id } = values
            return {
                CriteriaScore,
                Criteria: {
                    connect: {
                        id
                    }
                }
            }
        })

        return {
            CriteriaScore: {
                create: criteria
            },
            Transaction: {
                connect: {
                    id: transactionNameId
                }
            }
        }
    })

    const student = await prisma.feedBack.create({
        data: {
            Name,
            Age,
            Gender,
            customerName,
            Transaction: {
                create: transactions
            }
        }
    })

    res.status(200).json(student)
}