import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  logger: Logger
  constructor(private readonly appService: AppService) {}

  @Get('/init')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/checker')
  checker(): string{
    return "checker"
  }
}
