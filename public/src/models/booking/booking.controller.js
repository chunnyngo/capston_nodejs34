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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const user_dto_1 = require("../user/dto/user.dto");
const theater_dto_1 = require("../theater/dto/theater.dto");
const booking_dto_1 = require("./dto/booking.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_guard_1 = require("../../common/guards/role.guard");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async bookTicket({ user }, bookingInfo) {
        return await this.bookingService.bookTicket(bookingInfo, user.tai_khoan);
    }
    async getSeatBySchedule(maLichChieu) {
        return await this.bookingService.getSeatBySchedule(maLichChieu);
    }
    async createSchedule(scheduleInfo) {
        return await this.bookingService.createSchedule(scheduleInfo);
    }
};
__decorate([
    (0, common_1.Post)('DatVe'),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.USER, user_dto_1.LoaiNguoiDung.ADMIN),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, booking_dto_1.CreateManyBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "bookTicket", null);
__decorate([
    (0, common_1.Get)('LayDanhSachGheTheoLichChieu/:maLichChieu'),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.USER, user_dto_1.LoaiNguoiDung.ADMIN),
    __param(0, (0, common_1.Param)('maLichChieu', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getSeatBySchedule", null);
__decorate([
    (0, common_1.Post)('TaoLichChieu'),
    (0, roles_decorator_1.Roles)(user_dto_1.LoaiNguoiDung.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [theater_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createSchedule", null);
BookingController = __decorate([
    (0, common_1.Controller)('QuanLyDatVe'),
    (0, swagger_1.ApiTags)('Quản lý đặt vé'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map