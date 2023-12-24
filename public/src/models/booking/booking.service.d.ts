import { CreateManyBookingDto } from './dto/booking.dto';
import { CreateScheduleDto } from '../theater/dto/theater.dto';
export declare class BookingService {
    bookTicket(bookingInfo: CreateManyBookingDto, taiKhoan: number): Promise<string>;
    getSeatBySchedule(ma_lich_chieu: number): Promise<{
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
