import React from 'react'
import { Button } from '@chakra-ui/react'
import { ADDSTUDENT, BodyAddStudent, FeedBackPostData } from '../lib/Interfaces'
import prisma from '../lib/prismadb';
import { InferGetServerSidePropsType } from 'next/types';
var CryptoJS = require("crypto-js");

interface FeedBack {
    transactionNameId: string
    criteriaNameId: string
}

const resources = ({ criteria }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const now = new Date()

    const data: FeedBackPostData = {
        age: 10,
        start: now,
        customerCategoriesId: "63c6a1cceff15c4826e62a65",
        transactionCategoriesId: "63c6a206eff15c4826e62a6d",
        customerName: "Gilbert Loyogoy",
        gender: "Male",
        office: 'CUSTODIAN',
        criteriaScores: [
            {
                "id": "63c6a182eff15c4826e62a55",
                score: 3
            },
            {
                "id": "63c6a183eff15c4826e62a56",
                score: 5
            },
            {
                "id": "63c6a183eff15c4826e62a57",
                score: 2
            },
            {
                "id": "63c6a183eff15c4826e62a58",
                score: 3
            },
            {
                "id": "63c6a183eff15c4826e62a59",
                score: 5
            },
            {
                "id": "63c6a184eff15c4826e62a5a",
                score: 4
            },
            {
                "id": "63c6a184eff15c4826e62a5b",
                score: 4
            }]

    }

    return (
        <>
            <div>resources</div>
            <Button onClick={
                async () => {
                    const req = await fetch("/api/addfeedback",
                        {
                            method: "POST",
                            body: JSON.stringify(data)
                        })
                    const res = await req.json()
                    console.log(res)
                }
            }> try </Button>
        </>

    )
}

export const getServerSideProps = async ({ req, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const criterias = await prisma.criteriaCategories.findMany()

    const criteria: typeof criterias = JSON.parse(JSON.stringify(criterias))
    return {
        props: {
            criteria,
        }
    }
}

export default resources