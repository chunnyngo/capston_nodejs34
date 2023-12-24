"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheaterService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_select_1 = require("../../../prisma/prisma-select");
const prisma = new client_1.PrismaClient();
let TheaterService = class TheaterService {
    async getTheaterChain(ma_he_thong_rap) {
        return await prisma.heThongRap.findMany({
            where: { ma_he_thong_rap, is_removed: false },
            select: prisma_select_1.theatreChainSelect
        });
    }
    async getTheaterList(ma_he_thong_rap) {
        const theaterList = await prisma.cumRap.findMany({
            where: { ma_he_thong_rap, is_removed: false },
            select: {
                ma_cum_rap: true,
                ten_cum_rap: true,
                dia_chi: true,
                RapPhim: {
                    select: { ma_rap: true, ten_rap: true }
                }
            }
        });
        if (theaterList.length === 0) {
            throw new common_1.NotFoundException("ma he thong rap isn't exist");
        }
        return theaterList;
    }
    async getShowTimeByChain(ma_he_thong_rap) {
        const heThongRapList = await prisma.heThongRap.findMany({
            where: { ma_he_thong_rap, is_removed: false },
            select: {
                ma_he_thong_rap: true,
                ten_he_thong_rap: true,
                logo: true,
                CumRap: {
                    where: {
                        RapPhim: {
                            some: { LichChieu: { some: {} } }
                        }, is_removed: false
                    },
                    select: {
                        ma_cum_rap: true,
                        ten_cum_rap: true,
                        dia_chi: true
                    }
                }
            }
        });
        if (!heThongRapList) {
            throw new common_1.NotFoundException("ma he thong rap does not exist");
        }
        const getMovieAndSchedule = async (ma_cum_rap) => {
            const movieListRaw = await prisma.phim.findMany({
                where: {
                    LichChieu: { some: { RapPhim: { ma_cum_rap, is_removed: false } } },
                    is_removed: false,
                },
                select: {
                    ...prisma_select_1.phimSelect,
                    LichChieu: {
                        where: {
                            RapPhim: { ma_cum_rap, is_removed: false },
                            is_removed: false,
                        },
                        select: {
                            ma_lich_chieu: true,
                            ma_rap: true,
                            ngay_gio_chieu: true,
                            RapPhim: { select: { ten_rap: true } },
                        },
                        orderBy: { ngay_gio_chieu: 'asc' },
                    },
                },
            });
            const movieList = movieListRaw.map((movie) => {
                const { LichChieu, ...movieInfo } = movie;
                const lichChieuOutput = LichChieu.map((lc) => ({
                    maLichChieu: lc.ma_lich_chieu,
                    maRap: lc.ma_rap,
                    tenRap: lc.RapPhim.ten_rap,
                    ngayGioChieu: lc.ngay_gio_chieu,
                }));
                return { ...movieInfo, lichChieuPhim: lichChieuOutput };
            });
            return movieList;
        };
        const lichChieuFinal = await Promise.all(heThongRapList.map(async (heThong) => ({
            maHeThongRap: heThong.ma_he_thong_rap,
            tenHeThongRap: heThong.ten_he_thong_rap,
            logo: heThong.logo,
            cumRap: await Promise.all(heThong.CumRap.map(async (cr) => ({
                maCumRap: cr.ma_cum_rap,
                tenCumRap: cr.ten_cum_rap,
                diaChi: cr.dia_chi,
                phim: await getMovieAndSchedule(cr.ma_cum_rap),
            }))),
        })));
        return lichChieuFinal;
    }
};
TheaterService = __decorate([
    (0, common_1.Injectable)()
], TheaterService);
exports.TheaterService = TheaterService;
//# sourceMappingURL=theater.service.js.map