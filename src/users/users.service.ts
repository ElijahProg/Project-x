import { BadRequestException, Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {hash} from 'bcrypt'

@Injectable()
export class UsersService {
    logger: Logger;
    constructor(
        // @Inject(forwardRef(() => AuthService)) private authService: AuthService,
        @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
        
    ) {
        this.logger = new Logger(UsersService.name)
    }

    async find(query:any): Promise<any>{
        return await this.userModel.find(query).select('-password');
    }

    async findAuth(query:any):Promise<any>{
        return await this.userModel.findOne(query).select(['_id','email','password']);
    }
    async findOne(query: any): Promise<any> {
        return await this.userModel.findOne(query).select('-password, -__v');
    }
    async get(id:any):Promise<any>{
        return await this.userModel.findById(id).select(['-password','-__v'])
    }
    async post(createUserDto: CreateUserDto): Promise<UsersDocument> {
        try {
            const saltOrRounds = 10;
            const hashedPassword = await hash(createUserDto.password, saltOrRounds);
            const user = {
                password: hashedPassword,
                firstName: createUserDto.firstName,
                lastName: createUserDto.lastName,
                email: createUserDto.email
            }
            const newUser = new this.userModel(user);
            return await newUser.save()
        } catch (ex) {
            console.log(`Exception:${ex}`)
            throw new BadRequestException(`${ex}`)
        }

    }

    async update(query:any, updateUserDto: UpdateUserDto): Promise<UsersDocument>{
        try{
            this.logger.log('Updating User.')
            return this.userModel.findOneAndUpdate(query,updateUserDto,{
                new: true,
                upsert: true
            });
        }catch(ex)
        {
            this.logger.log(`exception:${ex}`)
            throw new BadRequestException(`Exception:${ex}`)
        }
    }
    
    async delete(query:any): Promise<any>{
        return this.userModel.findOneAndDelete(query)
    }
}