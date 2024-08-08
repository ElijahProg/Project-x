import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/users.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { SaintModule } from './saint/saint.module';
import { LookupModule } from './lookup/lookup.module';
import { ChurchsModule } from './churchs/churchs.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    PassportModule.register({session:true}),
    MongooseModule.forRoot('mongodb://mongodb:27017',
      {
        // useCreateusIndex: true,
        autoIndex: true,
        dbName: 'projectX',
      }), MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    SaintModule,
    LookupModule,
    ChurchsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
