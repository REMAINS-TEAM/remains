import { FilesInterceptor } from '@nestjs/platform-express';
import { MAX_FILE_SIZE } from 'constants/main';

export const GetImages = FilesInterceptor('images', 10, {
  limits: { fileSize: MAX_FILE_SIZE },
});
