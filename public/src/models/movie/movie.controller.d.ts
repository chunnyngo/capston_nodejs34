/// <reference types="multer" />
import { Request } from 'express';
import { MovieService } from './movie.service';
import { ConfigService } from '@nestjs/config';
import { BannerDto, MovieDto, CreateMovieDto, UpdateMovieDto } from './movie-dto/movie.dto';
import { PaginationMovieQuery, PaginationResDto } from 'src/dto/common.dto';
export declare class MovieController {
    private readonly movieService;
    private readonly configService;
    constructor(movieService: MovieService, configService: ConfigService);
    getBanner(): Promise<BannerDto[]>;
    getMovieInfo(maPhim: number): Promise<MovieDto>;
    getMovieList(tenPhim: string): Promise<MovieDto[]>;
    getMoviePagination(query: PaginationMovieQuery): Promise<PaginationResDto<MovieDto>>;
    uploadImage(maPhim: number, req: Request, file: Express.Multer.File): Promise<{
        fileUrl: string;
    }>;
    createMovie(movieInfo: CreateMovieDto): Promise<MovieDto>;
    updateMovie(updateInfo: UpdateMovieDto): Promise<MovieDto>;
    deleteMovie(maPhim: number): Promise<MovieDto>;
}
