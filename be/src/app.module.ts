import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UsersModule } from 'modules/users/users.module';
import { CategoriesModule } from 'modules/categories/categories.module';
import { PrismaModule } from 'modules/prisma/prisma.module';
import { ItemsModule } from 'modules/items/items.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HttpModule } from '@nestjs/axios'
import { join } from 'path';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    UsersModule,
    CategoriesModule,
    ItemsModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
