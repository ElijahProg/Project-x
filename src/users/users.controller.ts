import { BadRequestException, Request,Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
// import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
    logger: Logger;
    constructor(
        private userService: UsersService) { }

    @Post('signup')
    async addUser(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto.firstName) throw new BadRequestException('Path `firstName` not found!!')
        if (!createUserDto.lastName) throw new BadRequestException('Path `lastName` not found!!')
        if (!createUserDto.email) throw new BadRequestException('Path `email` not found!!')
        if (!createUserDto.password) throw new BadRequestException('Path `password` not found!!')
        const newUser = await this.userService.post(createUserDto);
        return { _id: "newUser._id" }
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        return req.user
    }
    @UseGuards(AuthenticatedGuard)
    @Get('')
     async getHello(@Request() req) {
        const users = await this.userService.find(req.body);
        console.log(users)
        return users;
      }
}
