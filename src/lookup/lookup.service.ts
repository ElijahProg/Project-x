import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lookups, LookupsDocument } from './lookup.schema';
import { Model } from 'mongoose';
import { CreateLookupDto } from './dtos/create-lookup.dto';
import { SaintsDocument } from 'src/saint/saint.schema';

@Injectable()
export class LookupService {
    logger: Logger;
    constructor(
        @InjectModel(Lookups.name) private readonly lookupsModel: Model<LookupsDocument>
    ) { this.logger = new Logger(LookupService.name) }

    async find(query: any): Promise<any> {
        return await this.lookupsModel.find(query);
    }

    async get(id: any): Promise<any> {
        return await this.lookupsModel.findById(id);
    }

    async post(createDataDto: CreateLookupDto): Promise<LookupsDocument> {
        try {
            const newLookup = new this.lookupsModel(createDataDto)
            return await newLookup.save()
        } catch (ex) {
            this.logger.log(`Exception:${ex}`)
            throw new BadRequestException(ex)
        }
    }

    async patch(id: any, data: any): Promise<SaintsDocument> {
        try {
            const patchedData = await this.lookupsModel.findByIdAndUpdate(id, data)
            return await this.lookupsModel.findById(id).select('-__v');
        } catch (ex) {
            this.logger.log(`Exception:$ex`)
            throw new BadRequestException(ex)
        }
    }

    async delete(id: any): Promise<any> {
        return this.lookupsModel.findByIdAndDelete(id)
    }
}
