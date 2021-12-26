import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UsersModule } from 'modules/users/users.module';
import { CategoriesModule } from 'modules/categories/categories.module';
import { PrismaModule } from 'modules/prisma/prisma.module';
import { ItemsModule } from 'modules/items/items.module';

@Module({
  imports: [PrismaModule, UsersModule, CategoriesModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
