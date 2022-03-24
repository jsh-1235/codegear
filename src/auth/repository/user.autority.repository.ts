import { EntityRepository, Repository } from 'typeorm';
import { UserAuthority } from '../entities/user.authority.entity';

@EntityRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority> {}
