import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateNguoiDungDto, LoginInfoDto } from 'src/models/user/dto/user.dto';
// import Swagger
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Authentication")
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) { }
  @HttpCode(200)
  @Post('DangNhap')
  async login(@Body() body: LoginInfoDto): Promise<{ Authorization: string }> {
    const user = await this.authService.validateUser(body);
    const Authorization = await this.authService.login(user);
    return { Authorization };
  }

  @Post('DangKy')
  async register(@Body() newUser: CreateNguoiDungDto): Promise<string> {
    return this.authService.register(newUser);
  }
}
