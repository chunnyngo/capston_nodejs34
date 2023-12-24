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
exports.UpdateMovieDto = exports.CreateMovieDto = exports.MovieDto = exports.BannerDto = exports.BannerEntity = exports.MovieEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const opposite_decorator_1 = require("../../../common/decorators/opposite.decorator");
class MovieEntity {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MovieEntity.prototype, "ma_phim", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MovieEntity.prototype, "ten_phim", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MovieEntity.prototype, "trailer", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], MovieEntity.prototype, "hinh_anh", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MovieEntity.prototype, "mo_ta", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], MovieEntity.prototype, "ngay_khoi_chieu", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], MovieEntity.prototype, "danh_gia", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], MovieEntity.prototype, "hot", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ default: false }),
    __metadata("design:type", Boolean)
], MovieEntity.prototype, "dang_chieu", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ default: true }),
    (0, opposite_decorator_1.Opposite)(MovieEntity, (s) => s.dang_chieu),
    __metadata("design:type", Boolean)
], MovieEntity.prototype, "sap_chieu", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MovieEntity.prototype, "is_removed", void 0);
exports.MovieEntity = MovieEntity;
class BannerEntity {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BannerEntity.prototype, "ma_banner", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BannerEntity.prototype, "ma_phim", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BannerEntity.prototype, "hinh_anh", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], BannerEntity.prototype, "is_removed", void 0);
exports.BannerEntity = BannerEntity;
class BannerDto extends (0, swagger_1.OmitType)(BannerEntity, ['is_removed']) {
}
exports.BannerDto = BannerDto;
class MovieDto extends (0, swagger_1.OmitType)(MovieEntity, ['is_removed']) {
}
exports.MovieDto = MovieDto;
class CreateMovieDto extends (0, swagger_1.OmitType)(MovieEntity, [
    'is_removed',
    'ma_phim',
]) {
}
exports.CreateMovieDto = CreateMovieDto;
class UpdateMovieDto extends (0, swagger_1.PartialType)(CreateMovieDto) {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateMovieDto.prototype, "ma_phim", void 0);
exports.UpdateMovieDto = UpdateMovieDto;
//# sourceMappingURL=movie.dto.js.map