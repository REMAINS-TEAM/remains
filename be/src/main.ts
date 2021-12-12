import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./modules/prisma/prisma.service";
import { ValidationPipe } from "@nestjs/common";
import authMiddleware from "./middlewares/auth.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Prefix
  app.setGlobalPrefix("api");
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env.NODE_ENV === "prod",
      transform: true,
    })
  );
  // CORS
  app.enableCors();
  // Middlewares
  app.use(authMiddleware);

  await app.listen(8080);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
}
bootstrap();
