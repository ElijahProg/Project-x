import { Body,Request, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (
        private userService: UsersService,
        private authService: AuthService){}
    
        @Post('/add-user')
        async addUser(@Body() createUserDto: CreateUserDto){
            const newUser = await this.userService.post(createUserDto);
            return newUser
        }

        @UseGuards(LocalAuthGuard)
        @Post('/login')
        async login(@Request() req){
            const loginResult = this.authService.login(req.user)
            return loginResult
        }
}
