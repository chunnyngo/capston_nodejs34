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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
const user_dto_1 = require("./dto/user.dto");
const prisma_select_1 = require("../../../prisma/prisma-select");
const responseModel_1 = require("../../common/models/responseModel");
const prisma = new client_1.PrismaClient;
let UserService = class UserService {
    constructor(configService) {
        this.configService = configService;
    }
    async getUserByEmail(email) {
        const user = await prisma.nguoiDung.findFirst({
            where: { email, is_removed: false }
        });
        if (!user) {
            throw new common_1.NotFoundException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: 'User with this email does not exist',
                error: { email },
            });
        }
        return user;
    }
    async createUser(userData) {
        const newUser = await prisma.nguoiDung.create({ data: userData });
        return newUser;
    }
    getUserRole() {
        return Object.values(user_dto_1.LoaiNguoiDung);
    }
    async getListUser() {
        return await prisma.nguoiDung.findMany({
            where: { is_removed: false },
            select: prisma_select_1.nguoiDungSelectNoPass
        });
    }
    async getUserByName(tuKhoa) {
        return await prisma.nguoiDung.findMany({
            where: {
                ho_ten: { contains: tuKhoa },
                is_removed: false
            },
            select: prisma_select_1.nguoiDungSelectNoPass
        });
    }
    async getUserPagination(tuKhoa, currentPage, itemsPerPage) {
        const [userList, totalItems] = await Promise.all([
            await prisma.nguoiDung.findMany({
                where: {
                    ho_ten: { contains: tuKhoa },
                    is_removed: false
                },
                skip: (currentPage - 1) * itemsPerPage,
                take: itemsPerPage,
                select: prisma_select_1.nguoiDungSelectNoPass
            }),
            prisma.nguoiDung.count({
                where: { ho_ten: { contains: tuKhoa }, is_removed: false }
            })
        ]);
        return new responseModel_1.PagiRes({
            currentPage,
            itemsPerPage,
            items: userList
        }).res();
    }
    async getUserById(id) {
        return await prisma.nguoiDung.findFirst({
            where: { tai_khoan: id, is_removed: false },
            select: prisma_select_1.nguoiDungSelectNoPass
        });
    }
    async updateUser(updateUserInput, tai_khoan) {
        const { matKhauMoi, emailMoi, ...userInfo } = updateUserInput;
        if (matKhauMoi) {
            userInfo.mat_khau = bcrypt.hashSync(matKhauMoi, Number(this.configService.get('BCRYPT_SALT')));
        }
        if (emailMoi) {
            userInfo.email = emailMoi;
        }
        const updateUser = await prisma.nguoiDung.update({
            where: { tai_khoan }, data: userInfo
        });
        delete updateUser.mat_khau;
        delete updateUser.is_removed;
        return updateUser;
    }
    async updateUserAdmin(userInfo) {
        userInfo.mat_khau = bcrypt.hashSync(userInfo.mat_khau, Number(this.configService.get('BCRYPT_SALT')));
        const updateUser = await prisma.nguoiDung.update({
            where: { tai_khoan: userInfo.taiKhoan },
            data: userInfo
        });
        delete updateUser.mat_khau;
        delete updateUser.is_removed;
        return updateUser;
    }
    async deleteUser(tai_khoan) {
        await prisma.nguoiDung.delete({
            where: { tai_khoan }
        });
        return "deleted successfully";
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map