import { PartialType } from '@nestjs/swagger';
import { CreateEntityFromSystemDto } from './create-entity-from-system.dto';

export class UpdateEntityFromSystemDto extends PartialType(
  CreateEntityFromSystemDto,
) {}
