import {
    ConflictException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import local service
import { UserService } from '../models/user/user.service';
// import prisma
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
const prisma = new PrismaClient();
// import local DTO
import { CreateNguoiDungDto, CreateNguoiDungDtoAdmin, LoginInfoDto, NguoiDungDto } from 'src/models/user/dto/user.dto';
import { ResSuccess } from 'src/dto/common.dto';
// import bcrypt
import * as bcrypt from 'bcrypt';
// import error codes
import { prismaErrorCodes } from '../common/constants/prismaErrorCode.enum';
@Injectable()
export class AuthenticationService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }
    // USER VALIDATION - Is email and password correct
    async validateUser({ email, mat_khau }: LoginInfoDto): Promise<NguoiDungDto> {
        const user = await this.userService.getUserByEmail(email);

        const checkPass = bcrypt.compareSync(mat_khau, user.mat_khau);
        if (checkPass) {
            const { mat_khau: password, is_removed, ...result } = user;
            return result;
        }

        throw new UnauthorizedException('Incorrect Password');
    }

    // USER LOGIN - Create authtoken
    async login(user: NguoiDungDto): Promise<string> {
        return this.jwtService.sign(user);
    }

    // USER REGISTER - Check existance and Create new user
    async register(
        registerData: CreateNguoiDungDto | CreateNguoiDungDtoAdmin,
    ): Promise<string> {
        try {
            const hashedPass = bcrypt.hashSync(
                registerData.mat_khau,
                Number(this.configService.get('BCRYPT_SALT')),
            );
            await this.userService.createUser({
                ...registerData,
                mat_khau: hashedPass,
            });
            return 'User created successfully';
        } catch (err) {
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === prismaErrorCodes.unique
            ) {
                throw new ConflictException({
                    statusCode: HttpStatus.CONFLICT,
                    message: 'User with this email has already been existed.',
                    error: err.meta ? err.meta : registerData,
                });
            }
            throw err;
        }
    }
}
