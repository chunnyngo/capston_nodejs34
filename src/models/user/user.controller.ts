import { Controller, Get, Post, Req, Body, Param, Delete, UseGuards, Query, Put, DefaultValuePipe, ParseIntPipe, ConflictException, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthenticationService } from 'src/authentication/authentication.service';
//local DTO
import { NguoiDungDto, LoaiNguoiDung, CreateNguoiDungDtoAdmin, UpdateNguoiDungDtoAdmin, UpdateNguoiDungDto } from './dto/user.dto';
import { RequestWithUser, PaginationQuery, PaginationResDto } from 'src/dto/common.dto';
// local decorators
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('QuanLyNguoiDung')
@ApiTags('Quản lí người dùng')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(LoaiNguoiDung.ADMIN)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthenticationService
  ) { }
  @Get('layDanhSachNguoiDung')
  async getUserList(): Promise<NguoiDungDto[]> {
    return await this.userService.getListUser()
  }

  @Get('LayDanhSachLoaiNguoiDung')
  getUserRoles(): LoaiNguoiDung[] {
    return this.userService.getUserRole();
  }

  @Get('TimKiemNguoiDung')
  @ApiQuery({ name: 'tuKhoa', required: false })
  async getUserByName(
    @Query('tuKhoa', new DefaultValuePipe('')) tuKhoa: string,
  ): Promise<NguoiDungDto[]> {
    return await this.userService.getUserByName(tuKhoa);
  }

  @Get('TimKiemNguoiDungPhanTrang')
  async getUsersPagination(
    @Query()
    { tuKhoa, currentPage, itemsPerPage }: PaginationQuery,
  ): Promise<PaginationResDto<NguoiDungDto>> {
    return this.userService.getUserPagination(
      tuKhoa,
      currentPage,
      itemsPerPage,
    );
  }

  @Get('ThongTinTaiKhoan')
  @Roles(LoaiNguoiDung.USER, LoaiNguoiDung.ADMIN)
  getUserInfo(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get('LayThongTinNguoiDung/:taiKhoan')
  async getUserInfoById(
    @Param('taiKhoan', ParseIntPipe) tai_khoan: number,
  ): Promise<NguoiDungDto> {
    const user = await this.userService.getUserById(tai_khoan);
    if (user) {
      return user;
    }
    throw new NotFoundException('User does not exist');
  }

  @Post('ThemNguoiDung')
  async addUser(@Body() userInfo: CreateNguoiDungDtoAdmin) {
    //return await this.authService.register(userInfo);
  }

  @Put('CapNhatThongTinNguoiDung')
  async updateUser(
    @Req() req: RequestWithUser,
    @Body() body: UpdateNguoiDungDto,
  ): Promise<NguoiDungDto> {
    const { tai_khoan, email } = req.user;
    if (email !== body.email) {
      throw new ConflictException(
        'Email does not match with the provide token',
      );
    }
    await this.authService.validateUser({ email, mat_khau: body.mat_khau });
    return await this.userService.updateUser(body, tai_khoan);
  }

  @Put('CapNhatThongTinNguoiDungAdmin')
  async updateUserAdmin(
    @Body() body: UpdateNguoiDungDtoAdmin,
  ): Promise<NguoiDungDto> {
    return await this.userService.updateUserAdmin(body);
  }

  @Delete('XoaNguoiDung/:taiKhoan')
  async deleteUser(
    @Param('taiKhoan', ParseIntPipe) taiKhoan: number,
  ): Promise<string> {
    return await this.userService.deleteUser(taiKhoan);
  }
}
