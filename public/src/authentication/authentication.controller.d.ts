import { AuthenticationService } from './authentication.service';
import { CreateNguoiDungDto, LoginInfoDto } from 'src/models/user/dto/user.dto';
export declare class AuthenticationController {
    private readonly authService;
    constructor(authService: AuthenticationService);
    login(body: LoginInfoDto): Promise<{
        Authorization: string;
    }>;
    register(newUser: CreateNguoiDungDto): Promise<string>;
}
