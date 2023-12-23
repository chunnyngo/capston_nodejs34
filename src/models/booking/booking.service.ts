import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// import prisma
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { lichChieuSelect, seatSelect } from '../../../prisma/prisma-select';
import { prismaErrorCodes } from '../../common/constants/prismaErrorCode.enum';
const prisma = new PrismaClient();

// import local DTO
import { CreateManyBookingDto } from './dto/booking.dto';
import { CreateScheduleDto } from '../theater/dto/theater.dto';

@Injectable()
export class BookingService {
  // POST Đặt vé xem phim
  async bookTicket(
    bookingInfo: CreateManyBookingDto,
    taiKhoan: number,
  ): Promise<string> {
    try {
      const { ma_lich_chieu, danhSachGhe } = bookingInfo;

      // kiểm tra các mã ghế trong danh sách vé có nằm trong danh sách ghế của lịch chiếu không.
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
          throw new BadRequestException(
            `ma_ghe #${bookedma_ghe} does not exist in Schedule #${ma_lich_chieu}`,
          );
        }
      });

      const bookingList = danhSachGhe.map((ma_ghe) => ({
        taiKhoan,
        ma_ghe,
        ma_lich_chieu,
      }));
      await prisma.datVe.createMany({ data: bookingList });
      return 'Booked Successfully';
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === prismaErrorCodes.unique
      ) {
        throw new ConflictException(
          'One or more seats have already been booked. Or the request was duplicate. Please check and try again',
        );
      }
      throw err;
    }
  }

  // LẤY Danh sách ghế theo Lịch Chiếu
  async getSeatBySchedule(ma_lich_chieu: number) {
    const [seatListRaw, bookedList, scheduleInfo] = await Promise.all([
      prisma.ghe.findMany({
        where: { RapPhim: { LichChieu: { some: { ma_lich_chieu } } } },
        select: { ...seatSelect },
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
      throw new NotFoundException('Schedule Not Found');
    }

    // map lại danh sách ghế để được output như yêu cầu (thêm taiKhoan & daDat, được lấy từ bookedList)
    let i: number = 0;
    const seatList = seatListRaw.map((seat) => {
      let taiKhoan: number | null = null;
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

  // POST Tạo lịch chiếu
  async createSchedule(scheduleInfo: CreateScheduleDto) {
    return await prisma.lichChieu.create({
      data: scheduleInfo,
      select: lichChieuSelect,
    });
  }
}