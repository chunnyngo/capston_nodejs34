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
exports.CreateManyBookingDto = exports.CreateBookingDto = exports.BookingDto = exports.BookingEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_dto_1 = require("../../user/dto/user.dto");
const theater_dto_1 = require("../../theater/dto/theater.dto");
class BookingEntity {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BookingEntity.prototype, "tai_khoan", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BookingEntity.prototype, "ma_lich_chieu", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BookingEntity.prototype, "ma_ghe", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BookingEntity.prototype, "is_removed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", user_dto_1.NguoiDungDto)
], BookingEntity.prototype, "nguoiDung", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", theater_dto_1.ScheduleDto)
], BookingEntity.prototype, "lichChieu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", theater_dto_1.SeatDto)
], BookingEntity.prototype, "ghe", void 0);
exports.BookingEntity = BookingEntity;
class BookingDto extends (0, swagger_1.OmitType)(BookingEntity, ['is_removed']) {
}
exports.BookingDto = BookingDto;
class CreateBookingDto extends (0, swagger_1.PickType)(BookingEntity, [
    'ma_lich_chieu',
    'ma_ghe',
]) {
}
exports.CreateBookingDto = CreateBookingDto;
class CreateManyBookingDto extends (0, swagger_1.PickType)(BookingEntity, [
    'ma_lich_chieu',
]) {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, swagger_1.ApiProperty)({ type: [Number] }),
    __metadata("design:type", Array)
], CreateManyBookingDto.prototype, "danhSachGhe", void 0);
exports.CreateManyBookingDto = CreateManyBookingDto;
//# sourceMappingURL=booking.dto.js.map