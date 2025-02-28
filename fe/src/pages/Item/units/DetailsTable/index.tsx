import React from 'react';
import { Box } from '@mui/material';
import { Item } from 'store/slices/items';
import { itemFields, userFields } from 'pages/Item/units/DetailsTable/config';
import InfoGroup from './InfoGroup';

function DetailsTable({ item }: { item: Item }) {
  return (
    <Box sx={{ width: '100%', pb: 1 }}>
      <InfoGroup title="Товар" fields={itemFields} item={item} />
      <InfoGroup title="Владелец" fields={userFields} item={item} />
    </Box>
  );
}

export default React.memo(DetailsTable);
