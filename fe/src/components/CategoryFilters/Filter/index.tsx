import React, { useEffect, useState } from 'react';
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
  options,
  onChange,
  defaultExpanded,
}: {
  title: string;
  options: { id: number; title: string }[] | null;
  onChange?: (ids: number[]) => void;
  defaultExpanded?: boolean;
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isAllSelected = selectedIds.length === options?.length;

  const selectAllHandler = () => {
    setSelectedIds(isAllSelected ? [] : options?.map(({ id }) => id) || []);
  };

  useEffect(() => {
    if (!options) return;
    selectAllHandler();
  }, [options]);

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
      sx={{ boxShadow: 'none', pt: 0 }}
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
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0, pt: 0 }}>
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
