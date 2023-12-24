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
exports.lichChieuPhimDto = exports.lichChieuPhimRawDto = exports.lichChieuCumRapDto = exports.lichChieuCumRapRawDto = exports.SeatDto = exports.CreateScheduleDto = exports.ScheduleOutputDto = exports.ScheduleDto = exports.TheaterDto = exports.TheaterChainDto = exports.SeatEntity = exports.ScheduleEntity = exports.TheaterRoomDto = exports.TheaterRoomEntity = exports.TheaterEntity = exports.TheaterChainEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const index_dto_1 = require("../../../dto/index.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TheaterChainEntity {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterChainEntity.prototype, "ma_he_thong_rap", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterChainEntity.prototype, "ten_he_thong_rap", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterChainEntity.prototype, "logo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], TheaterChainEntity.prototype, "cum_rap", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TheaterChainEntity.prototype, "is_removed", void 0);
exports.TheaterChainEntity = TheaterChainEntity;
class TheaterEntity {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterEntity.prototype, "ma_cum_rap", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterEntity.prototype, "ten_cum_rap", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterEntity.prototype, "dia_chi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], TheaterEntity.prototype, "rap_phim", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterEntity.prototype, "ma_he_thong_rap", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TheaterEntity.prototype, "is_removed", void 0);
exports.TheaterEntity = TheaterEntity;
class TheaterRoomEntity {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TheaterRoomEntity.prototype, "ma_rap", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterRoomEntity.prototype, "ten_rap", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], TheaterRoomEntity.prototype, "ghe", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Array)
], TheaterRoomEntity.prototype, "lich_chieu", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TheaterRoomEntity.prototype, "ma_cum_rap", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TheaterRoomEntity.prototype, "is_removed", void 0);
exports.TheaterRoomEntity = TheaterRoomEntity;
class TheaterRoomDto extends (0, swagger_1.OmitType)(TheaterRoomEntity, [
    'is_removed',
]) {
}
exports.TheaterRoomDto = TheaterRoomDto;
class ScheduleEntity {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ScheduleEntity.prototype, "ma_lich_chieu", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ScheduleEntity.prototype, "ma_rap", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ScheduleEntity.prototype, "ma_phim", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ScheduleEntity.prototype, "ngay_gio_chieu", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", TheaterRoomDto)
], ScheduleEntity.prototype, "rap_phim", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", index_dto_1.MovieDto)
], ScheduleEntity.prototype, "phim", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ScheduleEntity.prototype, "is_removed", void 0);
exports.ScheduleEntity = ScheduleEntity;
class SeatEntity {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SeatEntity.prototype, "ma_ghe", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SeatEntity.prototype, "ten_ghe", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SeatEntity.prototype, "loai_ghe", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SeatEntity.prototype, "ma_rap", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SeatEntity.prototype, "gia_ve", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SeatEntity.prototype, "is_removed", void 0);
exports.SeatEntity = SeatEntity;
class TheaterChainDto extends (0, swagger_1.OmitType)(TheaterChainEntity, [
    'is_removed',
]) {
}
exports.TheaterChainDto = TheaterChainDto;
class TheaterDto extends (0, swagger_1.OmitType)(TheaterEntity, ['is_removed']) {
}
exports.TheaterDto = TheaterDto;
class ScheduleDto extends (0, swagger_1.OmitType)(ScheduleEntity, ['is_removed']) {
}
exports.ScheduleDto = ScheduleDto;
class ScheduleOutputDto extends (0, swagger_1.PickType)(ScheduleEntity, [
    'ma_lich_chieu',
    'ma_rap',
    'ngay_gio_chieu',
]) {
}
exports.ScheduleOutputDto = ScheduleOutputDto;
class CreateScheduleDto extends (0, swagger_1.OmitType)(ScheduleEntity, [
    'ma_lich_chieu',
    'rap_phim',
    'phim',
    'is_removed',
]) {
}
exports.CreateScheduleDto = CreateScheduleDto;
class SeatDto extends (0, swagger_1.OmitType)(SeatEntity, ['is_removed']) {
}
exports.SeatDto = SeatDto;
class lichChieuCumRapRawDto {
}
exports.lichChieuCumRapRawDto = lichChieuCumRapRawDto;
class lichChieuCumRapDto {
}
exports.lichChieuCumRapDto = lichChieuCumRapDto;
class lichChieuPhimRawDto {
}
exports.lichChieuPhimRawDto = lichChieuPhimRawDto;
class lichChieuPhimDto {
}
exports.lichChieuPhimDto = lichChieuPhimDto;
//# sourceMappingURL=theater.dto.js.map