import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { Jsonrpc } from './helpers'
import { QUERYPARAMS } from '../lib/Interfaces';
import { useSession } from 'next-auth/react';
import { GetTableRowsResult } from 'eosjs/dist/eosjs-rpc-interfaces';

interface ITableProps {
}

const TableStudent: React.FunctionComponent<ITableProps> = (props) => {
    const [result, setresult] = useState<GetTableRowsResult | null>(null)

    const { data, status } = useSession()

    const dats: QUERYPARAMS = { json: true, code: 'sanisidro123', scope: 'sanisidro123', table: 'students', index_position: 1 }

    if (status === 'authenticated') {
        const req = Jsonrpc().get_table_rows(data).then(res => console.log(res)).catch(err => console.log(err))
    }

    return (
        <TableContainer>
            <Table size={'lg'} variant='striped' colorScheme='teal'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </TableContainer>);
};

export default TableStudent;
