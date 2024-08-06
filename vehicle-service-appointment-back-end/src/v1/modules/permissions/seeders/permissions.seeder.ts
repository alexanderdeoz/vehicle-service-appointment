import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { Permission } from '@v1/modules/permissions/entities';
import { PermissionStatus, PermissionType } from '@v1/modules/permissions/enum';

@Injectable()
export class PermissionsSeeder implements Seeder {
  constructor(
    @Inject(Permission) private readonly repos: Repository<Permission>,
  ) {}

  async seed(): Promise<any> {
    const permissions = [
      new Permission({
        name: PermissionType.CREATE,
        status: PermissionStatus.ACTIVE,
      }),
      new Permission({
        name: PermissionType.READ,
        status: PermissionStatus.ACTIVE,
      }),
      new Permission({
        name: PermissionType.UPDATE,
        status: PermissionStatus.ACTIVE,
      }),
      new Permission({
        name: PermissionType.DELETE,
        status: PermissionStatus.ACTIVE,
      }),
    ] as DeepPartial<any>[];
    return this.repos.save(permissions);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
