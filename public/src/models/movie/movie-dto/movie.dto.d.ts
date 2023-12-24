import { Banner, Phim } from '@prisma/client';
export declare class MovieEntity implements Phim {
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
    is_removed: boolean;
}
export declare class BannerEntity implements Banner {
    ma_banner: number;
    ma_phim: number;
    hinh_anh: string;
    is_removed: boolean;
}
declare const BannerDto_base: import("@nestjs/common").Type<Omit<BannerEntity, "is_removed">>;
export declare class BannerDto extends BannerDto_base {
}
declare const MovieDto_base: import("@nestjs/common").Type<Omit<MovieEntity, "is_removed">>;
export declare class MovieDto extends MovieDto_base {
}
declare const CreateMovieDto_base: import("@nestjs/common").Type<Omit<MovieEntity, "is_removed" | "ma_phim">>;
export declare class CreateMovieDto extends CreateMovieDto_base {
}
declare const UpdateMovieDto_base: import("@nestjs/common").Type<Partial<CreateMovieDto>>;
export declare class UpdateMovieDto extends UpdateMovieDto_base {
    ma_phim: number;
}
export {};
