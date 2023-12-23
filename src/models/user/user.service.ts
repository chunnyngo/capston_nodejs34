
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
//  bcrypt
import * as bcrypt from 'bcrypt';
// prisma
import { NguoiDung, PrismaClient } from '@prisma/client';
import { CreateNguoiDungDto, LoaiNguoiDung, NguoiDungDto, UpdateNguoiDungDto, UpdateNguoiDungDtoAdmin } from './dto/user.dto';
import { nguoiDungSelectNoPass } from 'prisma/prisma-select';
import { PagiRes } from 'src/common/models/responseModel';
const prisma = new PrismaClient

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService
  ) { }

  // lay thong tin user bang email
  async getUserByEmail(email: string): Promise<NguoiDung> {
    const user = await prisma.nguoiDung.findFirst({
      where: { email, is_removed: false }
    })
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User with this email does not exist',
        error: { email },
      });
    }
    return user;
  }

  // them nguoi dung
  async createUser(userData: CreateNguoiDungDto) {
    const newUser = await prisma.nguoiDung.create({ data: userData })
    return newUser
  }
  // lay loai nguoi dung
  getUserRole() {
    return Object.values(LoaiNguoiDung)
  }
  // lay danh sach nguoi dung
  async getListUser(): Promise<NguoiDungDto[]> {
    return await prisma.nguoiDung.findMany({
      where: { is_removed: false },
      select: nguoiDungSelectNoPass
    })
  }
  // tim kiem nguoi dung theo ho ten
  async getUserByName(tuKhoa: string): Promise<NguoiDungDto[]> {
    return await prisma.nguoiDung.findMany({
      where: {
        ho_ten: { contains: tuKhoa },
        is_removed: false
      },
      select: nguoiDungSelectNoPass
    })
  }
  // tim kiem nguoi dung bang ho ten va phan trang
  async getUserPagination(tuKhoa: string, currentPage: number, itemsPerPage: number) {
    const [userList, totalItems] = await Promise.all([
      await prisma.nguoiDung.findMany({
        where: {
          ho_ten: { contains: tuKhoa },
          is_removed: false
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
        select: nguoiDungSelectNoPass
      }),
      prisma.nguoiDung.count({
        where: { ho_ten: { contains: tuKhoa }, is_removed: false }
      })
    ])
    return new PagiRes<NguoiDungDto>({
      currentPage,
      itemsPerPage,
      items: userList
    }).res()
  }
  // lay thong tin nguoi dung bang id
  async getUserById(id: number): Promise<NguoiDungDto | null> {
    return await prisma.nguoiDung.findFirst({
      where: { tai_khoan: id, is_removed: false },
      select: nguoiDungSelectNoPass
    })
  }
  // cap nhat thong tin nguoi dung (user)
  async updateUser(
    updateUserInput: UpdateNguoiDungDto,
    tai_khoan: number
  ) {
    const { matKhauMoi, emailMoi, ...userInfo } = updateUserInput
    if (matKhauMoi) {
      userInfo.mat_khau = bcrypt.hashSync(matKhauMoi, Number(this.configService.get('BCRYPT_SALT')))
    }
    if (emailMoi) {
      userInfo.email = emailMoi
    }
    const updateUser = await prisma.nguoiDung.update({
      where: { tai_khoan }, data: userInfo
    })
    delete updateUser.mat_khau
    delete updateUser.is_removed
    return updateUser
  }
  // cap nhat thong tin nguoi dung (admin)
  async updateUserAdmin(
    userInfo: UpdateNguoiDungDtoAdmin
  ): Promise<NguoiDungDto> {
    userInfo.mat_khau = bcrypt.hashSync(userInfo.mat_khau, Number(this.configService.get('BCRYPT_SALT')))
    const updateUser = await prisma.nguoiDung.update({
      where: { tai_khoan: userInfo.taiKhoan },
      data: userInfo
    })
    delete updateUser.mat_khau;
    delete updateUser.is_removed;
    return updateUser;
  }
  // xoa nguoi dung
  async deleteUser(tai_khoan: number) {
    await prisma.nguoiDung.delete({
      where: { tai_khoan }
    })
    return "deleted successfully"
  }

}
