import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule.register({session:true})],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule { }
