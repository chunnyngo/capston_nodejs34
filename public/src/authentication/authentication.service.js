"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../models/user/user.service");
const client_1 = require("@prisma/client");
const runtime_1 = require("@prisma/client/runtime");
const prisma = new client_1.PrismaClient();
const bcrypt = require("bcrypt");
const prismaErrorCode_enum_1 = require("../common/constants/prismaErrorCode.enum");
let AuthenticationService = class AuthenticationService {
    constructor(configService, jwtService, userService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async validateUser({ email, mat_khau }) {
        const user = await this.userService.getUserByEmail(email);
        const checkPass = bcrypt.compareSync(mat_khau, user.mat_khau);
        if (checkPass) {
            const { mat_khau: password, is_removed, ...result } = user;
            return result;
        }
        throw new common_1.UnauthorizedException('Incorrect Password');
    }
    async login(user) {
        return this.jwtService.sign(user);
    }
    async register(registerData) {
        try {
            const hashedPass = bcrypt.hashSync(registerData.mat_khau, Number(this.configService.get('BCRYPT_SALT')));
            await this.userService.createUser({
                ...registerData,
                mat_khau: hashedPass,
            });
            return 'User created successfully';
        }
        catch (err) {
            if (err instanceof runtime_1.PrismaClientKnownRequestError &&
                err.code === prismaErrorCode_enum_1.prismaErrorCodes.unique) {
                throw new common_1.ConflictException({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: 'User with this email has already been existed.',
                    error: err.meta ? err.meta : registerData,
                });
            }
            throw err;
        }
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        user_service_1.UserService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map