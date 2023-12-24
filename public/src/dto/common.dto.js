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
exports.PaginationResDto = exports.PaginationMovieQuery = exports.PaginationQuery = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PaginationQuery {
    constructor() {
        this.tuKhoa = '';
        this.currentPage = 1;
        this.itemsPerPage = 10;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], PaginationQuery.prototype, "tuKhoa", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === 0 ? 1 : value)),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], PaginationQuery.prototype, "currentPage", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === 0 ? 10 : value)),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], PaginationQuery.prototype, "itemsPerPage", void 0);
exports.PaginationQuery = PaginationQuery;
class PaginationMovieQuery {
    constructor() {
        this.tenPhim = '';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.fromDate = '1970-01-01';
        this.toDate = '2099-01-01';
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], PaginationMovieQuery.prototype, "tenPhim", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(({ value }) => (value === 0 ? 1 : value)),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], PaginationMovieQuery.prototype, "currentPage", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)(({ value }) => (value === 0 ? 10 : value)),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], PaginationMovieQuery.prototype, "itemsPerPage", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? '1970-01-01' : value)),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], PaginationMovieQuery.prototype, "fromDate", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (value === '' ? '2099-01-01' : value)),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], PaginationMovieQuery.prototype, "toDate", void 0);
exports.PaginationMovieQuery = PaginationMovieQuery;
class PaginationResDto {
}
exports.PaginationResDto = PaginationResDto;
//# sourceMappingURL=common.dto.js.map