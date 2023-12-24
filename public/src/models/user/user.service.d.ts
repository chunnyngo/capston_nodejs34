import { ConfigService } from '@nestjs/config';
import { NguoiDung } from '@prisma/client';
import { CreateNguoiDungDto, LoaiNguoiDung, NguoiDungDto, UpdateNguoiDungDto, UpdateNguoiDungDtoAdmin } from './dto/user.dto';
export declare class UserService {
    private readonly configService;
    constructor(configService: ConfigService);
    getUserByEmail(email: string): Promise<NguoiDung>;
    createUser(userData: CreateNguoiDungDto): Promise<import("@prisma/client/runtime").GetResult<{
        tai_khoan: number;
        ho_ten: string;
        email: string;
        so_dt: string;
        mat_khau: string;
        loai_nguoi_dung: string;
        is_removed: boolean;
    }, unknown, never> & {}>;
    getUserRole(): LoaiNguoiDung[];
    getListUser(): Promise<NguoiDungDto[]>;
    getUserByName(tuKhoa: string): Promise<NguoiDungDto[]>;
    getUserPagination(tuKhoa: string, currentPage: number, itemsPerPage: number): Promise<{
        currentPage: number;
        itemsOnThisPage: number;
        totalPages: number;
        totalItems: number;
        items: NguoiDungDto[];
    }>;
    getUserById(id: number): Promise<NguoiDungDto | null>;
    updateUser(updateUserInput: UpdateNguoiDungDto, tai_khoan: number): Promise<import("@prisma/client/runtime").GetResult<{
        tai_khoan: number;
        ho_ten: string;
        email: string;
        so_dt: string;
        mat_khau: string;
        loai_nguoi_dung: string;
        is_removed: boolean;
    }, unknown, never> & {}>;
    updateUserAdmin(userInfo: UpdateNguoiDungDtoAdmin): Promise<NguoiDungDto>;
    deleteUser(tai_khoan: number): Promise<string>;
}
