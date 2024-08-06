import { Module } from '@nestjs/common';
import { SaintController } from './saint.controller';
import { SaintsService } from './saint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Saints, SaintsSchema } from './saint.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Saints.name, schema: SaintsSchema}])
  ],
  controllers: [SaintController],
  providers: [SaintsService],
  exports:[SaintsService]
})
export class SaintModule {}
