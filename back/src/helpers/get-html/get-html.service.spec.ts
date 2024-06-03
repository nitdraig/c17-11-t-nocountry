import { Test, TestingModule } from '@nestjs/testing';
import { GetHtmlService } from './get-html.service';

describe('GetHtmlService', () => {
  let service: GetHtmlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetHtmlService],
    }).compile();

    service = module.get<GetHtmlService>(GetHtmlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
