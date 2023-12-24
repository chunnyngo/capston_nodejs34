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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const authentication_service_1 = require("../../authentication/authentication.service");
const user_dto_1 = require("./dto/user.dto");
const common_dto_1 = require("../../dto/common.dto");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const role_guard_1 = require("../../common/guards/role.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async getUserList() {
        return await this.userService.getListUser();
    }
    getUserRoles() {
        return this.userService.getUserRole();
    }
    async getUserByName(tuKhoa) {
        return await this.userService.getUserByName(tuKhoa);
    }
    async getUsersPagination({ tuKhoa, currentPage, itemsPerPage }) {
        return this.userService.getUserPagination(tuKhoa, currentPage, itemsPerPage);
    }
    getUserInfo(req) {
        return req.user;
    }
    async getUserInfoById(tai_khoan) {
        const user = await this.userService.getUserById(tai_khoan);
        if (user) {
            return user;
        }
        throw new common_1.NotFoundException('User does not exist');
    }
    async addUser(userInfo) {
    }
    async updateUser(req, body) {
        const { tai_khoan, email } = req.user;
        if (email !== body.email) {
            throw new common_1.ConflictException('Email does not match with the provide token');
        }
        await this.authService.validateUser({ email, mat_khau: body.mat_khau });
        return await this.userService.updateUser(body, tai_khoan);
    }
    async updateUserAdmin(body) {
        return await this.userService.updateUserAdmin(body);
    }
    async deleteUser(taiKhoan) {
        return await this.userService.deleteUser(taiKhoan);
    }
};
__decorate([
    (0, common_1.Get)('layDanhSachNguoiDung'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, common_1.Get)('LayDanhSachLoaiNguoiDung'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], UserController.prototype, "getUserRoles", null);
__decorate([
    (0, common_1.Get)('TimKiemNguoiDung'),
    (0, swagger_1.ApiQuery)({ name: 'tuKhoa', required: false }),
    __param(0, (0, common_1.Query)('tuKhoa', new common_1.DefaultValuePipe(''))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByName", null);
__decorate([
    (0, common_1.Get)('TimKiemNguoiDungPhanTrang'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.PaginationQuery]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersPagination", null);
__decorate([
    (0, common_1.Get)('ThongTinTaiKhoan'),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.USER, user_dto_1.LoaiNguoiDung.ADMIN),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)('LayThongTinNguoiDung/:taiKhoan'),
    __param(0, (0, common_1.Param)('taiKhoan', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfoById", null);
__decorate([
    (0, common_1.Post)('ThemNguoiDung'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateNguoiDungDtoAdmin]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Put)('CapNhatThongTinNguoiDung'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UpdateNguoiDungDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)('CapNhatThongTinNguoiDungAdmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateNguoiDungDtoAdmin]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserAdmin", null);
__decorate([
    (0, common_1.Delete)('XoaNguoiDung/:taiKhoan'),
    __param(0, (0, common_1.Param)('taiKhoan', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('QuanLyNguoiDung'),
    (0, swagger_1.ApiTags)('Quản lí người dùng'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.ADMIN),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        authentication_service_1.AuthenticationService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map