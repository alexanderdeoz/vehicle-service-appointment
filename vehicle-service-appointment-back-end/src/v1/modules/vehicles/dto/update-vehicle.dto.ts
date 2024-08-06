import { PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  constructor(opts?: PartialType<CreateVehicleDto>) {
    super();
    this.id = opts?.id;
    this.updated_at = opts?.updated_at;
    this.deleted_at = opts?.deleted_at;
    this.created_at = opts?.created_at;
    this.plate = opts?.plate;
    this.type = opts?.type;
    this.model = opts?.fuel;
    this.mileage = opts?.mileage;
    this.status = opts?.status;
    this.made_in = opts?.made_in;
    this.warranty_up_to = opts?.warranty_up_to;
    this.next_review_at = opts?.next_review_at;
  }
}
