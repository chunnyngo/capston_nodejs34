"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("@nestjs/common/utils");
const authentication_service_1 = require("./authentication.service");
const authentication_controller_1 = require("./authentication.controller");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../models/user/user.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, utils_1.forwardRef)(() => user_module_1.UserModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => {
                    return {
                        secret: config.get('JWT_SECRET'),
                        signOptions: { expiresIn: '2h' },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [authentication_controller_1.AuthenticationController],
        providers: [authentication_service_1.AuthenticationService, jwt_strategy_1.JwtStrategy],
        exports: [authentication_service_1.AuthenticationService]
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map