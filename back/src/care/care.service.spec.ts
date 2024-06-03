import { Test, TestingModule } from '@nestjs/testing';
import { CareService } from './care.service';

describe('CareService', () => {
  let service: CareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareService],
    }).compile();

    service = module.get<CareService>(CareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
