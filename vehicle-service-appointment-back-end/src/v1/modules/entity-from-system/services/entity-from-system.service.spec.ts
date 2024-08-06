import { Test, TestingModule } from '@nestjs/testing';
import { EntityFromSystemService } from './entity-from-system.service';

describe('EntitiesService', () => {
  let service: EntityFromSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntityFromSystemService],
    }).compile();

    service = module.get<EntityFromSystemService>(EntityFromSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
