import { Module } from '@nestjs/common';
import { ChurchsService } from './churchs.service';
import { ChurchsController } from './churchs.controller';

@Module({
  providers: [ChurchsService],
  controllers: [ChurchsController]
})
export class ChurchsModule {}
