import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InitAppDto } from '@v1/modules/core/dto';
import { User, UserRole } from '@v1/modules/users/entities';
import { MoreThan, Repository } from 'typeorm';
import { IServerResponseModel } from '@v1/shared/models';
import { SeverityMessage } from '@v1/shared/enum';
import { configuration } from '@v1/shared/config';
import { ConfigType } from '@nestjs/config';
import { Status } from '@v1/modules/users/enum';
import { Appointment } from '@v1/modules/appointments/entities';
import { Product } from '@v1/modules/products/entities';
import { Vehicle } from '@v1/modules/vehicles/entities';
import { Permission } from '@v1/modules/permissions/entities';
import { Role } from '@v1/modules/roles/entities';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities';
import { RolePermission } from '@v1/modules/users/entities/role-permissions.entity';
import { RoleType } from '@v1/modules/roles/enum';
import { EntityType } from '@v1/modules/entity-from-system/enum';

@Injectable()
export class CoreService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configService: ConfigType<typeof configuration>,
    @Inject(User) private readonly userRepo: Repository<User>,
    @Inject(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @Inject(Product)
    private readonly productRepo: Repository<Product>,
    @Inject(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @Inject(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @Inject(Role)
    private readonly roleRepo: Repository<Role>,
    @Inject(EntityFromSystem)
    private readonly entityFromSystemRepo: Repository<EntityFromSystem>,
    @Inject(RolePermission)
    private readonly rolePermissionsRepo: Repository<RolePermission>,
  ) {}

  async initApp(payload: InitAppDto): Promise<IServerResponseModel<User>> {
    // validando api key
    if (this.configService.app.apiKey != payload.apiKey) {
      throw new UnauthorizedException('Llave incorrecta');
    }
    const roles: Role[] = await this.roleRepo.find({
      relations: { role_permissions: true },
    });
    const entitiesFromSystem = await this.entityFromSystemRepo.find({
      relations: {
        entityFromSystemPermission: {
          entityFromSystem: true,
          permission: true,
        },
      },
    });
    const permissions = await this.permissionRepo.find();

    for (const role of roles) {
      let efs: EntityFromSystem[] = [];
      if (role.name == RoleType.SUPER_ADMINISTRATOR) {
        efs = entitiesFromSystem;
      }
      if (role.name == RoleType.ADMINISTRATOR) {
        efs = entitiesFromSystem.filter(
          (p) =>
            p.name == EntityType.START ||
            p.name == EntityType.SCHEDULING ||
            p.name == EntityType.PARAMETERS ||
            p.name == EntityType.MECHANICAL_WORKSHOP ||
            p.name == EntityType.APPOINTMENTS ||
            p.name == EntityType.DASHBOARD ||
            p.name == EntityType.BRANDS ||
            p.name == EntityType.ENTITY_FROM_SYSTEM ||
            p.name == EntityType.MODELS ||
            p.name == EntityType.FUELS ||
            p.name == EntityType.PERMISSIONS ||
            p.name == EntityType.MANAGE_PERMISSIONS ||
            p.name == EntityType.PRODUCTS ||
            p.name == EntityType.ROLES ||
            p.name == EntityType.USERS ||
            p.name == EntityType.VEHICLES,
        );
      }
      if (role.name == RoleType.CUSTOMER) {
        efs = entitiesFromSystem.filter(
          (p) =>
            p.name == EntityType.START ||
            p.name == EntityType.DASHBOARD ||
            p.name == EntityType.SCHEDULING ||
            p.name == EntityType.APPOINTMENTS ||
            p.name == EntityType.MECHANICAL_WORKSHOP ||
            p.name == EntityType.VEHICLES,
        );
      }
      if (role.name == RoleType.MECHANIC) {
        efs = entitiesFromSystem.filter(
          (p) =>
            p.name == EntityType.START ||
            p.name == EntityType.DASHBOARD ||
            p.name == EntityType.SCHEDULING ||
            p.name == EntityType.APPOINTMENTS ||
            p.name == EntityType.MECHANICAL_WORKSHOP ||
            p.name == EntityType.VEHICLES ||
            p.name == EntityType.PRODUCTS ||
            p.name == EntityType.MODELS ||
            p.name == EntityType.BRANDS ||
            p.name == EntityType.FUELS,
        );
      }
      efs.forEach((entity) => {
        role.role_permissions.push(
          ...entity.entityFromSystemPermission.map(
            (per) =>
              ({
                permission: { id: per.permission.id },
                entity_from_system: { id: entity.id },
              }) as RolePermission,
          ),
        );
      });

      await this.roleRepo.save(role);
    }

    const roleSuperAdmin = roles.find(
      (r) => r.name == RoleType.SUPER_ADMINISTRATOR,
    );
    for (const entityFromSystem of entitiesFromSystem) {
      for (const permission of permissions) {
        const rolePermissions = new RolePermission();
        rolePermissions.permission = permission;
        rolePermissions.role = roleSuperAdmin;
        rolePermissions.entity_from_system = entityFromSystem;
        await this.rolePermissionsRepo.save(rolePermissions);
      }
    }

    // creando super usuario

    const userRole = new UserRole();
    userRole.role = roleSuperAdmin;

    const email = this.configService.superUser.super_user_email;
    let found = await this.userRepo.findOneBy({ email });
    if (!found) {
      const superUser = new User();
      superUser.email = email;
      superUser.password = this.configService.superUser.super_user_password;
      superUser.status = Status.ACTIVE;
      superUser.name = 'El super usuario';
      superUser.birth_date = new Date();
      superUser.address = 'ECUADOR';
      superUser.identification = '0000000000';
      superUser.phone = '00000000';
      superUser.roles = [userRole];
      found = await this.userRepo.save(superUser);
    }

    return {
      data: found,
      message: {
        summary: 'Aplicación iniciada',
        detail: 'Super usuario creado correctamente',
        severity: SeverityMessage.success,
      },
    };
  }

  async dataDashboard(): Promise<IServerResponseModel<any>> {
    const date = new Date();
    const usersCount = await this.userRepo.count();
    const usersNewCount = await this.userRepo.countBy({
      created_at: MoreThan(date),
    });
    const appointmentsCount = await this.appointmentRepo.count();
    const appointmentsNewCount = await this.appointmentRepo.countBy({
      created_at: MoreThan(date),
    });
    const productsCount = await this.productRepo.count();
    const productsNewCount = await this.productRepo.countBy({
      created_at: MoreThan(date),
    });
    const vehiclesCount = await this.vehicleRepo.count();
    const vehiclesNewCount = await this.vehicleRepo.countBy({
      created_at: MoreThan(date),
    });

    return {
      data: {
        user: {
          usersCount,
          usersNewCount,
        },
        appointment: {
          appointmentsCount,
          appointmentsNewCount,
        },
        product: {
          productsCount,
          productsNewCount,
        },
        vehicle: {
          vehiclesCount,
          vehiclesNewCount,
        },
      },
    };
  }
}
