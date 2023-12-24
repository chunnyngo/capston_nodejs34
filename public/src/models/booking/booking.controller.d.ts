import { BookingService } from './booking.service';
import { CreateScheduleDto } from '../theater/dto/theater.dto';
import { RequestWithUser } from 'src/dto/common.dto';
import { CreateManyBookingDto } from './dto/booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    bookTicket({ user }: RequestWithUser, bookingInfo: CreateManyBookingDto): Promise<string>;
    getSeatBySchedule(maLichChieu: number): Promise<{
        ma_lich_chieu: number;
        ten_cum_rap: string;
        dia_chi: string;
        ten_rap: string;
        ten_phim: string;
        hinh_anh: string;
        ngay_gio_chieu: string;
        danhSachGhe: {
            daDat: boolean;
            taiKhoan: number;
            ma_ghe: number;
            ten_ghe: string;
            loai_ghe: string;
            ma_rap: number;
            gia_ve: number;
        }[];
    }>;
    createSchedule(scheduleInfo: CreateScheduleDto): Promise<{
        ma_lich_chieu: number;
        ma_rap: number;
        ma_phim: number;
        ngay_gio_chieu: string;
    }>;
}
