import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LookupService } from './lookup.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CreateLookupDto } from './dtos/create-lookup.dto';

@Controller('lookup')
export class LookupController {
    constructor(private lookupService: LookupService) { }

    @UseGuards(AuthenticatedGuard)
    @Get('')
    async findLookups(@Query() query: any) {
        return this.lookupService.find(query)
    }

    @UseGuards(AuthenticatedGuard)
    @Get(`:id`)
    async getLookup(@Param('id') id: any) {
        return this.lookupService.get(id)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('')
    @HttpCode(204)
    async postLookup(@Body() body: CreateLookupDto) {
        if (!body.name) throw new BadRequestException(`Path 'name' not found`)
        if (!body.type) throw new BadRequestException('Path `type` not found')
        if (!body.description) throw new BadRequestException('Path `description` not found')
        const newLookup = await this.lookupService.post(body)
        return newLookup
    }

    @UseGuards(AuthenticatedGuard)
    @Patch(':id')
    async patchLookup(@Body() body: any, @Param('id') id: any) {
        body.updatedAt = new Date();
        return await this.lookupService.patch(id, body)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    async deleteLookup(@Param('id') id: any) {
        return await this.lookupService.delete(id)
    }
}
