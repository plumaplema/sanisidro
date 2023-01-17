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

    const datas: FeedBackPostData = {
        Name: "Janeelyn Loyogoy",
        Age: 100,
        customerName: 'Other Stakeholders',
        Gender: "Male",
        feedback: [{
            criteriaNameIds: [{ CriteriaScore: 1, id: "63b67b23020eb246c17a34b6" },
            { CriteriaScore: 5, id: "63b681055f744282108cba7c" }],
            transactionNameId: "63b684225f744282108cba8f"
        },
        {
            criteriaNameIds: [{ CriteriaScore: 1, id: "63b67b23020eb246c17a34b6" },
            { CriteriaScore: 5, id: "63b681055f744282108cba7c" }],
            transactionNameId: "63b684235f744282108cba93"
        }]
    }
    return (
        <>
            <div>resources</div>
            <Button onClick={async () => {
                const user = await fetch('api/addfeedback', {
                    method: "POST",
                    body: JSON.stringify(datas)
                })
                const data = await user.json()
                console.log(data)

            }}> try </Button>
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