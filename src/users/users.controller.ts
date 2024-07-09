import { BadRequestException, Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    logger: Logger;
    constructor(
        private userService: UsersService,
        private authService: AuthService) { }

        @Post('add-user')
    async addUser(@Body() createUserDto: CreateUserDto) {
        console.log('add user')
        if (!createUserDto.firstName) throw new BadRequestException('Path `firstName` not found!!')
        if (!createUserDto.lastName) throw new BadRequestException('Path `lastName` not found!!')
        if (!createUserDto.email) throw new BadRequestException('Path `email` not found!!')
        if (!createUserDto.password) throw new BadRequestException('Path `password` not found!!')
        const newUser = await this.userService.post(createUserDto);
        return { _id: newUser._id }
    }
}
