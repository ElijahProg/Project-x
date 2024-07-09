import { BadRequestException, Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    logger: Logger;
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
        @Inject(forwardRef(() => AuthService))
        private AuthService: AuthService
    ) {
        this.logger = new Logger(UsersService.name)
    }

    async findOne(query: any): Promise<any> {
        return await this.userModel.findOne(query).select('+password');
    }



    async post(createUserDto: CreateUserDto): Promise<UsersDocument> {
        try {
            this.logger.log('Creating user.');
            const hashedPassword = await this.AuthService.getHashedPassword(
                createUserDto.password
            );
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
            throw new BadRequestException(`there is user with this email:${ex}`)
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