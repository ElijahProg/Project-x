import { Module } from '@nestjs/common';
import { SaintController } from './saint.controller';

@Module({
  controllers: [SaintController]
})
export class SaintModule {}
