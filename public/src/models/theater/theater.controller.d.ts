import { TheaterChainDto } from './dto/theater.dto';
import { TheaterService } from './theater.service';
export declare class TheaterController {
    private readonly theaterService;
    constructor(theaterService: TheaterService);
    getTheatreChain(maHeThongRap: string): Promise<TheaterChainDto[]>;
    getTheatreList(maHeThongRap: string): Promise<{
        ma_cum_rap: string;
        ten_cum_rap: string;
        dia_chi: string;
        RapPhim: {
            ma_rap: number;
            ten_rap: string;
        }[];
    }[]>;
    getScheduleByChain(maHeThongRap: string): Promise<{
        maHeThongRap: string;
        tenHeThongRap: string;
        logo: string;
        cumRap: {
            maCumRap: string;
            tenCumRap: string;
            diaChi: string;
            phim: {
                lichChieuPhim: {
                    maLichChieu: number;
                    maRap: number;
                    tenRap: string;
                    ngayGioChieu: string;
                }[];
                ma_phim: number;
                ten_phim: string;
                trailer: string;
                hinh_anh: string;
                mo_ta: string;
                ngay_khoi_chieu: string;
                danh_gia: number;
                hot: boolean;
                dang_chieu: boolean;
                sap_chieu: boolean;
            }[];
        }[];
    }[]>;
}
