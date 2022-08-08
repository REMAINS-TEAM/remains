import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { YandexStorageService } from 'modules/storage/yandex-storage.service';

@Module({
  controllers: [StorageController],
  providers: [
    StorageService,
    { provide: 'STORAGE_PROVIDER', useClass: YandexStorageService },
  ],
  exports: [StorageService],
})
export class StorageModule {}
