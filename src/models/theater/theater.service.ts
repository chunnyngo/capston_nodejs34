import { Injectable, NotFoundException } from '@nestjs/common';
import { TheaterChainDto, lichChieuPhimDto, lichChieuPhimRawDto } from './dto/theater.dto';
import { ScheduleOutputDto } from './dto/theater.dto';
// import Prisma
import { Prisma, PrismaClient } from '@prisma/client';
import {
  phimSelect,
  lichChieuSelect,
  theatreChainSelect,
} from '../../../prisma/prisma-select';
import { MovieDto } from '../../dto/index.dto';
const prisma = new PrismaClient();
@Injectable()
export class TheaterService {

  // lay thong tin he thong rap
  async getTheaterChain(
    ma_he_thong_rap: string,
  ): Promise<TheaterChainDto[]> {
    return await prisma.heThongRap.findMany({
      where: { ma_he_thong_rap, is_removed: false },
      select: theatreChainSelect
    })
  }
  // lay thong tin cum rap co trong he thong rap
  async getTheaterList(ma_he_thong_rap: string) {
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
    })
    if (theaterList.length === 0) {
      throw new NotFoundException("ma he thong rap isn't exist")
    }
    return theaterList
  }

  // lay thong tin lich chieu phim
  // async getShowTime(ma_phim: number) {
  //   const [movieInfo, lichChieuRaw]: [MovieDto, lichChieuPhimRawDto[]] =
  //     await Promise.all([
  //       prisma.phim.findFirst({
  //         where: { ma_phim, is_removed: false },
  //         select: phimSelect,
  //       }),
  //       prisma.heThongRap.findMany({
  //         where: {
  //           CumRap: {
  //             some: { RapPhim: { some: { LichChieu: { some: { ma_phim } } } } },
  //           },
  //           is_removed: false,
  //         },
  //         select: {
  //           ma_he_thong_rap: true,
  //           ten_he_thong_rap: true,
  //           logo: true,
  //           CumRap: {
  //             where: {
  //               RapPhim: { some: { LichChieu: { some: { ma_phim } } } },
  //               is_removed: false,
  //             },
  //             select: {
  //               ma_cum_rap: true,
  //               ten_cum_rap: true,
  //               dia_chi: true,
  //               RapPhim: {
  //                 where: { LichChieu: { some: { ma_phim } }, is_removed: false },
  //                 select: {
  //                   ma_rap: true,
  //                   ten_rap: true,
  //                   LichChieu: {
  //                     where: { ma_phim, is_removed: false },
  //                     select: lichChieuSelect,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       }),
  //     ]);

  //   if (!movieInfo) {
  //     throw new NotFoundException('Movie Not Found');
  //   }

  //   // map lại thông tin lịch chiếu để được output như yêu cầu
  //   const lichChieuFinal: lichChieuPhimDto[] = lichChieuRaw.map((heThong) => ({
  //     ma_he_thong_rap: heThong.ma_he_thong_rap,
  //     ten_he_thong_rap: heThong.ten_he_thong_rap,
  //     logo: heThong.logo,
  //     cum_rap: heThong.cum_rap.map((cr) => {
  //       // sử dụng hàm reduce để gộp các Array (lichChieuList ngay bên dưới) lại thành một Array duy nhất (lichChieuPhim)
  //       const lichChieuPhim = cr.rap_phim.reduce<Array<ScheduleOutputDto>>(
  //         (accu, curr) => {
  //           // map lại lichChieu ở trong rapPhim
  //           const lichChieuList = curr.lich_chieu.map((item) => ({
  //             maLichChieu: item.ma_lich_chieu,
  //             maRap: item.ma_rap,
  //             tenRap: curr.ten_rap,
  //             ngayGioChieu: item.ngay_gio_chieu,
  //           }));
  //           return [...accu, ...lichChieuList];
  //         },
  //         [],
  //       );
  //       lichChieuPhim.sort(
  //         (a, b) => Date.parse(a.ngayGioChieu) - Date.parse(b.ngayGioChieu),
  //       );
  //       return {
  //         maCumRap: cr.ma_cum_rap,
  //         tenCumRap: cr.ten_cum_rap,
  //         diaChi: cr.dia_chi,
  //         lichChieuPhim,
  //       };
  //     }),
  //   }));
  //   return { ...movieInfo, heThongRap: lichChieuFinal };



  // }

  //lay thong tin lich chieu theo he thong rap
  async getShowTimeByChain(ma_he_thong_rap: string) {
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
    })
    if (!heThongRapList) {
      throw new NotFoundException("ma he thong rap does not exist")
    }
    // Lấy toàn bộ phim trong cụm rạp và lịch chiếu trong cụm rạp (của các phim đó)
    const getMovieAndSchedule = async (ma_cum_rap: string) => {
      const movieListRaw = await prisma.phim.findMany({
        where: {
          LichChieu: { some: { RapPhim: { ma_cum_rap, is_removed: false } } },
          is_removed: false,
        },
        select: {
          ...phimSelect,
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

    const lichChieuFinal = await Promise.all(
      heThongRapList.map(async (heThong) => ({
        maHeThongRap: heThong.ma_he_thong_rap,
        tenHeThongRap: heThong.ten_he_thong_rap,
        logo: heThong.logo,
        cumRap: await Promise.all(
          heThong.CumRap.map(async (cr) => ({
            maCumRap: cr.ma_cum_rap,
            tenCumRap: cr.ten_cum_rap,
            diaChi: cr.dia_chi,
            phim: await getMovieAndSchedule(cr.ma_cum_rap),
          })),
        ),
      })),
    );

    return lichChieuFinal;
  }
}
