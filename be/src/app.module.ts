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
import { CompaniesModule } from 'modules/companies/companies.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'configuration';
import { StorageModule } from 'modules/storage/storage.module';
import { PaymentModule } from 'modules/payment/payment.module';
import { WebhooksModule } from 'modules/webhooks/webhooks.module';
import { OrdersModule } from 'modules/orders/orders.module';
import { BrandsModule } from 'modules/brands/brands.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/.env`,
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    PaymentModule,
    SearchModule,
    UsersModule,
    OrdersModule,
    CompaniesModule,
    CategoriesModule,
    ItemsModule,
    BrandsModule,
    StorageModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
    WebhooksModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
