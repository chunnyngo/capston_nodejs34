"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const runtime_1 = require("@prisma/client/runtime");
const prisma_select_1 = require("../../../prisma/prisma-select");
const prismaErrorCode_enum_1 = require("../../common/constants/prismaErrorCode.enum");
const prisma = new client_1.PrismaClient();
let BookingService = class BookingService {
    async bookTicket(bookingInfo, taiKhoan) {
        try {
            const { ma_lich_chieu, danhSachGhe } = bookingInfo;
            const seatList = await prisma.ghe.findMany({
                where: {
                    RapPhim: {
                        LichChieu: { some: { ma_lich_chieu } },
                    },
                    is_removed: false,
                },
                select: { ma_ghe: true },
            });
            danhSachGhe.forEach((bookedma_ghe) => {
                const isValid = seatList.find((seat) => seat.ma_ghe === bookedma_ghe);
                if (!isValid) {
                    throw new common_1.BadRequestException(`ma_ghe #${bookedma_ghe} does not exist in Schedule #${ma_lich_chieu}`);
                }
            });
            const bookingList = danhSachGhe.map((ma_ghe) => ({
                taiKhoan,
                ma_ghe,
                ma_lich_chieu,
            }));
            await prisma.datVe.createMany({ data: bookingList });
            return 'Booked Successfully';
        }
        catch (err) {
            if (err instanceof runtime_1.PrismaClientKnownRequestError &&
                err.code === prismaErrorCode_enum_1.prismaErrorCodes.unique) {
                throw new common_1.ConflictException('One or more seats have already been booked. Or the request was duplicate. Please check and try again');
            }
            throw err;
        }
    }
    async getSeatBySchedule(ma_lich_chieu) {
        const [seatListRaw, bookedList, scheduleInfo] = await Promise.all([
            prisma.ghe.findMany({
                where: { RapPhim: { LichChieu: { some: { ma_lich_chieu } } } },
                select: { ...prisma_select_1.seatSelect },
                orderBy: { ten_ghe: 'asc' },
            }),
            prisma.datVe.findMany({
                where: { ma_lich_chieu },
                select: { ma_ghe: true, tai_khoan: true },
                orderBy: { Ghe: { ten_ghe: 'asc' } },
            }),
            prisma.lichChieu.findFirst({
                where: { ma_lich_chieu },
                select: {
                    ngay_gio_chieu: true,
                    Phim: true,
                    RapPhim: { select: { ten_rap: true, CumRap: true } },
                },
            }),
        ]);
        if (!scheduleInfo) {
            throw new common_1.NotFoundException('Schedule Not Found');
        }
        let i = 0;
        const seatList = seatListRaw.map((seat) => {
            let taiKhoan = null;
            if (i < bookedList.length && bookedList[i].ma_ghe === seat.ma_ghe) {
                taiKhoan = bookedList[i].tai_khoan;
                i++;
            }
            return {
                ...seat,
                daDat: taiKhoan ? true : false,
                taiKhoan,
            };
        });
        const { ten_cum_rap, dia_chi } = scheduleInfo.RapPhim.CumRap;
        const { ten_phim, hinh_anh } = scheduleInfo.Phim;
        const scheduleFullInfo = {
            ma_lich_chieu,
            ten_cum_rap,
            dia_chi,
            ten_rap: scheduleInfo.RapPhim.ten_rap,
            ten_phim,
            hinh_anh,
            ngay_gio_chieu: scheduleInfo.ngay_gio_chieu,
            danhSachGhe: seatList,
        };
        return scheduleFullInfo;
    }
    async createSchedule(scheduleInfo) {
        return await prisma.lichChieu.create({
            data: scheduleInfo,
            select: prisma_select_1.lichChieuSelect,
        });
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)()
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map