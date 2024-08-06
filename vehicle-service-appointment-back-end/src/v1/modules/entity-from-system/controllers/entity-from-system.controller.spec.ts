import { Test, TestingModule } from '@nestjs/testing';
import { EntityFromSystemController } from './entity-from-system.controller';
import { EntityFromSystemService } from '../services/entity-from-system.service';

describe('EntitiesController', () => {
  let controller: EntityFromSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityFromSystemController],
      providers: [EntityFromSystemService],
    }).compile();

    controller = module.get<EntityFromSystemController>(
      EntityFromSystemController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
