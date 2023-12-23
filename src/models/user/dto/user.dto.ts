import {
    ApiProperty,
    ApiPropertyOptional,
    OmitType,
    PartialType,
    PickType,
} from '@nestjs/swagger';
import { NguoiDung } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import {
    IsNumber,
    IsEmail,
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
} from 'class-validator';

export enum LoaiNguoiDung {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    USER = 'USER',
}

@Exclude()
export class NguoiDungEntity implements NguoiDung {
    @IsNumber()
    @ApiProperty()
    @Expose()
    tai_khoan: number;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    @Expose()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    mat_khau: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Expose()
    ho_ten: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Expose()
    so_dt: string;

    @IsEnum(LoaiNguoiDung)
    @IsNotEmpty()
    @ApiProperty()
    @Expose()
    loai_nguoi_dung: string;

    @Exclude()
    is_removed: boolean;
}

export class LoginInfoDto extends PickType(NguoiDungEntity, [
    'email',
    'mat_khau',
]) { }

export class NguoiDungDto extends OmitType(NguoiDungEntity, [
    'mat_khau',
    'is_removed',
]) { }

export class CreateNguoiDungDto extends OmitType(NguoiDungEntity, [
    'tai_khoan',
    'loai_nguoi_dung',
    'is_removed',
]) { }

export class UpdateNguoiDungDto extends PickType(NguoiDungEntity, [
    'email',
    'mat_khau',
]) {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    hoTen?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    soDT?: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @ApiPropertyOptional()
    emailMoi?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    matKhauMoi?: string;
}

export class CreateNguoiDungDtoAdmin extends OmitType(NguoiDungEntity, [
    'tai_khoan',
    'is_removed',
]) { }

export class UpdateNguoiDungDtoAdminAll extends OmitType(NguoiDungEntity, [
    'tai_khoan',
    'is_removed',
]) { }
export class UpdateNguoiDungDtoAdmin extends PartialType(
    UpdateNguoiDungDtoAdminAll,
) {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    @Expose()
    taiKhoan: number;
}