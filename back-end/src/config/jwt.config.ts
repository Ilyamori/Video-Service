import { config } from '@config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (): Promise<JwtModuleOptions> => ({
    secret: config.jwt.secret
});
