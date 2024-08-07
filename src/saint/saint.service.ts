import { Injectable, Logger } from '@nestjs/common';
import { Saints, SaintsDocument } from './saint.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSaintDto } from './dtos/create-saint.dto';

@Injectable()
export class SaintsService {
    logger: Logger;
    constructor(
        @InjectModel(Saints.name) private readonly saintModel: Model<SaintsDocument>
    ){
        this.logger = new Logger(SaintsService.name)
    }

    async find(query:any): Promise<any>{
        return await this.saintModel.find(query);
    }

    async get(id:any):Promise<any>{
        return await this.saintModel.findById(id);
    }
    
    async post(createDataDto: CreateSaintDto): Promise<SaintsDocument>{
        try{
            const newSaint = new this.saintModel(createDataDto)
            return await newSaint.save();
        }catch(ex){
            this.logger.log(`Exception:${ex}`)
        }
    }

    async patch(id:any, patchData:any): Promise<SaintsDocument>{
        try{
            const patchedData = await this.saintModel.findByIdAndUpdate(id,patchData);
            return await this.saintModel.findById(id).select('-__v');
        }catch(ex){
            this.logger.log(`Exception:${ex}`)
        }
    }
    
    async delete(id:any): Promise<any>{
        return this.saintModel.findByIdAndDelete(id)
    }

}
