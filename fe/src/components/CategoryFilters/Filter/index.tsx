import React, { ReactElement, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import FilterListItem from './FilterListItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Filter = ({
  title,
  icon,
  options,
  onChange,
  defaultExpanded,
  defaultSelectedIds,
}: {
  title: string;
  options: { id: number; title: string }[] | null;
  onChange?: (ids: number[]) => void;
  defaultExpanded?: boolean;
  icon?: ReactElement;
  defaultSelectedIds?: number[];
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(
    defaultSelectedIds || [],
  );

  const isAllSelected = selectedIds.length === options?.length;

  const selectAllHandler = () => {
    setSelectedIds(isAllSelected ? [] : options?.map(({ id }) => id) || []);
  };

  useEffect(() => {
    if (!onChange) return;
    onChange(isAllSelected ? [] : selectedIds);
  }, [selectedIds]);

  if (!options || !options?.length) return null;

  const onChangeItemChecked = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((_id) => _id !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Accordion
      disableGutters={true}
      sx={{ boxShadow: 'none', pt: 0, background: 'none' }}
      defaultExpanded={defaultExpanded}
    >
      <AccordionSummary
        sx={{
          p: 0,
          '& .Mui-expanded': {
            my: 1,
            minHeight: 0,
          },
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        {icon &&
          React.cloneElement(
            icon,
            { color: 'secondary', sx: { mr: 1.5 } },
            null,
          )}
        <Typography color="secondary">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pt: 1 }}>
        {options.map(({ id, title }) => (
          <FilterListItem
            key={id}
            id={id}
            title={title}
            checked={selectedIds.includes(id)}
            onChange={onChangeItemChecked}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default Filter;
