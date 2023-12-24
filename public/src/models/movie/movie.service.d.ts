import { Request } from 'express';
import { BannerDto, CreateMovieDto, MovieDto, UpdateMovieDto } from './movie-dto/movie.dto';
import { PaginationMovieQuery, PaginationResDto } from 'src/dto/common.dto';
import { ConfigService } from '@nestjs/config';
export declare class MovieService {
    private readonly configService;
    constructor(configService: ConfigService);
    getBanner(): Promise<BannerDto[]>;
    getMovieInfo(maPhim: number): Promise<MovieDto>;
    getMovieList(tenPhim: string): Promise<MovieDto[]>;
    getMoviePagination(query: PaginationMovieQuery): Promise<PaginationResDto<MovieDto>>;
    uploadImage(req: Request, maPhim: number, filename: string): Promise<{
        fileUrl: string;
    }>;
    creatMovie(movieInfo: CreateMovieDto): Promise<{
        ma_phim: number;
        ten_phim: string;
        trailer: string;
        hinh_anh: string;
        mo_ta: string;
        ngay_khoi_chieu: string;
        danh_gia: number;
        hot: boolean;
        dang_chieu: boolean;
        sap_chieu: boolean;
    }>;
    updatemovie(updateInfo: UpdateMovieDto): Promise<{
        ma_phim: number;
        ten_phim: string;
        trailer: string;
        hinh_anh: string;
        mo_ta: string;
        ngay_khoi_chieu: string;
        danh_gia: number;
        hot: boolean;
        dang_chieu: boolean;
        sap_chieu: boolean;
    }>;
    deleteMovie(maPhim: number): Promise<MovieDto>;
}
