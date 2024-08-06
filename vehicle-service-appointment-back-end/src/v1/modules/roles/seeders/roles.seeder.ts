import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Role } from '@v1/modules/roles/entities';
import { RoleStatus, RoleType } from '@v1/modules/roles/enum';

@Injectable()
export class RolesSeeder implements Seeder {
  constructor(@Inject(Role) private readonly repos: Repository<Role>) {}

  async seed(): Promise<any> {
    const roles = [
      new Role({
        name: RoleType.SUPER_ADMINISTRATOR,
        status: RoleStatus.ACTIVE,
      }),
      new Role({
        name: RoleType.ADMINISTRATOR,
        status: RoleStatus.ACTIVE,
      }),
      new Role({
        name: RoleType.CUSTOMER,
        status: RoleStatus.ACTIVE,
      }),
      new Role({
        name: RoleType.MECHANIC,
        status: RoleStatus.ACTIVE,
      }),
    ] as DeepPartial<any>[];
    return this.repos.save(roles);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
