import * as React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import prisma from '../lib/prismadb';
import { GetServerSideProps } from 'next'
import { Student } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../components/DataTable';

export interface IAppProps {
    data: Student[]
}

export default function App({ data }: IAppProps) {

    const columnHelper = createColumnHelper<Student>();

    const columns = [
        columnHelper.accessor("Lrn", {
            cell: (info) => info.getValue(),
            header: "ID"
        }),
        columnHelper.accessor("Score", {
            cell: (info) => info.getValue(),
            header: "Score",
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor("FirstName", {
            cell: (info) => info.getValue(),
            header: "First Name",
            meta: {
                isNumeric: true
            }
        })
    ];

    return (
        <Flex p={4}>
            <DataTable columns={columns} data={data} />
        </Flex>
    );
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const student = await prisma.student.findMany()

    return {
        props: {
            data: student,
        }
    }
}