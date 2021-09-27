import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { jwtConstants } from '../config/constants';
import { JwtPayload } from './types/types';
import { User } from './models/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { userId } = payload;
    const user = await this.usersRepository.findOne({ id: userId });

    if (!user) throw new UnauthorizedException('認証情報が無効です');
    return user;
  }
}
