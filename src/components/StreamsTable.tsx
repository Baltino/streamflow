import * as React from 'react';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { Contract } from '@streamflow/stream';


type Props = {
  streams: Array<[string, Contract]>
}

const getStreamStatus = (canceledAt: number, createdAt: number, end: number) => {
  if (canceledAt) {
    return 'Canceled';
  }
  if (end < new Date().getTime()/100) {
    return 'Completed';
  }else {
    return 'In progress';
  }

}
const StreamsTable = ({ streams }: Props) => {

  return (
    <>
      <Typography variant="subtitle1">Streams</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Deposited Amount</TableCell>
              <TableCell align="right">Withdrawn Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {streams.map((row) => (
              <TableRow
                key={row[0]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row[0]}
                </TableCell>
                <TableCell align="right">{getStreamStatus(row[1].canceledAt, row[1].createdAt, row[1].end)}</TableCell>
                <TableCell align="right">{row[1].depositedAmount.toString()}</TableCell>
                <TableCell align="right">{row[1].withdrawnAmount.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StreamsTable;
