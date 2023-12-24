"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_module_1 = require("./models/user/user.module");
const movie_module_1 = require("./models/movie/movie.module");
const booking_module_1 = require("./models/booking/booking.module");
const theater_module_1 = require("./models/theater/theater.module");
const authentication_module_1 = require("./authentication/authentication.module");
const http_exceptions_filter_1 = require("./common/exceptions/http-exceptions.filter");
const prisma_client_exceptions_filter_1 = require("./common/exceptions/prisma-client-exceptions.filter");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, movie_module_1.MovieModule, booking_module_1.BookingModule, theater_module_1.TheaterModule, authentication_module_1.AuthenticationModule, config_1.ConfigModule.forRoot({ isGlobal: true })],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, {
                provide: core_1.APP_FILTER,
                useClass: http_exceptions_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: prisma_client_exceptions_filter_1.PrismaClientExceptionFilter,
            },],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map