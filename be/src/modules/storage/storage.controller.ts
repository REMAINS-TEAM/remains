import { Controller, Get, Param, Response } from '@nestjs/common';
import { StorageService } from './storage.service';
import { GetItemImage } from 'modules/storage/dto/get-item-image';

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Get(':itemId/:filename')
  async getImage(
    @Param() { itemId, filename }: GetItemImage,
    @Response() res: any,
  ) {
    const imageBuffer = await this.storageService.download(
      `/items/${itemId}/${filename}`,
    );
    res.set({ 'Content-Type': 'image/jpeg' }).end(imageBuffer);
  }
}
