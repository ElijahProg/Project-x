import { BadRequestException, Post, Patch, Body, Put, Controller, Get, HttpCode, Logger, Param, Request, UseGuards, Delete, Query } from '@nestjs/common';
import { SaintsService } from './saint.service';
import { CreateSaintDto } from './create-saint.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('saint')
export class SaintController {
    logger: Logger;
    constructor(
        private saintService : SaintsService
    ){
        this.logger = new Logger(SaintsService.name)
    }
    @UseGuards(AuthenticatedGuard)
    @Get('/')
    async findSaint(@Query() request:any){
        return this.saintService.find(request)
    }

    @UseGuards(AuthenticatedGuard)
    @Get(`:id`)
    async getSaint(@Param('id') id:any){
        return this.saintService.get(id);
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/')
    @HttpCode(204)
    async postSaint(@Body() body:CreateSaintDto){
        if(!body.fullName) throw new BadRequestException(`Path 'fullName' not found`);
        if(!body.picture) throw new BadRequestException(`Path 'picture' not found`);
        if(!body.description) throw new BadRequestException(`Path 'description' not found`);
        const newSaint = await this.saintService.post(body);
        return newSaint
    }

    @UseGuards(AuthenticatedGuard)
    @Patch(':id')
    async putSaint(@Body() body:any,@Param('id') id:any){
        return await this.saintService.patch(id,body);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    async deleteSaint(@Param('id') id:any){
        return await this.saintService.delete(id);
    }

}
