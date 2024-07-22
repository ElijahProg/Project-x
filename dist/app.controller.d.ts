import { Logger } from '@nestjs/common';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    logger: Logger;
    constructor(appService: AppService);
    getHello(): string;
    checker(): string;
}
