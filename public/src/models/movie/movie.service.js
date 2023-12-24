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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_select_1 = require("../../../prisma/prisma-select");
const responseModel_1 = require("../../common/models/responseModel");
const utils_1 = require("../../common/utils/utils");
const config_1 = require("@nestjs/config");
const prisma = new client_1.PrismaClient;
let MovieService = class MovieService {
    constructor(configService) {
        this.configService = configService;
    }
    async getBanner() {
        return await prisma.banner.findMany({
            where: {
                is_removed: false
            },
            select: prisma_select_1.bannerSelect
        });
    }
    async getMovieInfo(maPhim) {
        const movieInfo = await prisma.phim.findFirst({
            where: {
                ma_phim: maPhim,
                is_removed: false
            },
            select: prisma_select_1.phimSelect,
            orderBy: {
                ngay_khoi_chieu: 'asc'
            }
        });
        if (!movieInfo)
            throw new common_1.NotFoundException('Can not find movie');
        return movieInfo;
    }
    async getMovieList(tenPhim) {
        return await prisma.phim.findMany({
            where: {
                ten_phim: { contains: tenPhim }
            },
            select: prisma_select_1.phimSelect
        });
    }
    async getMoviePagination(query) {
        const { tenPhim, currentPage, itemsPerPage, fromDate, toDate } = query;
        const [movieList, totalItems] = await Promise.all([
            prisma.phim.findMany({
                skip: (currentPage - 1) * itemsPerPage,
                take: itemsPerPage,
                where: {
                    ten_phim: { contains: tenPhim },
                    ngay_khoi_chieu: { gte: fromDate, lte: toDate },
                    is_removed: false
                },
                select: prisma_select_1.phimSelect,
                orderBy: {
                    ngay_khoi_chieu: "asc"
                }
            }),
            prisma.phim.count({
                where: {
                    ten_phim: { contains: tenPhim },
                    ngay_khoi_chieu: { gte: fromDate, lt: toDate },
                }
            })
        ]);
        return new responseModel_1.PagiRes({
            currentPage,
            itemsPerPage,
            totalItems,
            items: movieList
        }).res();
    }
    async uploadImage(req, maPhim, filename) {
        const fileUrl = (0, utils_1.getFileUrl)(req, this.configService.get('MOVIE_URL'), filename);
        await prisma.phim.update({
            data: {
                hinh_anh: fileUrl
            },
            where: {
                ma_phim: maPhim
            }
        });
        return { fileUrl };
    }
    async creatMovie(movieInfo) {
        return await prisma.phim.create({
            data: movieInfo,
            select: prisma_select_1.phimSelect
        });
    }
    async updatemovie(updateInfo) {
        return await prisma.phim.update({
            where: { ma_phim: updateInfo.ma_phim },
            data: updateInfo,
            select: prisma_select_1.phimSelect
        });
    }
    async deleteMovie(maPhim) {
        return await prisma.phim.delete({
            where: { ma_phim: maPhim },
            select: prisma_select_1.phimSelect
        });
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map