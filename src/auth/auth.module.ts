import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from './local.strateg';

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
  UsersModule, 
  PassportModule,
  JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '60s' },
})],
  controllers: [AuthController],
  providers: [AuthService,UsersService,LocalStrategy]
})
export class AuthModule {}
