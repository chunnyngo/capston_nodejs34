import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from './models/user/user.module';
import { MovieModule } from './models/movie/movie.module';
import { BookingModule } from './models/booking/booking.module';
import { TheaterModule } from './models/theater/theater.module';
import { AuthenticationModule } from './authentication/authentication.module';
// import local filter
import { HttpExceptionFilter } from './common/exceptions/http-exceptions.filter';
import { PrismaClientExceptionFilter } from './common/exceptions/prisma-client-exceptions.filter';
// import local controllers
import { AppController } from './app.controller';

// import local services
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [UserModule, MovieModule, BookingModule, TheaterModule, AuthenticationModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },],
})
export class AppModule { }
