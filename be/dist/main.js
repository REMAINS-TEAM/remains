"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api");
    app.enableCors();
    await app.listen(8080);
    const prismaService = app.get(prisma_service_1.PrismaService);
    prismaService.enableShutdownHooks(app);
}
bootstrap();
//# sourceMappingURL=main.js.map