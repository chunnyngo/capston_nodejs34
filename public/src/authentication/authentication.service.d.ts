import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../models/user/user.service';
import { CreateNguoiDungDto, CreateNguoiDungDtoAdmin, LoginInfoDto, NguoiDungDto } from 'src/models/user/dto/user.dto';
export declare class AuthenticationService {
    private readonly configService;
    private readonly jwtService;
    private readonly userService;
    constructor(configService: ConfigService, jwtService: JwtService, userService: UserService);
    validateUser({ email, mat_khau }: LoginInfoDto): Promise<NguoiDungDto>;
    login(user: NguoiDungDto): Promise<string>;
    register(registerData: CreateNguoiDungDto | CreateNguoiDungDtoAdmin): Promise<string>;
}
