import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function BackButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  const backClickHandler = () => navigate(-1);

  return (
    <IconButton onClick={onClick || backClickHandler}>
      <ArrowBackIcon fontSize="medium" />
    </IconButton>
  );
}

export default React.memo(BackButton);
