import * as React from 'react';
import { Flex, List, ListIcon, ListItem, Spacer, Stat, StatArrow, Code, Card, CardBody, CardHeader, StatGroup, StatHelpText, StatLabel, StatNumber, Text, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Heading } from '@chakra-ui/react';
import prisma from '../lib/prismadb';
import { InferGetServerSidePropsType } from 'next'

export default function App({ feedbacks }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <Flex p={4} justifyContent={'center'} alignItems={'center'}>
            <Card width={"100%"} bgColor={"whiteAlpha.700"}>
                <CardHeader>
                    <Heading size='md'>Transaction History</Heading>
                </CardHeader>
                <CardBody >
                    <List spacing={3}>
                        <TableContainer>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th>Date</Th>
                                        <Th>Transaction</Th>
                                        <Th>Average Rating</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </List>
                </CardBody>
            </Card>
        </Flex >
    );
}


export const getServerSideProps = async ({ req, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const feedback = await prisma.feedBack.findMany({
        include: {
            customerGroup: true,
            criteriaScores: {
                include: {
                    name: true
                }
            }
        },
        orderBy: {
            start: "desc"
        }
    })

    console.log(feedback)

    const feedbacks: typeof feedback = JSON.parse(JSON.stringify(feedback))
    return {
        props: {
            feedbacks
        }
    }
}