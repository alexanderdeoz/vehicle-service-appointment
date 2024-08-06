import { seeder } from 'nestjs-seeder';
import { AppModule } from '../../../app.module';
import { AppointmentsSeeder } from '@v1/modules/appointments/seeders';
import { PermissionsSeeder } from '@v1/modules/permissions/seeders';
import { ProductsSeeder } from '@v1/modules/products/seeders';
import { RolesSeeder } from '@v1/modules/roles/seeders';
import { UsersSeeder } from '@v1/modules/users/seeders';
import { VehiclesSeeder } from '@v1/modules/vehicles/seeders';
import { EntityFromSystemSeeder } from '@v1/modules/entity-from-system/seeders';
import { BrandsSeeder } from '@v1/modules/brands/seeders';
import { FuelsSeeder } from '@v1/modules/fuels/seeders';
import { ModelsSeeder } from '@v1/modules/models/seeders';

if (process.env.APP_ENV == 'production') {
  seeder({
    imports: [AppModule],
  }).run([PermissionsSeeder, RolesSeeder, EntityFromSystemSeeder]);
} else {
  console.log('Seeders:' + process.env.APP_ENV);
  seeder({
    imports: [AppModule],
  }).run([
    PermissionsSeeder,
    RolesSeeder,
    EntityFromSystemSeeder,
    ProductsSeeder,
    BrandsSeeder,
    FuelsSeeder,
    ModelsSeeder,
    UsersSeeder,
    VehiclesSeeder,
    AppointmentsSeeder,
  ]);
}
