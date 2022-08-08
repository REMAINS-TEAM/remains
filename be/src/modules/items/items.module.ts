import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { StorageModule } from 'modules/storage/storage.module';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [StorageModule],
})
export class ItemsModule {}
