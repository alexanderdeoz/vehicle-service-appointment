import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Repository } from 'typeorm';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities';
import {
  EntityFromSystemStatus,
  EntityType,
} from '@v1/modules/entity-from-system/enum';
import { Permission } from '@v1/modules/permissions/entities';
import { PermissionType } from '@v1/modules/permissions/enum';

@Injectable()
export class EntityFromSystemSeeder implements Seeder {
  constructor(
    @Inject(EntityFromSystem)
    private readonly repos: Repository<EntityFromSystem>,
    @Inject(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async seed(): Promise<any> {
    const permissions: Permission[] = await this.permissionRepo.find();
    const fathers1 = [
      new EntityFromSystem({
        name: EntityType.START,
        status: EntityFromSystemStatus.ACTIVE,
        icon: 'pi pi-list',
        entityFromSystemPermission: permissions
          .filter((p) => p.name == PermissionType.READ)
          .map((p) => ({ permission: p })),
      }),
      new EntityFromSystem({
        name: EntityType.SCHEDULING,
        status: EntityFromSystemStatus.ACTIVE,
        icon: 'pi pi-list',
        entityFromSystemPermission: permissions
          .filter((p) => p.name == PermissionType.READ)
          .map((p) => ({ permission: p })),
      }),
      new EntityFromSystem({
        name: EntityType.PARAMETERS,
        status: EntityFromSystemStatus.ACTIVE,
        icon: 'pi pi-list',
        entityFromSystemPermission: permissions
          .filter((p) => p.name == PermissionType.READ)
          .map((p) => ({ permission: p })),
      }),
      new EntityFromSystem({
        name: EntityType.MECHANICAL_WORKSHOP,
        status: EntityFromSystemStatus.ACTIVE,
        icon: 'pi pi-list',
        entityFromSystemPermission: permissions
          .filter((p) => p.name == PermissionType.READ)
          .map((p) => ({ permission: p })),
      }),
    ];
    const fathers = await this.repos.save(fathers1);

    for (const father of fathers) {
      if (father.name == EntityType.START) {
        await this.repos.save([
          new EntityFromSystem({
            name: EntityType.DASHBOARD,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/dashboard',
            entityFromSystemPermission: permissions
              .filter((p) => p.name == PermissionType.READ)
              .map((p) => ({ permission: p })),
          }),
        ]);
      }
      if (father.name == EntityType.SCHEDULING) {
        await this.repos.save([
          new EntityFromSystem({
            name: EntityType.APPOINTMENTS,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/scheduling/appointments',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
        ]);
      }
      if (father.name == EntityType.PARAMETERS) {
        await this.repos.save([
          new EntityFromSystem({
            name: EntityType.USERS,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/parameters/users',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
          new EntityFromSystem({
            name: EntityType.ROLES,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/parameters/roles',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
          new EntityFromSystem({
            name: EntityType.PERMISSIONS,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/parameters/permissions',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
          new EntityFromSystem({
            name: EntityType.ENTITY_FROM_SYSTEM,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/parameters/entities-from-system',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
          new EntityFromSystem({
            name: EntityType.MANAGE_PERMISSIONS,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/parameters/manage-permissions',
            entityFromSystemPermission: permissions
              .filter((p) => p.name == PermissionType.READ)
              .map((p) => ({ permission: p })),
          }),
        ]);
      }
      if (father.name == EntityType.MECHANICAL_WORKSHOP) {
        await this.repos.save([
          new EntityFromSystem({
            name: EntityType.VEHICLES,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/mechanical-workshop/vehicles',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
          new EntityFromSystem({
            name: EntityType.PRODUCTS,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/mechanical-workshop/products',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
          new EntityFromSystem({
            name: EntityType.MODELS,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/mechanical-workshop/models',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
          new EntityFromSystem({
            name: EntityType.BRANDS,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/mechanical-workshop/brands',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
          new EntityFromSystem({
            name: EntityType.FUELS,
            status: EntityFromSystemStatus.ACTIVE,
            father: father,
            icon: 'pi pi-list',
            routerLink: '/core/mechanical-workshop/fuels',
            entityFromSystemPermission: permissions
              .filter(
                (p) =>
                  p.name == PermissionType.CREATE ||
                  p.name == PermissionType.READ ||
                  p.name == PermissionType.UPDATE ||
                  p.name == PermissionType.DELETE,
              )
              .map((p) => ({ permission: p })),
          }),
        ]);
      }
    }
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
