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
exports.UpdateNguoiDungDtoAdmin = exports.UpdateNguoiDungDtoAdminAll = exports.CreateNguoiDungDtoAdmin = exports.UpdateNguoiDungDto = exports.CreateNguoiDungDto = exports.NguoiDungDto = exports.LoginInfoDto = exports.NguoiDungEntity = exports.LoaiNguoiDung = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var LoaiNguoiDung;
(function (LoaiNguoiDung) {
    LoaiNguoiDung["ADMIN"] = "ADMIN";
    LoaiNguoiDung["MODERATOR"] = "MODERATOR";
    LoaiNguoiDung["USER"] = "USER";
})(LoaiNguoiDung = exports.LoaiNguoiDung || (exports.LoaiNguoiDung = {}));
let NguoiDungEntity = class NguoiDungEntity {
};
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], NguoiDungEntity.prototype, "tai_khoan", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], NguoiDungEntity.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NguoiDungEntity.prototype, "mat_khau", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], NguoiDungEntity.prototype, "ho_ten", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], NguoiDungEntity.prototype, "so_dt", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(LoaiNguoiDung),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], NguoiDungEntity.prototype, "loai_nguoi_dung", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], NguoiDungEntity.prototype, "is_removed", void 0);
NguoiDungEntity = __decorate([
    (0, class_transformer_1.Exclude)()
], NguoiDungEntity);
exports.NguoiDungEntity = NguoiDungEntity;
class LoginInfoDto extends (0, swagger_1.PickType)(NguoiDungEntity, [
    'email',
    'mat_khau',
]) {
}
exports.LoginInfoDto = LoginInfoDto;
class NguoiDungDto extends (0, swagger_1.OmitType)(NguoiDungEntity, [
    'mat_khau',
    'is_removed',
]) {
}
exports.NguoiDungDto = NguoiDungDto;
class CreateNguoiDungDto extends (0, swagger_1.OmitType)(NguoiDungEntity, [
    'tai_khoan',
    'loai_nguoi_dung',
    'is_removed',
]) {
}
exports.CreateNguoiDungDto = CreateNguoiDungDto;
class UpdateNguoiDungDto extends (0, swagger_1.PickType)(NguoiDungEntity, [
    'email',
    'mat_khau',
]) {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateNguoiDungDto.prototype, "hoTen", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateNguoiDungDto.prototype, "soDT", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateNguoiDungDto.prototype, "emailMoi", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateNguoiDungDto.prototype, "matKhauMoi", void 0);
exports.UpdateNguoiDungDto = UpdateNguoiDungDto;
class CreateNguoiDungDtoAdmin extends (0, swagger_1.OmitType)(NguoiDungEntity, [
    'tai_khoan',
    'is_removed',
]) {
}
exports.CreateNguoiDungDtoAdmin = CreateNguoiDungDtoAdmin;
class UpdateNguoiDungDtoAdminAll extends (0, swagger_1.OmitType)(NguoiDungEntity, [
    'tai_khoan',
    'is_removed',
]) {
}
exports.UpdateNguoiDungDtoAdminAll = UpdateNguoiDungDtoAdminAll;
class UpdateNguoiDungDtoAdmin extends (0, swagger_1.PartialType)(UpdateNguoiDungDtoAdminAll) {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UpdateNguoiDungDtoAdmin.prototype, "taiKhoan", void 0);
exports.UpdateNguoiDungDtoAdmin = UpdateNguoiDungDtoAdmin;
//# sourceMappingURL=user.dto.js.map