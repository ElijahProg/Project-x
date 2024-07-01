import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/users.schema';
@Module({
  imports: [AuthModule, UsersModule,
    MongooseModule.forRoot('mongodb://mongodb:27017',
      { 
        // useCreateusIndex: true,
        autoIndex: true,
        dbName: 'projectX',
       }), MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
