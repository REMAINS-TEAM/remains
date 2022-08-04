import { Controller, Get, Query } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  // @Get()
  // async getLinksForItemId(@Query() { itemId }: GetLinksForItemIdDto) {
  //   return this.storageService.getLinksForItemId(itemId);
  // }
}
