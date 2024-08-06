import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { User } from '@v1/modules/users/entities';
import { UsersService } from '@v1/modules/users/services';

@Injectable()
export class GetUserById implements PipeTransform<number, Promise<User>> {
  constructor(private readonly service: UsersService) {}

  async transform(id: number, _: ArgumentMetadata): Promise<User> {
    return (await this.service.findOne(id)).data;
  }
}
