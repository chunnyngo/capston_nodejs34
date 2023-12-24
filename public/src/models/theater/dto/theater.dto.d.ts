import { CumRap, Ghe, HeThongRap, LichChieu, RapPhim } from '@prisma/client';
import { MovieDto } from '../../../dto/index.dto';
export declare class TheaterChainEntity implements HeThongRap {
    ma_he_thong_rap: string;
    ten_he_thong_rap: string;
    logo: string;
    cum_rap?: TheaterDto[];
    is_removed: boolean;
}
export declare class TheaterEntity implements CumRap {
    ma_cum_rap: string;
    ten_cum_rap: string;
    dia_chi: string;
    rap_phim?: TheaterRoomDto[];
    ma_he_thong_rap: string;
    is_removed: boolean;
}
export declare class TheaterRoomEntity implements RapPhim {
    ma_rap: number;
    ten_rap: string;
    ghe?: SeatDto[];
    lich_chieu?: ScheduleDto[];
    ma_cum_rap: string;
    is_removed: boolean;
}
declare const TheaterRoomDto_base: import("@nestjs/common").Type<Omit<TheaterRoomEntity, "is_removed">>;
export declare class TheaterRoomDto extends TheaterRoomDto_base {
}
export declare class ScheduleEntity implements LichChieu {
    ma_lich_chieu: number;
    ma_rap: number;
    ma_phim: number;
    ngay_gio_chieu: string;
    rap_phim?: TheaterRoomDto;
    phim?: MovieDto;
    is_removed: boolean;
}
export declare class SeatEntity implements Ghe {
    ma_ghe: number;
    ten_ghe: string;
    loai_ghe: string;
    ma_rap: number;
    gia_ve: number;
    is_removed: boolean;
}
declare const TheaterChainDto_base: import("@nestjs/common").Type<Omit<TheaterChainEntity, "is_removed">>;
export declare class TheaterChainDto extends TheaterChainDto_base {
}
declare const TheaterDto_base: import("@nestjs/common").Type<Omit<TheaterEntity, "is_removed">>;
export declare class TheaterDto extends TheaterDto_base {
}
declare const ScheduleDto_base: import("@nestjs/common").Type<Omit<ScheduleEntity, "is_removed">>;
export declare class ScheduleDto extends ScheduleDto_base {
}
declare const ScheduleOutputDto_base: import("@nestjs/common").Type<Pick<ScheduleEntity, "ma_rap" | "ma_lich_chieu" | "ngay_gio_chieu">>;
export declare class ScheduleOutputDto extends ScheduleOutputDto_base {
    tenRap: string;
}
declare const CreateScheduleDto_base: import("@nestjs/common").Type<Omit<ScheduleEntity, "is_removed" | "phim" | "rap_phim" | "ma_lich_chieu">>;
export declare class CreateScheduleDto extends CreateScheduleDto_base {
}
declare const SeatDto_base: import("@nestjs/common").Type<Omit<SeatEntity, "is_removed">>;
export declare class SeatDto extends SeatDto_base {
}
export declare class lichChieuCumRapRawDto {
    ma_cum_rap: string;
    ten_cum_rap: string;
    dia_chi: string;
    rap_phim: {
        ma_rap: number;
        ten_rap: string;
        lich_chieu: {
            ma_rap: number;
            ma_lich_chieu: number;
            ma_phim: number;
            ngay_gio_chieu: string;
        }[];
    }[];
}
export declare class lichChieuCumRapDto {
    ma_cum_rap: string;
    ten_cum_rap: string;
    dia_chi: string;
    lich_chieu_phim: {
        ma_lich_chieu: number;
        ma_rap: number;
        tenRap: string;
        ngay_gio_chieu: string;
    }[];
}
export declare class lichChieuPhimRawDto {
    ma_he_thong_rap: string;
    ten_he_thong_rap: string;
    logo: string;
    cum_rap: Array<lichChieuCumRapRawDto>;
}
export declare class lichChieuPhimDto {
    ma_he_thong_rap: string;
    ten_he_thong_rap: string;
    logo: string;
    cum_rap: Array<lichChieuCumRapDto>;
}
export {};
