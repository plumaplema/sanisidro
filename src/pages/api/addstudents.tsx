import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import { BodyAddStudent } from "../../lib/Interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body: BodyAddStudent = JSON.parse(req.body)
    const { FirstName, LastName, Lrn, sectionId } = body

    const student = await prisma.student.create({
        data: {
            FirstName, LastName, Lrn, sectionId
        }
    })
    res.status(200).json(student)
}