import { Request } from 'express';
import { NguoiDungDto } from 'src/models/user/dto/user.dto';
export interface RequestWithUser extends Request {
    user: NguoiDungDto;
}
export declare class PaginationQuery {
    tuKhoa: string;
    currentPage: number;
    itemsPerPage: number;
}
export declare class PaginationMovieQuery {
    tenPhim: string;
    currentPage: number;
    itemsPerPage: number;
    fromDate: string;
    toDate: string;
}
export declare class PaginationResDto<T> {
    currentPage: number;
    itemsOnThisPage: number;
    totalPages: number;
    totalItems: number;
    items: Array<T>;
}
export interface ResSuccess<T> {
    message: string;
    content: T;
}
