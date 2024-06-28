import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    
    constructor (@InjectModel(User.name) private readonly userModel:Model <UsersDocument>){}


    async post (createUserDto: CreateUserDto): Promise<UsersDocument>{
        const newUser = await new this.userModel(createUserDto);
        return newUser.save()
    }
}