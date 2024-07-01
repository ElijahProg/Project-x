import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    
    constructor (@InjectModel(User.name) private readonly userModel:Model <UsersDocument>){}


    async post (createUserDto: CreateUserDto): Promise<UsersDocument>{
        try{
            const newUser = new this.userModel(createUserDto);
            return await newUser.save()
        }catch(ex){
            console.log(`Exception:${ex}`)
            throw new BadRequestException(`there is user with this email:${ex}`)
        }
        
    }
}