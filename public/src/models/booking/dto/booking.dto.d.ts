import { DatVe } from '@prisma/client';
import { NguoiDungDto } from 'src/models/user/dto/user.dto';
import { SeatDto, ScheduleDto } from 'src/models/theater/dto/theater.dto';
export declare class BookingEntity implements DatVe {
    tai_khoan: number;
    ma_lich_chieu: number;
    ma_ghe: number;
    is_removed: boolean;
    nguoiDung?: NguoiDungDto;
    lichChieu?: ScheduleDto;
    ghe?: SeatDto;
}
declare const BookingDto_base: import("@nestjs/common").Type<Omit<BookingEntity, "is_removed">>;
export declare class BookingDto extends BookingDto_base {
}
declare const CreateBookingDto_base: import("@nestjs/common").Type<Pick<BookingEntity, "ma_lich_chieu" | "ma_ghe">>;
export declare class CreateBookingDto extends CreateBookingDto_base {
}
declare const CreateManyBookingDto_base: import("@nestjs/common").Type<Pick<BookingEntity, "ma_lich_chieu">>;
export declare class CreateManyBookingDto extends CreateManyBookingDto_base {
    danhSachGhe: number[];
}
export {};
