import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { FeedBackPostData, FeedBackPostDatas } from "../../lib/Interfaces";
import prisma from "../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body: FeedBackPostData = JSON.parse(req.body)

    const { age, criteriaScores, customerCategoriesId, customerName, gender,
        office, start, transactionCategoriesId } = body

    const data: Prisma.Enumerable<Prisma.CriteriaCreateManyFeedBackInput> = criteriaScores.map((value, key) => {
        const { id, score } = value
        return { criteriaCategoriesId: id, score }
    })

    const addfeeback = await prisma.feedBack.create({
        data: {
            age,
            gender,
            office,
            start,
            criteriaScores: {
                createMany: {
                    data
                }
            },
            customerCategoriesId,
            customerName,
            transactionCategoriesId
        }
    })


    res.status(200).json({ addfeeback })
}