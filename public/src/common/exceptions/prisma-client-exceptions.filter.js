"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const library_1 = require("@prisma/client/runtime/library");
const prismaErrorCode_enum_1 = require("../constants/prismaErrorCode.enum");
let PrismaClientExceptionFilter = class PrismaClientExceptionFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        console.error(exception.message);
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        switch (exception.code) {
            case prismaErrorCode_enum_1.prismaErrorCodes.outRange: {
                const status = common_1.HttpStatus.BAD_REQUEST;
                res.status(status).json({
                    statusCode: status,
                    message: "The provided value for the column is too long for the column's type",
                    error: exception.meta ? exception.meta : exception.code,
                });
                break;
            }
            case prismaErrorCode_enum_1.prismaErrorCodes.unique: {
                const status = common_1.HttpStatus.CONFLICT;
                res.status(status).json({
                    statusCode: status,
                    message: 'Unique constraint failed',
                    error: exception.meta ? exception.meta : exception.code,
                });
                break;
            }
            case prismaErrorCode_enum_1.prismaErrorCodes.foreignKey: {
                const status = common_1.HttpStatus.BAD_REQUEST;
                res.status(status).json({
                    statusCode: status,
                    message: 'Foreign Key failed. Record(s) not found',
                    error: exception.meta ? exception.meta : exception.code,
                });
                break;
            }
            case prismaErrorCode_enum_1.prismaErrorCodes.notFound: {
                const status = common_1.HttpStatus.NOT_FOUND;
                res.status(status).json({
                    statusCode: status,
                    message: 'The provided record is not found',
                    error: exception.meta ? exception.meta : exception.code,
                });
                break;
            }
            default:
                const status = common_1.HttpStatus.BAD_REQUEST;
                res.status(status).json({
                    statusCode: status,
                    message: `Failed when executing request at database. Prisma Error Code: ${exception.code}`,
                    error: exception.meta ? exception.meta : exception.code,
                });
                break;
        }
    }
};
PrismaClientExceptionFilter = __decorate([
    (0, common_1.Catch)(library_1.PrismaClientKnownRequestError)
], PrismaClientExceptionFilter);
exports.PrismaClientExceptionFilter = PrismaClientExceptionFilter;
//# sourceMappingURL=prisma-client-exceptions.filter.js.map