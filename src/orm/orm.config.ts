import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 3000,
    username: 'postgres',
    password: '1922.comj',
    database: 'roku_db',
    synchronize: true,
    entities: [UserEntity],
}