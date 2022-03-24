import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function typeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  console.log(configService.get('port'));
  console.log(configService.get('database'));

  const result: TypeOrmModuleOptions = {
    name: 'default',
    type: 'mysql',
    host: configService.get('database').host,
    port: Number(configService.get('database').port),
    database: 'cats',
    username: configService.get('database').username,
    password: configService.get('database').password,
    logging: false,
    synchronize: Boolean(configService.get('database').synchronize),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: { migrationsDir: 'src/migrations' },
    migrationsRun: false,
  };

  return result;
}
