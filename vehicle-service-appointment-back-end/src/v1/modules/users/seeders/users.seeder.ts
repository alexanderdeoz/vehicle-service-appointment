import { Inject, Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { User } from '@v1/modules/users/entities';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@Inject(User) private readonly repos: Repository<User>) {}

  async seed(): Promise<any> {
    const users = DataFactory.createForClass(User)
      .generate(25)
      .map((e) => e as DeepPartial<any>);
    return this.repos.save(users);
  }

  async drop(): Promise<any> {
    return this.repos.delete({});
  }
}
