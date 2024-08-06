import { Test, TestingModule } from '@nestjs/testing';
import { SaintsService } from './saint.service';

describe('SaintsService', () => {
  let service: SaintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaintsService],
    }).compile();

    service = module.get<SaintsService>(SaintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
