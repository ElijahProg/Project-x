import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from 'src/users/users.schema';
import {bcrypt} from 'bcrypt'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UsersDocument>, 
        @Inject(forwardRef(() => UsersService)) private userService: UsersService,
        private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        console.log(username)
        const user = await this.userModel.findOne({ email: username });
        console.log(user.password+" "+pass)
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException("Invalid username and/or password")
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user._id, name: user.firstName + " "+user.lastName }
        return {
            message: "Successfully completed operation",
            data: {
                firstName: user._doc.firstName,
                lastName: user._doc.lastName,
                email: user._doc.email,
                token: this.jwtService.sign(payload)
            }
        }
    }

    async getHashedPassword(password: string): Promise<any>{
        return new Promise((resolve,reject)=>{
            bcrypt.hash(password,10,(err, hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    }
}
