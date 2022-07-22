import React from 'react';
import { InfoField } from 'pages/Items/units/DetailsTable/config';
import { Item } from 'store/slices/items';
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

const InfoGroup = ({
  title,
  fields,
  item,
}: {
  title: string;
  fields: InfoField[];
  item: Item;
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h2" color="secondary" sx={{ px: 2, pb: 2 }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {fields.map(({ name, accessor }) => (
              <TableRow
                key={name}
                sx={{ '&>td, &>th': { border: 0, py: 0.5 } }}
              >
                <TableCell
                  align="left"
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 600, width: '50%' }}
                >
                  {name}
                </TableCell>
                <TableCell align="left" sx={{ w: '50%' }}>
                  {typeof accessor === 'function'
                    ? accessor(item)
                    : item[accessor]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InfoGroup;
