import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UsersModule } from 'modules/users/users.module';
import { CategoriesModule } from 'modules/categories/categories.module';
import { PrismaModule } from 'modules/prisma/prisma.module';
import { ItemsModule } from 'modules/items/items.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from 'modules/scheduler/scheduler.module';
import { SearchModule } from 'modules/search/search.module';

@Module({
  imports: [
    PrismaModule,
    SearchModule,
    UsersModule,
    CategoriesModule,
    ItemsModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
