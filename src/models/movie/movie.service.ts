import { Request } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
// prisma
import { PrismaClient } from '@prisma/client';
import { bannerSelect, phimSelect } from 'prisma/prisma-select';
import { BannerDto, CreateMovieDto, MovieDto, UpdateMovieDto } from './movie-dto/movie.dto';
import { PaginationMovieQuery, PaginationResDto } from 'src/dto/common.dto';
// custom response
import { PagiRes } from 'src/common/models/responseModel';
import { getFileUrl } from 'src/common/utils/utils';
import { ConfigService } from '@nestjs/config';

const prisma = new PrismaClient
@Injectable()
export class MovieService {
  constructor(
    private readonly configService: ConfigService,
  ) { }
  // lay banner
  async getBanner(): Promise<BannerDto[]> {
    return await prisma.banner.findMany({
      where: {
        is_removed: false
      },
      select: bannerSelect
    })
  }
  // lay thong tin phim bang ma phim
  async getMovieInfo(maPhim: number): Promise<MovieDto> {
    const movieInfo = await prisma.phim.findFirst({
      where: {
        ma_phim: maPhim,
        is_removed: false
      },
      select: phimSelect,
      orderBy: {
        // sap xep theo thu tu tang dan
        ngay_khoi_chieu: 'asc'
      }
    });
    if (!movieInfo) throw new NotFoundException('Can not find movie');
    return movieInfo;
  }
  // lay danh sach phim
  async getMovieList(tenPhim: string): Promise<MovieDto[]> {
    return await prisma.phim.findMany({
      where: {
        ten_phim: { contains: tenPhim }
      },
      select: phimSelect
    })
  }
  // lấy danh sách phim theo tên Phim, theo ngày Công Chiêu & Phân trang
  async getMoviePagination(query: PaginationMovieQuery
  ): Promise<PaginationResDto<MovieDto>> {
    const { tenPhim, currentPage, itemsPerPage, fromDate, toDate } = query
    // lấy danh sách phim theo trang & đếm tổng số lượng phim (toàn bộ phim, không theo trang)
    const [movieList, totalItems] = await Promise.all([
      prisma.phim.findMany({
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        where: {
          ten_phim: { contains: tenPhim },
          ngay_khoi_chieu: { gte: fromDate, lte: toDate },
          is_removed: false
        },
        select: phimSelect,
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
    return new PagiRes<MovieDto>({
      currentPage,
      itemsPerPage,
      totalItems,
      items: movieList
    }).res()
  }
  // upload hinh phim
  async uploadImage(req: Request, maPhim: number, filename: string) {
    const fileUrl = getFileUrl(req, this.configService.get('MOVIE_URL'), filename);
    await prisma.phim.update({
      data: {
        hinh_anh: fileUrl
      },
      where: {
        ma_phim: maPhim
      }
    })
    return { fileUrl }
  }
  // them phim
  async creatMovie(movieInfo: CreateMovieDto) {
    return await prisma.phim.create({
      data: movieInfo,
      select: phimSelect
    })
  }
  // cap nhat phim
  async updatemovie(updateInfo: UpdateMovieDto) {
    return await prisma.phim.update({
      where: { ma_phim: updateInfo.ma_phim },
      data: updateInfo,
      select: phimSelect
    })
  }
  // xoa phim
  async deleteMovie(maPhim: number): Promise<MovieDto> {
    return await prisma.phim.delete({
      where: { ma_phim: maPhim },
      select: phimSelect
    })
  }
}
