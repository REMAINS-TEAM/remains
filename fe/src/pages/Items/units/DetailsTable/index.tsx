import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { Item } from 'store/slices/items';
import { fields } from './config';

function DetailsTable({ item }: { item: Item }) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {fields.map(({ name, accessor }) => (
            <TableRow
              key={name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                {name}
              </TableCell>
              <TableCell align="right">{item[accessor]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(DetailsTable);
