import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {compare} from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findAuth({ email: email });
        if (!user) throw new NotAcceptableException('could not find the user')
        const passwordValid = await compare(password,user.password);//.compare(password, user.password);
        if (user && passwordValid) {
            return { userName: user.firstName + " " + user.lastName }
        } else throw new UnauthorizedException(' Invalid username and/or password')
    }
}
