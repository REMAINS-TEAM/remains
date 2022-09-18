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
  values,
  onChange,
  defaultExpanded,
}: {
  title: string;
  options: { id: number; title: string }[] | null;
  values?: number[];
  onChange?: (ids: number[]) => void;
  defaultExpanded?: boolean;
  icon?: ReactElement;
}) => {
  if (!options || !options?.length) return null;

  const onChangeItemChecked = (id: number) => {
    if (!onChange) return;

    if (values?.includes(id)) {
      return onChange(values.filter((_id) => _id !== id));
    } else {
      return onChange([...(values || []), id]);
    }
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
            checked={values?.includes(id)}
            onChange={onChangeItemChecked}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default Filter;
