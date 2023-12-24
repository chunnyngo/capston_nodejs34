import { NguoiDung } from '@prisma/client';
export declare enum LoaiNguoiDung {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    USER = "USER"
}
export declare class NguoiDungEntity implements NguoiDung {
    tai_khoan: number;
    email: string;
    mat_khau: string;
    ho_ten: string;
    so_dt: string;
    loai_nguoi_dung: string;
    is_removed: boolean;
}
declare const LoginInfoDto_base: import("@nestjs/common").Type<Pick<NguoiDungEntity, "email" | "mat_khau">>;
export declare class LoginInfoDto extends LoginInfoDto_base {
}
declare const NguoiDungDto_base: import("@nestjs/common").Type<Omit<NguoiDungEntity, "mat_khau" | "is_removed">>;
export declare class NguoiDungDto extends NguoiDungDto_base {
}
declare const CreateNguoiDungDto_base: import("@nestjs/common").Type<Omit<NguoiDungEntity, "tai_khoan" | "loai_nguoi_dung" | "is_removed">>;
export declare class CreateNguoiDungDto extends CreateNguoiDungDto_base {
}
declare const UpdateNguoiDungDto_base: import("@nestjs/common").Type<Pick<NguoiDungEntity, "email" | "mat_khau">>;
export declare class UpdateNguoiDungDto extends UpdateNguoiDungDto_base {
    hoTen?: string;
    soDT?: string;
    emailMoi?: string;
    matKhauMoi?: string;
}
declare const CreateNguoiDungDtoAdmin_base: import("@nestjs/common").Type<Omit<NguoiDungEntity, "tai_khoan" | "is_removed">>;
export declare class CreateNguoiDungDtoAdmin extends CreateNguoiDungDtoAdmin_base {
}
declare const UpdateNguoiDungDtoAdminAll_base: import("@nestjs/common").Type<Omit<NguoiDungEntity, "tai_khoan" | "is_removed">>;
export declare class UpdateNguoiDungDtoAdminAll extends UpdateNguoiDungDtoAdminAll_base {
}
declare const UpdateNguoiDungDtoAdmin_base: import("@nestjs/common").Type<Partial<UpdateNguoiDungDtoAdminAll>>;
export declare class UpdateNguoiDungDtoAdmin extends UpdateNguoiDungDtoAdmin_base {
    taiKhoan: number;
}
export {};
