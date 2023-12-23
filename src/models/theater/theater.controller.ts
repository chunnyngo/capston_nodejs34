import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TheaterChainDto } from './dto/theater.dto';
import { TheaterService } from './theater.service';


@Controller('QuanLyRap')
@ApiTags('Quản lý rạp')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) { }
  @Get('LayThongTinHeThongRap')
  @ApiQuery({ name: 'maHeThongRap', required: false })
  async getTheatreChain(
    @Query('maHeThongRap') maHeThongRap: string,
  ): Promise<TheaterChainDto[]> {
    const maHeThong = maHeThongRap === '' ? undefined : maHeThongRap;
    return await this.theaterService.getTheaterChain(maHeThong);
  }
  @Get('LayThongTinCumRap/:maHeThongRap')
  async getTheatreList(@Param('maHeThongRap') maHeThongRap: string) {
    return await this.theaterService.getTheaterList(maHeThongRap);
  }
  @Get('LayThongTinLichChieuTheoHeThongRap')
  @ApiQuery({ name: 'maHeThongRap', required: false })
  async getScheduleByChain(@Query('maHeThongRap') maHeThongRap: string) {
    const maHeThong = maHeThongRap === '' ? undefined : maHeThongRap;
    return await this.theaterService.getShowTimeByChain(maHeThong);
  }

}
