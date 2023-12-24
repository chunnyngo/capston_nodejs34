"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transform_response_interceptor_1 = require("./common/interceptors/transform-response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(express.static('.'));
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true, transform: true
    }));
    app.useGlobalInterceptors(new transform_response_interceptor_1.TransformResponseInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Node34 - Movie - NestJS')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map