import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { NguoiDungDto } from 'src/models/user/dto/user.dto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: NguoiDungDto): Promise<NguoiDungDto>;
}
export {};
