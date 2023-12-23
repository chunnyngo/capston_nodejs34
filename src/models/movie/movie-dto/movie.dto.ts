import {
    ApiProperty,
    ApiPropertyOptional,
    OmitType,
    PartialType
} from '@nestjs/swagger'
// prisma class
import { Banner, Phim } from '@prisma/client'
// class-validator, class-transformer
import { Exclude } from 'class-transformer'
import {
    IsBoolean,
    IsString,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsOptional,
    Max,
    Min
} from 'class-validator'

import { Opposite } from 'src/common/decorators/opposite.decorator'

export class MovieEntity implements Phim {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_phim: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ten_phim: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    trailer: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    hinh_anh: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    mo_ta: string;

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    ngay_khoi_chieu: string;

    @IsInt()
    @Min(0)
    @Max(10)
    @IsOptional()
    @ApiPropertyOptional()
    danh_gia: number;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    hot: boolean;

    @IsBoolean()
    @ApiProperty({ default: false })
    dang_chieu: boolean;

    @IsBoolean()
    @ApiProperty({ default: true })
    @Opposite(MovieEntity, (s) => s.dang_chieu)
    sap_chieu: boolean;

    @Exclude()
    @IsBoolean()
    is_removed: boolean;
}
export class BannerEntity implements Banner {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_banner: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_phim: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    hinh_anh: string;

    @Exclude()
    is_removed: boolean;
}
export class BannerDto extends OmitType(BannerEntity, ['is_removed']) { }
export class MovieDto extends OmitType(MovieEntity, ['is_removed']) { }
export class CreateMovieDto extends OmitType(MovieEntity, [
    'is_removed',
    'ma_phim',
]) { }
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_phim: number;
}

