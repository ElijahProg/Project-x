import { Test, TestingModule } from '@nestjs/testing';
import { SaintController } from './saint.controller';

describe('SaintController', () => {
  let controller: SaintController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaintController],
    }).compile();

    controller = module.get<SaintController>(SaintController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
