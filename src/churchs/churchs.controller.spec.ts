import { Test, TestingModule } from '@nestjs/testing';
import { ChurchsController } from './churchs.controller';

describe('ChurchsController', () => {
  let controller: ChurchsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChurchsController],
    }).compile();

    controller = module.get<ChurchsController>(ChurchsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
