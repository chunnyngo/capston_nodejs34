import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { LoaiNguoiDung } from '../user/dto/user.dto';
import { CreateScheduleDto } from '../theater/dto/theater.dto';
import { RequestWithUser } from 'src/dto/common.dto';
import { CreateManyBookingDto } from './dto/booking.dto';


import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
@Controller('QuanLyDatVe')
@ApiTags('Quản lý đặt vé')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post('DatVe')
  @Roles(LoaiNguoiDung.USER, LoaiNguoiDung.ADMIN)
  async bookTicket(
    @Req() { user }: RequestWithUser,
    @Body() bookingInfo: CreateManyBookingDto,
  ): Promise<string> {
    return await this.bookingService.bookTicket(bookingInfo, user.tai_khoan);
  }

  @Get('LayDanhSachGheTheoLichChieu/:maLichChieu')
  @Roles(LoaiNguoiDung.USER, LoaiNguoiDung.ADMIN)
  async getSeatBySchedule(
    @Param('maLichChieu', ParseIntPipe) maLichChieu: number,
  ) {
    return await this.bookingService.getSeatBySchedule(maLichChieu);
  }

  @Post('TaoLichChieu')
  @Roles(LoaiNguoiDung.ADMIN)
  async createSchedule(@Body() scheduleInfo: CreateScheduleDto) {
    return await this.bookingService.createSchedule(scheduleInfo);
  }
}
