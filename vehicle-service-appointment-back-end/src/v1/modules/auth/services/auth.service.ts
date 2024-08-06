import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@v1/modules/users/entities';
import { Repository } from 'typeorm';
import { IServerResponseModel } from '@v1/shared/models';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(User) private readonly repo: Repository<User>,
  ) {}

  async create(loginDto: LoginDto): Promise<IServerResponseModel<any>> {
    const user = await this.repo.findOneByOrFail({ email: loginDto.email });
    await this.checkPassword(loginDto.password, user);
    const accessToken = this.generateJwt(user);
    return {
      data: { user, accessToken },
    };
  }

  private generateJwt(user: User): string {
    return this.jwtService.sign(Object({ ...user }));
  }

  private async checkPassword(
    passwordCompare: string,
    user: User,
  ): Promise<User> {
    const { password } = user;
    if (password !== passwordCompare) {
      throw new UnprocessableEntityException('Clave incorrecta');
    }
    return user;
  }
}
