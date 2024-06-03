import { Test, TestingModule } from '@nestjs/testing';
import { CaretakerService } from './caretaker.service';

describe('CaretakerService', () => {
  let service: CaretakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaretakerService],
    }).compile();

    service = module.get<CaretakerService>(CaretakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
