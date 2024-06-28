import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from 'src/users/users.schema';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UsersDocument>, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ email: username });
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null
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
}
