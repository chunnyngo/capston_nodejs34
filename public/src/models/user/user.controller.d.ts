import { UserService } from './user.service';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { NguoiDungDto, LoaiNguoiDung, CreateNguoiDungDtoAdmin, UpdateNguoiDungDtoAdmin, UpdateNguoiDungDto } from './dto/user.dto';
import { RequestWithUser, PaginationQuery, PaginationResDto } from 'src/dto/common.dto';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthenticationService);
    getUserList(): Promise<NguoiDungDto[]>;
    getUserRoles(): LoaiNguoiDung[];
    getUserByName(tuKhoa: string): Promise<NguoiDungDto[]>;
    getUsersPagination({ tuKhoa, currentPage, itemsPerPage }: PaginationQuery): Promise<PaginationResDto<NguoiDungDto>>;
    getUserInfo(req: RequestWithUser): NguoiDungDto;
    getUserInfoById(tai_khoan: number): Promise<NguoiDungDto>;
    addUser(userInfo: CreateNguoiDungDtoAdmin): Promise<void>;
    updateUser(req: RequestWithUser, body: UpdateNguoiDungDto): Promise<NguoiDungDto>;
    updateUserAdmin(body: UpdateNguoiDungDtoAdmin): Promise<NguoiDungDto>;
    deleteUser(taiKhoan: number): Promise<string>;
}
