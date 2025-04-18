import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from '@config';

export const getTypeOrmConfig = async (): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: 'localhost',
    port: config.database.port,
    database: config.database.name,
    username: config.database.username,
    password: config.database.password,
    autoLoadEntities: true,
    synchronize: true
});
