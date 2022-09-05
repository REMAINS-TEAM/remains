import React, { useState } from 'react';
import Spinner from 'components/Spinner';
import { HideImageOutlined as NoImageIcon } from '@mui/icons-material';

const ImageWithLoader = ({ src, alt }: { src?: string; alt?: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  if (!src || isError) return <NoImageIcon />;

  const imageLoadedHandler = () => {
    setIsLoading(false);
    setIsError(false);
  };

  const imageErrorHandler = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <>
      <img
        src={src}
        alt={alt || '-'}
        onLoad={imageLoadedHandler}
        onError={imageErrorHandler}
        style={{ display: isLoading ? 'none' : undefined, height: '100%' }}
      />
      {isLoading && <Spinner />}
    </>
  );
};

export default ImageWithLoader;
