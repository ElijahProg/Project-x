import { Module } from '@nestjs/common';
import { LookupService } from './lookup.service';
import { LookupController } from './lookup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lookups, LookupsSchema } from './lookup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lookups.name, schema: LookupsSchema }])
  ],
  providers: [LookupService],
  controllers: [LookupController],
  exports: [LookupService]
})
export class LookupModule { }
