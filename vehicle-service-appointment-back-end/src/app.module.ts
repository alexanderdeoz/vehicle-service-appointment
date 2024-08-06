import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '@v1/shared/config';
import { DatabaseModule } from '@v1/database/database.module';
import { AuthModule } from '@v1/modules/auth/auth.module';
import { UsersModule } from '@v1/modules/users/users.module';
import { RolesModule } from '@v1/modules/roles/roles.module';
import { PermissionsModule } from '@v1/modules/permissions/permissions.module';
import { AppointmentsModule } from '@v1/modules/appointments/appointments.module';
import { VehiclesModule } from '@v1/modules/vehicles/vehicles.module';
import { ProductsModule } from '@v1/modules/products/products.module';
import * as Joi from 'joi';
import { Exceptions } from '@v1/exceptions';
import { Interceptors } from '@v1/interceptors';
import { AccessControlModule } from 'nest-access-control';
import { roles } from '@v1/shared/enum';
import { CoreModule } from '@v1/modules/core/core.module';
import { EntityFromSystemModule } from '@v1/modules/entity-from-system/entity-from-system.module';
import { BrandsModule } from '@v1/modules/brands/brands.module';
import { FuelsModule } from '@v1/modules/fuels/fuels.module';
import { ModelsModule } from '@v1/modules/models/models.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        APP_ENV: Joi.string().required(),
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    AccessControlModule.forRoles(roles),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    AppointmentsModule,
    VehiclesModule,
    ProductsModule,
    EntityFromSystemModule,
    CoreModule,
    BrandsModule,
    FuelsModule,
    ModelsModule,
  ],
  providers: [...Interceptors, ...Exceptions],
})
export class AppModule {}
