import {
    ApiProperty,
    ApiPropertyOptional,
    OmitType,
    PickType,
} from '@nestjs/swagger';

// import prisma model
import { DatVe } from '@prisma/client';

// import validator
import { Exclude, Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';

// import local DTO
import { NguoiDungDto } from 'src/models/user/dto/user.dto';
import { SeatDto, ScheduleDto } from 'src/models/theater/dto/theater.dto';
export class BookingEntity implements DatVe {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    tai_khoan: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_lich_chieu: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    ma_ghe: number;

    @Exclude()
    @IsBoolean()
    is_removed: boolean;

    @IsOptional()
    @ApiPropertyOptional()
    nguoiDung?: NguoiDungDto;

    @IsOptional()
    @ApiPropertyOptional()
    lichChieu?: ScheduleDto;

    @IsOptional()
    @ApiPropertyOptional()
    ghe?: SeatDto;
}

export class BookingDto extends OmitType(BookingEntity, ['is_removed']) { }
export class CreateBookingDto extends PickType(BookingEntity, [
    'ma_lich_chieu',
    'ma_ghe',
]) { }

// export class UserSeatDto extends PickType(BookingEntity, [
//   'taiKhoan',
//   'maGhe',
// ]) {}
// export class CreateManyBookingDto extends PickType(BookingEntity, [
//   'maLichChieu',
// ]) {
//   @IsArray()
//   @ArrayNotEmpty()
//   @ValidateNested({ each: true })
//   @Type(() => UserSeatDto)
//   @ApiProperty({ type: [UserSeatDto] })
//   danhSachVe: UserSeatDto[];
// }

export class CreateManyBookingDto extends PickType(BookingEntity, [
    'ma_lich_chieu',
]) {
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    @ApiProperty({ type: [Number] })
    danhSachGhe: number[];
}