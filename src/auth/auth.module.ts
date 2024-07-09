import { Module, forwardRef } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';

// import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/users/users.module';

@Module({

  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({

      secret: jwtConstants.secret,

      signOptions: { expiresIn: '60s' }

    })

  ],

  // providers: [JwtStrategy],
  providers: [],
  exports: [JwtModule, PassportModule]

})

export class AuthModule { }