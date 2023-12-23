import { SetMetadata } from '@nestjs/common';
import { LoaiNguoiDung } from 'src/models/user/dto/user.dto';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: LoaiNguoiDung[]) =>
    SetMetadata(ROLES_KEY, roles);