import { Test, TestingModule } from '@nestjs/testing';
import { GettersController } from './getters.controller';

describe('GettersController', () => {
  let controller: GettersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GettersController],
    }).compile();

    controller = module.get<GettersController>(GettersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
