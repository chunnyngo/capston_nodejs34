import fs from 'fs'
import { Request } from 'express';
import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, Query, DefaultValuePipe, Req, UploadedFile, PayloadTooLargeException, UseGuards, UseInterceptors } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ConfigService } from '@nestjs/config';
// local types
import { BannerDto, MovieDto, CreateMovieDto, UpdateMovieDto } from './movie-dto/movie.dto';
import { FileUploadDto } from 'src/dto/upload.dto';
import { LoaiNguoiDung } from '../user/dto/user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationMovieQuery, PaginationResDto } from 'src/dto/common.dto';
// import multer
import { diskStorage } from 'multer';
// import local guard
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
// local filter
import { uploadFileFilter } from 'src/common/exceptions/upload-file.filter';
@Controller('QuanLyPhim')
@ApiTags('Quản lý phim')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly configService: ConfigService,
  ) { }


  @Get('layDanhSachBanner')
  async getBanner(): Promise<BannerDto[]> {
    return this.movieService.getBanner();
  }

  @Get('layThongTinPhim/:maPhim')
  async getMovieInfo(@Param('maPhim', ParseIntPipe) maPhim: number): Promise<MovieDto> {
    return this.movieService.getMovieInfo(maPhim);
  }

  @Get('layDanhSachPhim')
  @ApiQuery({ name: 'tenPhim', required: false })
  async getMovieList(@Query('tenPhim', new DefaultValuePipe('')) tenPhim: string): Promise<MovieDto[]> {
    return await this.movieService.getMovieList(tenPhim)
  }


  @Get('layDanhSachPhimPhanTrang')
  async getMoviePagination(
    @Query() query: PaginationMovieQuery
  ): Promise<PaginationResDto<MovieDto>> {
    return await this.movieService.getMoviePagination(query);
  }


  @Post('upload/:maPhim')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Movie Image',
    type: FileUploadDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(LoaiNguoiDung.ADMIN)
  @UseInterceptors(
    FileInterceptor('movie', {
      fileFilter: uploadFileFilter('jpg', 'jpeg', 'png', 'webp'),
      storage: diskStorage({
        destination: process.env.MOVIE_URL,
        filename(req, file, callback) {
          callback(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  )
  uploadImage(
    @Param('maPhim', ParseIntPipe) maPhim: number,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    const filelimit = Number(this.configService.get('MOVIE_FILE_LIMIT'))
    if (file.size > filelimit * 1024 * 1024) {
      fs.unlinkSync(
        process.cwd() + '/' + this.configService.get('MOVIE_URL') + '/' + file.filename
      )
      throw new PayloadTooLargeException('File too larges')
    }
    return this.movieService.uploadImage(req, maPhim, file.fieldname)
  }

  @Post('ThemPhim')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(LoaiNguoiDung.ADMIN)
  async createMovie(@Body() movieInfo: CreateMovieDto): Promise<MovieDto> {
    return await this.movieService.creatMovie(movieInfo);
  }

  @Put('CapNhatPhim')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(LoaiNguoiDung.ADMIN)
  async updateMovie(@Body() updateInfo: UpdateMovieDto): Promise<MovieDto> {
    return await this.movieService.updatemovie(updateInfo);
  }
  @Delete('XoaPhim/:maPhim')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(LoaiNguoiDung.ADMIN)
  async deleteMovie(
    @Param('maPhim', ParseIntPipe) maPhim: number,
  ): Promise<MovieDto> {
    return await this.movieService.deleteMovie(maPhim);
  }
}
