import { LoaiNguoiDung } from 'src/models/user/dto/user.dto';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: LoaiNguoiDung[]) => import("@nestjs/common").CustomDecorator<string>;
