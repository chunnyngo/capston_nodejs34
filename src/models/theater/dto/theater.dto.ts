import {
    ApiProperty,
    ApiPropertyOptional,
    OmitType,
    PickType,
} from '@nestjs/swagger';

// import prisma
import { CumRap, Ghe, HeThongRap, LichChieu, RapPhim } from '@prisma/client';

// import local DTO
import { MovieDto } from '../../../dto/index.dto';

// import validator and transformer
import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class TheaterChainEntity implements HeThongRap {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ma_he_thong_rap: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ten_he_thong_rap: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    logo: string;

    @IsOptional()
    @ApiPropertyOptional()
    cum_rap?: TheaterDto[];

    @Exclude()
    @IsBoolean()
    is_removed: boolean;
}

export class TheaterEntity implements CumRap {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ma_cum_rap: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ten_cum_rap: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    dia_chi: string;

    @IsOptional()
    @ApiPropertyOptional()
    rap_phim?: TheaterRoomDto[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ma_he_thong_rap: string;

    @Exclude()
    @IsBoolean()
    is_removed: boolean;
}

export class TheaterRoomEntity implements RapPhim {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_rap: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ten_rap: string;

    @IsOptional()
    @ApiPropertyOptional()
    ghe?: SeatDto[];

    @IsOptional()
    @ApiPropertyOptional()
    lich_chieu?: ScheduleDto[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ma_cum_rap: string;

    @Exclude()
    @IsBoolean()
    is_removed: boolean;
}
export class TheaterRoomDto extends OmitType(TheaterRoomEntity, [
    'is_removed',
]) { }

export class ScheduleEntity implements LichChieu {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_lich_chieu: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_rap: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_phim: number;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    ngay_gio_chieu: string;

    @IsOptional()
    @ApiPropertyOptional()
    rap_phim?: TheaterRoomDto;

    @IsOptional()
    @ApiPropertyOptional()
    phim?: MovieDto;

    @Exclude()
    @IsBoolean()
    is_removed: boolean;
}

export class SeatEntity implements Ghe {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_ghe: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ten_ghe: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    loai_ghe: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_rap: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    gia_ve: number;

    @Exclude()
    @IsBoolean()
    is_removed: boolean;
}

export class TheaterChainDto extends OmitType(TheaterChainEntity, [
    'is_removed',
]) { }

export class TheaterDto extends OmitType(TheaterEntity, ['is_removed']) { }

export class ScheduleDto extends OmitType(ScheduleEntity, ['is_removed']) { }
export class ScheduleOutputDto extends PickType(ScheduleEntity, [
    'ma_lich_chieu',
    'ma_rap',
    'ngay_gio_chieu',
]) {
    tenRap: string;
}
export class CreateScheduleDto extends OmitType(ScheduleEntity, [
    'ma_lich_chieu',
    'rap_phim',
    'phim',
    'is_removed',
]) { }

export class SeatDto extends OmitType(SeatEntity, ['is_removed']) { }

export class lichChieuCumRapRawDto {
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
export class lichChieuCumRapDto {
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
export class lichChieuPhimRawDto {
    ma_he_thong_rap: string;
    ten_he_thong_rap: string;
    logo: string;
    cum_rap: Array<lichChieuCumRapRawDto>;
}
export class lichChieuPhimDto {
    ma_he_thong_rap: string;
    ten_he_thong_rap: string;
    logo: string;
    cum_rap: Array<lichChieuCumRapDto>;
}
