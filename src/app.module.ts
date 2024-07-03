import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/users.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule, UsersModule,
    MongooseModule.forRoot('mongodb://mongodb:27017',
      { 
        // useCreateusIndex: true,
        autoIndex: true,
        dbName: 'projectX',
       }), MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
       PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
