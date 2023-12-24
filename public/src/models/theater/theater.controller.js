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
exports.TheaterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const theater_service_1 = require("./theater.service");
let TheaterController = class TheaterController {
    constructor(theaterService) {
        this.theaterService = theaterService;
    }
    async getTheatreChain(maHeThongRap) {
        const maHeThong = maHeThongRap === '' ? undefined : maHeThongRap;
        return await this.theaterService.getTheaterChain(maHeThong);
    }
    async getTheatreList(maHeThongRap) {
        return await this.theaterService.getTheaterList(maHeThongRap);
    }
    async getScheduleByChain(maHeThongRap) {
        const maHeThong = maHeThongRap === '' ? undefined : maHeThongRap;
        return await this.theaterService.getShowTimeByChain(maHeThong);
    }
};
__decorate([
    (0, common_1.Get)('LayThongTinHeThongRap'),
    (0, swagger_1.ApiQuery)({ name: 'maHeThongRap', required: false }),
    __param(0, (0, common_1.Query)('maHeThongRap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TheaterController.prototype, "getTheatreChain", null);
__decorate([
    (0, common_1.Get)('LayThongTinCumRap/:maHeThongRap'),
    __param(0, (0, common_1.Param)('maHeThongRap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TheaterController.prototype, "getTheatreList", null);
__decorate([
    (0, common_1.Get)('LayThongTinLichChieuTheoHeThongRap'),
    (0, swagger_1.ApiQuery)({ name: 'maHeThongRap', required: false }),
    __param(0, (0, common_1.Query)('maHeThongRap')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TheaterController.prototype, "getScheduleByChain", null);
TheaterController = __decorate([
    (0, common_1.Controller)('QuanLyRap'),
    (0, swagger_1.ApiTags)('Quản lý rạp'),
    __metadata("design:paramtypes", [theater_service_1.TheaterService])
], TheaterController);
exports.TheaterController = TheaterController;
//# sourceMappingURL=theater.controller.js.map