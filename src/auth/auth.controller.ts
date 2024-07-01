import { Body, Request, Controller, Post, UseGuards, Get, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService) { }


    @Get('/check')
    getHello(): string {
        return "check"
    }

    @Post('/add-user')
    async addUser(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto.firstName) throw new BadRequestException('Path `firstName` not found!!')
        if (!createUserDto.lastName) throw new BadRequestException('Path `lastName` not found!!')
        if (!createUserDto.email) throw new BadRequestException('Path `email` not found!!')
        if (!createUserDto.password) throw new BadRequestException('Path `password` not found!!')
        const newUser = await this.userService.post(createUserDto);
        return { _id: newUser._id }
    }

    // @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Request() req) {
        const {email,password} = req.body
        const loginResult = this.authService.validateUser(email,password)
        return loginResult
    }
}
