import { Global, Module } from '@nestjs/common';
import { EntityFromSystemService } from './services/entity-from-system.service';
import {
  EntityFromSystemController,
  EntityFromSystemMenuController,
} from '@v1/modules/entity-from-system/controllers';
import { Repositories } from '@v1/modules/entity-from-system/providers/repositories';

@Global()
@Module({
  controllers: [EntityFromSystemController, EntityFromSystemMenuController],
  providers: [...Repositories, EntityFromSystemService],
  exports: [...Repositories, EntityFromSystemService],
})
export class EntityFromSystemModule {}
